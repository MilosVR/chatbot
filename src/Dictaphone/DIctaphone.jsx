import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState, useRef } from 'react';
import audio  from '../audio/tes.mp4'
import spanija  from '../audio/glavniGradSpanije.mp3'
import finska  from '../audio/glavniGradFinske.mp3'
import kosovskaBitka  from '../audio/kosovskaBitka.mp3'
import ishodKosovskeBitke  from '../audio/ishodKosovskeBitke.mp3'


const Dictaphone = () => {
    
    const [response, setResponse] = useState('')

    const audioRef = useRef()
    const [test, setTest] = useState(false)
    const [source, setSource] = useState('')

    const commands = [
        {
            command:"idi na *",
            callback: (site) => {
                window.open('http://'+site+'.com')
            }
        },   
        {
            command:"promeni pozadinu u *",
            callback: (color) => {
                let body = document.querySelector('body')
                if (color.includes('crveno')) {
                    body.style.background = 'red'
                }
                if (color.includes('zelen')) {
                    body.style.background = 'green'
                }
                if (color.includes('plav')) {
                    body.style.background = 'blue'
                }
            }
        },
        {
            command:"promeni boju slova u *",
            callback: (color) => {
                let body = document.querySelector('body')
                if (color.includes('belo')) {
                    body.style.color = 'white'
                }
                if (color.includes('crno')) {
                    body.style.color = '#333'
                }
            }
        },
        {
            command:"glavni grad Španije",
            callback: (res) => {
                setResponse("Madrid")
                let audio = document.querySelector('.my_audio')
                audio.src = spanija
                audio.volume = 1
                audio.play();
            },
            isFuzzyMatch: true,
            bestMatchOnly: true
        },
        {
            command:"glavni grad Finske",
            callback: (res) => {
                setResponse("Helsinki")
                let audio = document.querySelector('.my_audio')
                audio.src = finska
                audio.volume = 1
                audio.play();
            },
            isFuzzyMatch: true,
            bestMatchOnly: true
        },
        {
            command:"kosovska bitka",
            callback: (res) => {
                setResponse("Helsinki")
                let audio = document.querySelector('.my_audio')
                audio.src = kosovskaBitka
                audio.volume = 1
                audio.play();
            },
            isFuzzyMatch: true,
            bestMatchOnly: true
        },
        {
            command:"ishod kosovske bitke",
            callback: (res) => {
                setResponse("Helsinki")
                let audio = document.querySelector('.my_audio')
                audio.src = ishodKosovskeBitke
                audio.volume = 1
                audio.play();
            },
            isFuzzyMatch: true,
            bestMatchOnly: true
        },
    ]
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands});
    
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    SpeechRecognition.startListening({
        continuous: true,
        language: 'sr-SP'
    })

    const testing = e => {
        // let audio = new Audio('../audio/tes.mp4')
        let audio = document.querySelector('.my_audio')
        audio.play();
        audio.volume = 0
        // audio.pause();
        setTest(true)
    }

    return (
        <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <hr />
        <button onClick={testing}>Start Listening</button>
        <hr />
        <h1>{transcript}</h1>
        <h2>Odgovor: {response}</h2>

        <audio className="my_audio" controls preload="none">
            <source src={audio} type="audio/mp4"></source>
        </audio>

        </div>
    );
};
export default Dictaphone;