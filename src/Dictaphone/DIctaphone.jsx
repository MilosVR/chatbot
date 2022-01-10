import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';

const Dictaphone = () => {
    const [response, setResponse] = useState('')
    useEffect(() => {
        if (transcript.includes('glavni grad Španije')) {
          setResponse("Glavni grad Spanije je Madrid.")
        }
    }, [transcript])

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

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
        </div>
    );
};
export default Dictaphone;