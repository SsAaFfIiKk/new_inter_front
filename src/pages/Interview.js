import React, { useState, useRef } from 'react'
import io from 'socket.io-client/dist/socket.io.js';
import Instructions from '../Instructions';


import "../css/style.css";

export const Interview = () => {

    const [count, upCount] = useState(0)
    const [qw, setQw] = useState("Загружаем...")
    const [type, switchType] = useState("instruction")
    const [folder ,setFolder] = useState()
    const [filename ,setFilene] = useState()

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

    const socket = io("https://mycandidate.onti.actcognitive.org", { path: '/questionnaires/inter_backend/socket.io' })

    React.useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const qw_url = "http://0.0.0.0:9999/get_questions"
        const req = await fetch(qw_url)
        const out = await req.json()
        setQw(out)
    }

    const getVideo = () => {
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    // recordVideo(stream);
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
                    filename: filename,
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

    let content;

    switch (type) {
        default:
        case "instruction":
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
            content = (
                <div>
                    <div className="video" style={{ background: qw[count][2] ? "#EB5757" : "#855CF8" }}>
                        <div className="video__content">
                            <div className="video__body">
                                <video ref={videoRef} muted>Устройство видеозаписи недоступно</video>
                                <div className="video__label" style={{ background: qw[count][2] ? "#EB5757" : "#855CF8"}}>
                                    <div className="video__label-text">{qw[count][2] ? "скажите ложь" : "скажите правду"}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="interQuetion">
                        <div className="interQuetion__body">{qw[count][1]}</div>
                    </div>

                    <div className="interviewButton buttonClose">
                        <button onClick={() => { turnOff(); switchType("instruction"); upCount(count + 1) }}>
                            Закончить ответ
                        </button>
                    </div>
                </div>
            )
            break;
    }

    return (
        content
    )
}