import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import video from "../audio/tes.mp3";

const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [response, setResponse] = useState('glavni grad Španije')

    
    const playMe = e => {
        let audio = new Audio(video);
        audio.load();
        setTimeout(() => {
            audio.play()
        }, 500);
        console.log(audio);
    }
    
    useEffect(() => {
        if (response.includes(transcript)) {
            setResponse("Glavni grad Spanije je Madrid.")
            playMe()
        }
    }, [transcript, response])
    

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    SpeechRecognition.startListening({
        continuous: true,
        language: 'sr-SP'
    })

    return (
        <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        <p>{response}</p>
        <button onClick={playMe}>Click</button>
        {/* <audio className='video' width="750" height="500" controls autoPlay muted src={video}></audio> */}
        </div>
    );
};
export default Dictaphone;