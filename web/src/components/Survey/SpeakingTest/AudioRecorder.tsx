import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { QuestionProps } from '../../../constants/props';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import { SurveyQuestionType } from '../../../constants/QuestionType';
import { getDataFromIndexDb, putDataToIndexDb } from '../../../utils/index_db';

const AudioRecorder = ({ question, state, disable }: QuestionProps) => {
    const [audioBlob, setAudioBlob] = useState<null | Blob>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRecordingStarted, setIsRecordingStarted] = useState<boolean>(false);
    const getLocalStorage = JSON.parse(localStorage.getItem('survey') || '{}');
    const accessToken = getLocalStorage?.current_input?.accessToken;
    const answerToken = getLocalStorage?.current_input?.answerToken;
    const answerOnTest = getLocalStorage[accessToken][answerToken];
    const [blobAnswer, setBlobAnswer] = useState<Blob | null>(null);

    // Lưu base64 vào IndexedDB
    const saveBase64ToIndexedDB = async (
        questionId: number,
        accessToken: string,
        answerToken: string,
        base64Data: any,
    ) => {
        try {
            // Call putDataIndexDb to add or update the data in IndexedDB
            await putDataToIndexDb({
                questionId,
                accessToken,
                answerToken,
                base64Data,
                timeStamp: new Date().toLocaleTimeString(),
            });
        } catch (error) {
            console.error('Error saving data to IndexedDB:', error);
        }
    };

    const retrieveDataFromIndexedDB = async (questionId: number) => {
        try {
            // Call getDataFromIndexDb to retrieve data based on questionId
            const result = await getDataFromIndexDb(accessToken);
            if (result && result.value[questionId] && result.answerToken === answerToken) {
                return result.value[questionId].answerAudio;
            } else {
                // Data not found
                return undefined;
            }
        } catch (error) {
            console.error('Error retrieving data from IndexedDB:', error);
        }
    };

    const getAnswerAudioRecorder = async () => {
        try {
            const preAnswerRecord = await retrieveDataFromIndexedDB(question.questionId);

            if (preAnswerRecord !== undefined) {
                const fetchData = async () => {
                    const responseBlob = await fetch(preAnswerRecord);
                    const blobFromBase64 = await responseBlob.blob();
                    return blobFromBase64;
                };

                const blobFromBase64 = await fetchData();
                setBlobAnswer(blobFromBase64);
                // Now you can use blobFromBase64 here
            }
        } catch (error) {
            console.error('Error getting answer from IndexedDB:', error);
        }
    };

    const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
        audio: true,
        onStop: (blobUrl, blob) => {
            setAudioBlob(blob);
            //change blob to base 64 to save

            const convertBlobToBase64 = (blob: Blob) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);

                    reader.onloadend = function () {
                        if (reader.result) {
                            resolve(reader.result);
                        } else {
                            reject(new Error('Error converting blob to base64'));
                        }
                    };
                });
            };

            convertBlobToBase64(blob)
                .then((base64data) => {
                    saveBase64ToIndexedDB(question.questionId, accessToken, answerToken, base64data);
                    state.setAnswers({
                        accessToken: state.answers.accessToken,
                        answerToken: state.answers.answerToken,
                        questionId: question.questionId,
                        questionType: SurveyQuestionType.RECORDING,
                        value: blobUrl,
                        blobValue: blobUrl,
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    });

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (status === 'recording') {
            intervalId = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
        }

        if (status === 'idle') {
            getAnswerAudioRecorder();
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [status]);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const handleStartRecording = () => {
        setIsRecordingStarted(true);
        startRecording();
    };

    const handleStopRecording = () => {
        setIsRecordingStarted(false);
        stopRecording();
    };

    useEffect(() => {
        if (disable && status === 'recording') {
            handleStopRecording();
        }
    }, [disable, status]);

    // const handleClearRecording = () => {
    //   clearBlobUrl();
    //   setAudioBlob(null);
    //   setElapsedTime(0);
    // };

    return (
        <div id={`id-${question.questionId}`}>
            {status === 'idle' && (
                <div className="flex flex-col justify-center items-center">
                    <button
                        disabled={answerOnTest.answers?.answers[question.questionId]?.value !== '' || disable}
                        className="bg-green-1 text-white p-3 rounded-full w-fit h-fit"
                        onClick={handleStartRecording}
                    >
                        <KeyboardVoiceIcon className="transition-colors ease-in-out" />
                    </button>
                    <p>Press to Record</p>
                    {blobAnswer ? <audio controls src={URL.createObjectURL(blobAnswer)} /> : <></>}
                </div>
            )}
            {status === 'recording' && (
                <div className="flex flex-col justify-center items-center">
                    <div className="font-medium mb-2">Recording: {formatTime(elapsedTime)}</div>
                    <button
                        className="bg-red-600 text-white p-3 rounded-full w-fit h-fit"
                        onClick={handleStopRecording}
                    >
                        <MicOffIcon className="absolute transition-colors ease-in-out animate-ping" />
                        <MicOffIcon className="relative transition-colors ease-in-out" />
                    </button>
                    <p>Press to Stop</p>
                </div>
            )}
            {status === 'stopped' && audioBlob && (
                <div className="flex flex-col justify-center items-center">
                    <audio controls src={mediaBlobUrl} />
                    <p className="mt-2">Recording time: {formatTime(elapsedTime)}</p>
                    {/* <button onClick={handleClearRecording}>Clear Recording</button> */}
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
