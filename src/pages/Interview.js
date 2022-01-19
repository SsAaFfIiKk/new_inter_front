import React from 'react'
import io from 'socket.io-client/dist/socket.io.js';
import Instructions from '../Instructions';
import { Link } from "react-router-dom"
import check from "../img/check.svg"
import crest from "../img/crest.svg"

export const Interview = () => {
    const [qw, setQw] = React.useState("Загружаем...")
    const [count, upCount] = React.useState(0)
    const [type, switchType] = React.useState("instruction")

    const videoRef = React.useRef(null)

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
                    filename: this.filename,
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
                    <div className='shortInstruction'>
                        Интсрукция
                        {Instructions.shortInstruction()}
                    </div>
                    <div className='qw'>
                        <div className='indicator'> </div>
                        <div>
                            {qw[count][1]}
                        </div>
                        <div className='indicator'> </div>
                    </div>
                    <div>
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
                    <div className="video">
                        <div>
                            <video ref={videoRef} muted>Устройство видеозаписи недоступно</video>
                            <div>
                                {qw[count][2] ? "соврите" : "скажите правду"}
                            </div>
                        </div>
                    </div>
                    <div>
                        {qw[count][1]}
                    </div>
                    <div>
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