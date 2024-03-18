"use client"
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice"
import MicOffIcon from "@mui/icons-material/MicOff"
import { useState } from "react"
import { ReactMic } from "react-mic"

const SpeakingTest = () => {
    const [record, setRecord] = useState(false)

    const toggleRecord = () => {
        if (record) {
            setRecord(false)
        } else if (typeof window !== "undefined") {
            setRecord(true)
        }
    }

    const onData = (recordedBlob: any) => {
        // console.log("chunk of real-time data is: ", recordedBlob)
    }

    const onStop = (recordedBlob: any) => {}

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <div
                className={`${
                    record ? "block" : "hidden"
                } absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%]`}
            >
                <ReactMic
                    record={record}
                    className="sinewave"
                    onStop={onStop}
                    onData={onData}
                    strokeColor="#000000"
                    backgroundColor="#ffffff"
                />
            </div>
            <button
                onClick={toggleRecord}
                type="button"
                className="z-30 p-3 text-yellow-1 rounded-full bg-green-1 w-fit h-fit "
            >
                {!record ? (
                    <KeyboardVoiceIcon className="transition-colors ease-in-out" />
                ) : (
                    <MicOffIcon className="transition-colors ease-in-out" />
                )}
            </button>
        </div>
    )
}

export default SpeakingTest
