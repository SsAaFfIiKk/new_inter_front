import React, { useState, Component, createRef } from 'react'
import io from 'socket.io-client/dist/socket.io.js';
import Instructions from '../Instructions';
import { Link } from "react-router-dom";
import check from "../img/check.svg";
import crest from "../img/crest.svg";

import "../css/style.css";

export const Interview = () => {
    const [type, switchType] = useState("instruction")
    const video = createRef()

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

    const getData = () => {
        const qw_url = "http://0.0.0.0:9999/get_questions"
    }

    const getVideo = () => {
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    video.current.srcObject = stream;
                    video.current.play();
                    // recordVideo(stream);
                })
                .catch((error) => {
                    alert('Устройство видеозаписи недоступно');
                });
        }
    }

    const turnof = () => {
        const videoElement = video.current;
        if (videoElement) {
            const stream = videoElement.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(function (track) {
                    track.stop();
                });
            }

            videoElement.srcObject = null;
            // socket.disconnect()
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
                        <div className="question__header"></div>
                        <div className="question__body">
                            <div className="question__text">
                                Почему вы выбрали эту специальность/университет?
                            </div>
                        </div>
                        <div className="question__footer">
                            <div className="question__footer-text">
                                Отвечайте на этот вопрос честно/ можете рассказать правду
                            </div>
                        </div>
                    </div>

                    <div className="interviewButton">
                        <button onClick={() => switchType("record")}>
                            Начать ответ
                        </button>
                    </div>
                </div>
            )
            break
        case "record":
            getVideo()
            content = (
                <div>
                    <div className="video">
                        <div className="video__content">
                            <div className="video__body">
                                <video ref={video} muted>Устройство видеозаписи недоступно</video>
                                <div className="video__label">
                                    <div className="video__label-text">скажите правду</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="interQuetion">
                        <div className="interQuetion__body">Почему вы выбрали эту специальность/университет?</div> 
                    </div>

                    <div className="interviewButton buttonClose">
                        <button onClick={() => { switchType("instruction"); turnof() }}>
                            Закончить ответ
                        </button>
                    </div>
                </div>
            )
            break
    }

    return (
        content
    )
}