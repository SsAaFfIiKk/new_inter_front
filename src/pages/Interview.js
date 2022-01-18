import React, { Component, createRef } from 'react'
import io from 'socket.io-client/dist/socket.io.js';
import Instructions from '../Instructions';
import { Link } from "react-router-dom"
import check from "../img/check.svg"
import crest from "../img/crest.svg"

export const Interview = () => {
    const [type, switchType] = React.useState("instruction")
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
                    <div className='shortInstruction'>
                        Интсрукция
                        {Instructions.shortInstruction()}
                    </div>
                    <div className='qw'>
                        <div className='indicator'> </div>
                        <div>
                            Вопрос
                        </div>
                        <div className='indicator'> </div>
                    </div>
                    <div>
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
                        <div>
                            <video ref={video} muted>Устройство видеозаписи недоступно</video>
                            <div>
                                скажите правду
                            </div>
                        </div>
                    </div>
                    <div>
                        Вопрос
                    </div>
                    <div>
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