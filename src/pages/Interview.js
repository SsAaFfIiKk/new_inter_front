import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client/dist/socket.io.js';
import Instructions from '../Instructions';


import "../css/style.css";

export const Interview = () => {

    const [count, upCount] = useState(0)
    const [qw, setQw] = useState([[0, "Загружаем...", 0]])
    const [type, switchType] = useState("instruction")
    const [folder, setFolder] = useState()
    const [timer, setTimer] = useState(10);
    const [isActive, setIsActive] = useState(false);

    const videoRef = useRef(null)

    const constraints = {
        video: {
            width: {
                min: 320,
                ideal: 640,
                max: 640
            },
            height: {
                min: 240,
                ideal: 480,
                max: 480
            }
        }, audio: true
    }

    const socket = io("https://mycandidate.onti.actcognitive.org", { path: '/questionnaires/interview_back/socket.io' })

    useEffect(() => {
        getData();
        return () => turnOff();
    }, [])

    useEffect(() => {
        let interval = null;

        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        }
        else if (isActive && timer === 0) {
            setIsActive(false)
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, timer]);


    const getData = async () => {
        const qw_url = "https://mycandidate.onti.actcognitive.org/questionnaires/interview_back/get_questions"
        const id_url = "https://mycandidate.onti.actcognitive.org/questionnaires/interview_back/get_record_id"


        const req = await fetch(qw_url)
        const out = await req.json()

        const body = JSON.stringify({
            "isu_id": localStorage.getItem("id")
        })


        const req_id = await fetch(id_url, {
            method: "POST",
            body: body
        })
        const id_out = await req_id.json()

        setQw(out)
        setFolder(localStorage.getItem("id") + "_" + id_out)
    }

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
                    alert('Устройство видеозаписи недоступно');
                });
        }
    }

    const recordVideo = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(1000);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                socket.emit('recorded-chunk', {
                    folder: folder,
                    filename: qw[count][0] + "_" + qw[count][2],
                    chunk: event.data,
                });
            }
        };
    }

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
            socket.disconnect()
        }
    }

    const nextQw = () => {
        turnOff()
        switchType("instruction")
        upCount(count + 1)
    }

    const finish = () => {
        turnOff()
        switchType("finish")
    }

    let content;

    switch (type) {
        default:
        case "instruction":
            if (timer === 0) { setTimer(10); setIsActive(false) }
            content = (
                <div>
                    <div className="shortInstruction">
                        <div className="shortInstruction__title">Инструкция:</div>
                        <div className="shortInstruction__body">
                            {Instructions.shortInstruction()}
                        </div>
                    </div>
                    <div className="question">
                        <div className={qw[count][2] ? "question__header_lie" : "question__header"}></div>
                        <div className="question__body">
                            <div className="question__text">
                                {qw[count][1]}
                            </div>
                        </div>
                        <div className={qw[count][2] ? "question__footer_lie" : "question__footer"}>
                            <div className="question__footer-text">
                                {qw[count][2] ? "Вам нужно солгать на этот вопрсос" : "Отвечайте на этот вопрос честно/ можете рассказать правду"}
                            </div>
                        </div>
                    </div>

                    <div className="interviewButton">
                        <button onClick={() => { switchType("record"); getVideo() }}>
                            Начать ответ
                        </button>
                    </div>
                </div>
            )
            break;

        case "record":
            if (!isActive) setIsActive(true)
            content = (
                <div>
                    <div className="video" style={{ background: qw[count][2] ? "#EB5757" : "#855CF8" }}>
                        <div className="video__content">
                            <div className="video__body">
                                <video ref={videoRef} muted>Устройство видеозаписи недосgitтупно</video>
                                <div className="video__label" style={{ background: qw[count][2] ? "#EB5757" : "#855CF8" }}>
                                    <div className="video__label-text">{qw[count][2] ? "скажите ложь" : "скажите правду"}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="interQuetion">
                        <div className="interQuetion__body">{qw[count][1]}</div>
                    </div>

                    <div className="buttonClose">
                        <button
                            className={timer > 0 ? "interviewButtonDisabled" : "interviewButtonActive"}
                            onClick={count === qw.length - 1 ? finish : nextQw}>
                            Закончить ответ
                        </button>
                    </div>
                </div>
            )
            break;

        case "finish":
            content = (
                <div>
                    Спасибо за прохождение интервью!
                </div>
            )
    }

    return (
        content
    )
}
