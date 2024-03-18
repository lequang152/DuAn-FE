"use client"
import { RecordStatePost } from "../../../constants/RecordStatePost"
import GraphicEqIcon from "@mui/icons-material/GraphicEq"
import MicIcon from "@mui/icons-material/Mic"
import Fab from "@mui/material/Fab"
import axios from "axios"
import classNames from "classnames"
import _ from "lodash"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { ReactMic } from "react-mic"
import PhonemeList from "./PhonemeList"
// import PointChart from "./PointChart"
import TextList from "./TextList"

const SpeakingTestMain: React.FC = () => {
    const soundData = useRef<any>()
    const [record, setRecord] = useState<any>(false)
    const [animName, setAnimName] = useState<any>(0)
    const [sentenceRes, setSentenceRes] = useState<any>()
    const [recordedData, setRecordedData] = useState<RecordStatePost>({
        api_plan: "premium",
        sentence: "Hello I'm From Viet Nam",
        audio_data: "",
    })

    // encode to base64
    const blobToBase64 = (blob: Blob) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        return new Promise((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result?.toString().split(",")[1])
            }
        })
    }

    const pushAnim = useRef(
        _.throttle((animName) => {
            setAnimName(animName)
            setTimeout(() => {
                setAnimName(0)
            }, 500)
        }, 500)
    )

    const onData = (recordedBlob: any) => {
        var fileReader = new FileReader()
        fileReader.onload = function (event) {
            var arrayBuffer: any = event.target?.result
            var uint8Array = new Uint8Array(arrayBuffer)
            soundData.current = Array.from(uint8Array)
        }

        fileReader.readAsArrayBuffer(recordedBlob)

        const sizeBlob = recordedBlob.size
        let animName = 0
        if (sizeBlob > 965 && sizeBlob <= 970) {
            animName = 1
        } else if (sizeBlob > 970 && sizeBlob <= 980) {
            animName = 2
        } else if (sizeBlob > 980) {
            animName = 3
        }
        if (animName > 0) pushAnim.current(animName)
    }

    const onStop = (recordedBlob: any) => {
        blobToBase64(recordedBlob?.blob).then((res) => {
            setRecordedData((prev) => ({
                ...prev,
                audio_data: `${res}`,
            }))
            postData({
                api_plan: recordedData.api_plan,
                sentence: recordedData.sentence,
                audio_data: `${res}`,
            })
        })
    }

    const postData = (recordData: any) => {
        const header = {
            "Content-Type": "application/json",
            Authorization:
                "ELSA DX+gsaRdJgTQN7K3XtShZ5b6x/KnAn7pa7QPf777QVHT/tFkXrrvZmF4BRW2J2XeKD0zFHHPO1BjD4ootVlXi15Z8ekpfbkeLNwiCeT1y5w=",
        }

        axios
            .post("https://api.elsanow.io/api/v2/score_audio", recordData, {
                headers: header,
            })
            .then((res) => {
                setSentenceRes(res.data)
            })
    }

    const startRecording = () => {
        setRecord(true)
    }

    const stopRecording = () => {
        setRecord(false)
    }

    return (
        <React.Fragment>
            <div className="record-section container">
                <div className="action-tab">
                    <div className="action-tab__btn">
                        <Link
                            href="/"
                            className="e-btn"
                        >
                            Previos
                        </Link>
                        <Link
                            href="/"
                            className="e-btn"
                        >
                            Next
                        </Link>
                    </div>
                </div>
                <ReactMic
                    record={record}
                    onStop={onStop}
                    onData={onData}
                    className="sound-wave"
                />
                {sentenceRes ? (
                    <div>
                        {sentenceRes?.utterance.map((utterance: any, index: any) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    {utterance.words.map((word: any, index: any) => (
                                        <TextList
                                            words={word.phonemes}
                                            key={index}
                                        />
                                    ))}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    /
                                    {utterance.words.map((word: any, index: any) => (
                                        <PhonemeList
                                            words={word.phonemes}
                                            key={index}
                                        />
                                    ))}
                                    /
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>{recordedData.sentence}</div>
                )}
                {record ? (
                    <div
                        className="record-icon"
                        onClick={async () => {
                            stopRecording()
                        }}
                    >
                        <Fab
                            size="large"
                            aria-label="add"
                            className="mic-icon"
                        >
                            <GraphicEqIcon />
                        </Fab>
                        <div className="waves">
                            <div
                                className={classNames("wave", {
                                    animation1: animName == 1,
                                    animation2: animName == 2,
                                    animation3: animName == 3,
                                })}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="record-icon1"
                        onClick={startRecording}
                    >
                        <Fab
                            size="large"
                            aria-label="add"
                            className="mic-icon"
                        >
                            <MicIcon />
                        </Fab>
                    </div>
                )}
                <div style={{ width: "100%" }}>{/* {sentenceRes ? <PointChart data={sentenceRes} /> : null} */}</div>
            </div>
        </React.Fragment>
    )
}

export default SpeakingTestMain
