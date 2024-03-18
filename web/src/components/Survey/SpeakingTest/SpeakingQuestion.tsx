"use client"
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice"
import MicOffIcon from "@mui/icons-material/MicOff"
import { useEffect, useRef, useState } from "react"
import { ReactMic } from "react-mic"
import { QuestionProps } from "../../../constants/props"
import { SurveyQuestionType } from "../../../constants/QuestionType"
import classNames from "classnames"


const SpeakingQuestion = ({ question, state }: QuestionProps) => {
    const [id, setId] = useState(0)
    const [record, setRecord] = useState(false)
    const [url, setURL] = useState<string>(() => {
        const urlInLocal = state.answers.answers[question.questionId]
 
        return urlInLocal ? urlInLocal.value : ""
    })

    const audio = useRef<HTMLAudioElement>(null!)

    const toggleRecord = () => {
        setId(question.questionId)
        if (record) {
            setRecord(false)
        } else if (typeof window !== "undefined") {
            setRecord(true)
        }
    }
 
    useEffect(() => {
        const test = document.getElementsByClassName(`sinewave ${question.questionId}`);
        const element = test[0] as HTMLElement | undefined;
        
        if (element) {
            element.style.width = '100%'; // Set the desired width value
            element.style.marginBottom = '12px';
        } 
    }, [id])

    // khi nao can thi dung toi cai onData nay

    // const onData = (recordedBlob: any) => {
    //      console.log("chunk of real-time data is: ", recordedBlob, question.questionId)
    // }

    const onStop = (recordedBlob: any) => {
        recordedBlob.blob
        const url = URL.createObjectURL(recordedBlob.blob)  
        state.setAnswers({
            accessToken: state.answers.accessToken,
            answerToken: state.answers.answerToken,
            questionId: question.questionId,
            questionType: SurveyQuestionType.RECORDING,
            value: url,
            blobValue: recordedBlob.blob,
        })
   
        setURL((preUrl) => {
            return url
        })
    }
    // console.log(url)

    return (
        <div className='mt-20 flex flex-col justify-center items-center mb-24'>
            <div className={`${record ? "opacity-100" : "opacity-0"} transition ease-in-out`}>
                <ReactMic
                    record={record}
                    className={`sinewave ${question.questionId}`}
                    onStop={onStop}
                    //onData={onData}
                    strokeColor="#000000"
                    backgroundColor="#ffffff"
                    noiseSuppression={true}
                />
            </div>
            <button
                onClick={toggleRecord}
                type="button"
                className={classNames(
                    {
                        "bg-green-1 text-yellow-1": !record,
                        "bg-red-600 text-white": record,
                    },
                    "p-3 rounded-full w-fit h-fit"
                )}
            >
                {!record ? (
                    <KeyboardVoiceIcon className="transition-colors ease-in-out" />
                ) : (
                    <div className="relative">
                        <MicOffIcon className="absolute transition-colors ease-in-out animate-ping" />
                        <MicOffIcon className="relative transition-colors ease-in-out" />
                    </div>
                )}
            </button>
            <div>{!record ? <p>Press to record</p> : <p>Press to stop</p>}</div>
            {typeof url != "object" && url && !record && (
                <audio
                    className="mt-2"
                    preload="auto"
                    controls
                    key={url}
                    ref={audio}
                    id="audio_speaking"
                >
                    <source
                        src={url}
                        type="audio/mp3"
                    />
                </audio>
            )}
        </div>
    )
}

export default SpeakingQuestion