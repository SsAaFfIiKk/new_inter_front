import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client/dist/socket.io.js";
import Instructions from "../Instructions";

import "../css/style.css";

export const Interview = () => {
  const [count, upCount] = useState(0);
  const [qw, setQw] = useState([[0, "Загружаем...", 0]]);
  const [type, switchType] = useState("instruction");
  const [folder, setFolder] = useState();
  const [timer, setTimer] = useState(10);
  const [isActive, setIsActive] = useState(false);

  const videoRef = useRef(null);

  const constraints = {
    video: {
      width: {
        min: 320,
        ideal: 640,
        max: 640,
      },
      height: {
        min: 240,
        ideal: 480,
        max: 480,
      },
    },
    audio: true,
  };

  const socket = io("https://mycandidate.onti.actcognitive.org", {
    path: "/questionnaires/interview_back/socket.io",
  });

  useEffect(() => {
    getData();
    return () => turnOff();
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (isActive && timer === 0) {
      setIsActive(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timer]);

  const getData = async () => {
    const qw_url =
      "https://mycandidate.onti.actcognitive.org/questionnaires/interview_back/get_questions";
    const id_url =
      "https://mycandidate.onti.actcognitive.org/questionnaires/interview_back/get_record_id";

    const req = await fetch(qw_url);
    const out = await req.json();

    const body = JSON.stringify({
      isu_id: localStorage.getItem("id"),
    });

    const req_id = await fetch(id_url, {
      method: "POST",
      body: body,
    });
    const id_out = await req_id.json();

    setQw(out);
    setFolder(localStorage.getItem("id") + "_" + id_out);
  };

  const getVideo = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          recordVideo(stream);
        })
        .catch((error) => {
          alert("Устройство видеозаписи недоступно");
        });
    }
  };

  const recordVideo = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start(1000);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        socket.emit("recorded-chunk", {
          folder: folder,
          filename: qw[count][0] + "_" + qw[count][2],
          chunk: event.data,
        });
      }
    };
  };

  const turnOff = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const stream = videoElement.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(function (track) {
          track.stop();
        });
      }
      videoElement.srcObject = null;
      socket.disconnect();
    }
  };

  const nextQw = () => {
    turnOff();
    switchType("instruction");
    upCount(count + 1);
  };

  const finish = () => {
    turnOff();
    switchType("finish");
  };

  let content;

  switch (type) {
    default:
    case "instruction":
      if (timer === 0) {
        setTimer(10);
        setIsActive(false);
      }
      content = (
        <div>
          {/* <div className="shortInstruction">
                        <div className="shortInstruction__title">Инструкция:</div>
                        <div className="shortInstruction__body">
                            {Instructions.shortInstruction()}
                        </div>
                    </div> */}
          <div className="instruction-block instruction-block--warning instruction-block-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon warning-icon"
            >
              <path
                d="M7.10666 4.36134C7.99604 4.04398 8.96078 4.00391 9.87342 4.24641C10.7861 4.48891 11.6036 5.00258 12.2182 5.71955C12.8327 6.43652 13.2153 7.32305 13.3154 8.26204C13.4155 9.20103 13.2283 10.1483 12.7787 10.9787L27.0573 25.2587L25.172 27.144L10.892 12.864C10.0614 13.3119 9.11465 13.4976 8.17644 13.3967C7.23822 13.2958 6.3526 12.9129 5.63628 12.2987C4.91995 11.6844 4.40655 10.8675 4.16372 9.9557C3.92089 9.04385 3.96004 8.07983 4.276 7.19067L7.25866 10.1733C7.44316 10.3644 7.66385 10.5167 7.90785 10.6215C8.15186 10.7264 8.4143 10.7815 8.67986 10.7838C8.94542 10.7861 9.20878 10.7355 9.45457 10.635C9.70036 10.5344 9.92367 10.3859 10.1115 10.1981C10.2992 10.0103 10.4477 9.78704 10.5483 9.54124C10.6489 9.29545 10.6995 9.03209 10.6972 8.76653C10.6949 8.50097 10.6397 8.23853 10.5349 7.99453C10.43 7.75052 10.2777 7.52983 10.0867 7.34534L7.10533 4.36L7.10666 4.36134ZM20.9293 6.87334L25.172 4.516L27.0573 6.40134L24.7 10.644L22.3427 11.116L19.516 13.944L17.6293 12.0587L20.4573 9.23067L20.9293 6.87334V6.87334ZM11.972 17.716L13.8573 19.6013L6.78666 26.672C6.54626 26.9131 6.22274 27.0531 5.88244 27.0633C5.54213 27.0734 5.21081 26.9531 4.95642 26.7268C4.70202 26.5005 4.54381 26.1855 4.51423 25.8464C4.48465 25.5072 4.58594 25.1696 4.79733 24.9027L4.90133 24.7867L11.972 17.716Z"
                fill="black"
              />
            </svg>
            <div>
              <div className="shortInstruction__title">Инструкция:</div>
              <div className="shortInstruction__body">
                {Instructions.shortInstruction()}
              </div>
            </div>
          </div>
          <div className="question">
            <div
              className={
                qw[count][2] ? "question__header_lie" : "question__header"
              }
            ></div>
            <div className="question__body">
              <div className="question__text">{qw[count][1]}</div>
            </div>
            <div
              className={
                qw[count][2] ? "question__footer_lie" : "question__footer"
              }
            >
              <div className="question__footer-text">
                {qw[count][2]
                  ? "Вам нужно солгать на этот вопрсос"
                  : "Отвечайте на этот вопрос честно/ можете рассказать правду"}
              </div>
            </div>
          </div>

          <div className="interviewButton">
            <button
              onClick={() => {
                switchType("record");
                getVideo();
              }}
            >
              Начать ответ
            </button>
          </div>
        </div>
      );
      break;

    case "record":
      if (!isActive) setIsActive(true);
      content = (
        <div>
          <div
            className="video"
            style={{ background: qw[count][2] ? "#EB5757" : "#855CF8" }}
          >
            <div className="video__content">
              <div className="video__body">
                <video ref={videoRef} muted>
                  Устройство видеозаписи недосgitтупно
                </video>
                <div
                  className="video__label"
                  style={{ background: qw[count][2] ? "#EB5757" : "#855CF8" }}
                >
                  <div className="video__label-text">
                    {qw[count][2] ? "скажите ложь" : "скажите правду"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="instruction-block modify">
            {/* <div className="interQuetion__body">{qw[count][1]}</div> */}
            <div>
              <p>
                <span>Вопрос:</span>
              </p>
              {qw[count][1]}
            </div>
          </div>

          <div className="buttonClose">
            <button
              className={
                timer > 0 ? "interviewButtonDisabled" : "interviewButtonActive"
              }
              onClick={count === qw.length - 1 ? finish : nextQw}
            >
              Закончить ответ
            </button>
          </div>
        </div>
      );
      break;

    case "finish":
      content = <div>Спасибо за прохождение интервью!</div>;
  }

  return content;
};
