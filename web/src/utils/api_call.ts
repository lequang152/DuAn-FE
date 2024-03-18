import axios, { AxiosHeaders, AxiosResponse } from "axios"
import { makeErrorToast, makeSuccessToast } from "./toast"
import { LocalStorageService, SURVEY_INPUT_KEY } from "./local_survey"
import { postToS3AWS } from "./post_speak_s3"
import { AnswerState } from "../hook/useLocalAnswerExam"
import GlobalVariable from "./GlobalVariable"
import { ApiService } from "./api_service"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"
import { logOut } from "../redux/Slice/Auth/AuthSlice"
import { getDataFromIndexDb } from "./index_db"

export const api = axios.create(
        { 
            baseURL: process.env.NEXT_PUBLIC_API, 
            timeout: 10000,    
        }
    )

export const getRandomOneExam = async () => {
    return await api.get(`/survey/all?page=1&random=0`, { headers: getHeaderWithToken() })
}

export async function updateUserDataToBackend(answerToken: string, data: any) {
    try {
        const response = await api.post(`/survey/update/${answerToken}`, { data: data });
        return response.data; 
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

export const startExam = async (accessToken: string, answerToken?: string, examCode?: string) => {
    if (!answerToken) {
        const headers: AxiosHeaders = new AxiosHeaders()
        headers.set('Authorization', `Bearer ${localStorage.getItem("TOKEN")}`)
        const res = await ApiService.apiCallStartExam(accessToken, examCode, headers)
        answerToken = res.data.answerToken
    }

    return await api.patch(`/survey/begin/${accessToken}/${answerToken}`, {}, { headers: getHeaderWithToken() })
}

export const getHeaderWithToken = () => {
    return { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` }
}

type SubmitParams = {
    state: AnswerState
    userLocal: any
    userInfo: any
    onBeginSubmit: () => void
    onSubmitSuccess: () => void
    onSubmitDone: () => void
    onError: () => void
    signOut?: () => void
}

const submitQuestion = (data: any, state: AnswerState) => {
    makeSuccessToast("Submitted.")
    GlobalVariable.getInstance().setReviewAnswerData(data)
    const local = LocalStorageService.getLocalStorageInstance()
    local.remove([state.accessToken], state.answerToken)
    local.remove([], SURVEY_INPUT_KEY)
}

export const handleSubmit = async ({
    state,
    userLocal,
    userInfo,
    onBeginSubmit,
    onSubmitDone,
    onSubmitSuccess,
    onError,
    signOut,

}: SubmitParams) => {
    // save file to s3:
    let responseS3: Array<any> = []
    const audioBlobs = state.answersAudio
    const retrieveDataFromIndexedDB = async (accessToken: string, answerToken: string, questionId: number) => {
        try {
            // Call getData to retrieve data based on questionId
            const result = await getDataFromIndexDb(accessToken);
            if (result && result.value[questionId] && result.answerToken == answerToken) {
                return result.value[questionId].answerAudio
            } else {
                return undefined
            }
        } catch (error) {
            console.error('Error retrieving data from IndexedDB:', error);
        }
    };
    
    new Promise(async (resolve, reject) => {
        try {
            onBeginSubmit()
            if (audioBlobs) {
                for (let qid of Object.keys(audioBlobs)) {
                    const questionId = Number(qid)
                    //  qid chinh la question id do anh oi
                    const audioBlob = await retrieveDataFromIndexedDB(state.accessToken, state.answerToken, questionId)
                    if (questionId !== 0 && audioBlob !== undefined) {
                        //convert base64 => blob
                        const fetchData = async () => {
                            const responseBlob = await fetch(audioBlob);
                            const blobFromBase64 = await responseBlob.blob();
                            return blobFromBase64;  // Trả giá trị từ hàm fetchData
                          };
                          const blobFromBase64 = await fetchData();
                        const response = await postToS3AWS({
                            questionId: questionId,
                            blob: blobFromBase64,
                            answerToken: state.answerToken,
                            extension: "mp3",
                            username: userInfo.user.username,
                        })
                        responseS3.push({ id: questionId, value: response.Location })
                        // console.log("push")
                        // console.log(responseS3)
                    }
                }
            }
            resolve(responseS3)
        } catch (err) {
            console.log(err)
            reject(err)
        }
    })
        .then((responseS3: any) => {
            for (const item of responseS3) {
                const id = item.id.toString(); 
                state.answers[id].value = item.value;
                
            }
            
            state.answersAudio = undefined
            const header = {
                Authorization: `Bearer ${userInfo.token || userLocal.token}`
            }
            const submitAudioQuestion = ApiService.submitAudioQuestion(state.accessToken, state.answerToken, state, header)
            
            submitAudioQuestion
                .then((res) => {
                    submitQuestion(res.data, state)
                    onSubmitSuccess()
                })
                .catch((err) => {
                    console.log(err)
                    if(err.response?.status == 401 || err.response?.status == 403) {
                        ApiService.refreshToken()
                        .then(
                            () => {
                                state.answersAudio = undefined
                                const submitAudioQuestion = ApiService.submitAudioQuestion(state.accessToken, state.answerToken, state, header)
                                submitAudioQuestion
                                .then((res) => {
                                    submitQuestion(res.data, state)
                                    onSubmitSuccess()
                                })
                                .catch(() => {
                                    onError()
                                    makeErrorToast("Can not submit, please login again!")
                                    if(signOut) {
                                        signOut()
                                    }
    
                                })                        
                            }
                        )
                        .catch(() => {
                            makeErrorToast("Can not refresh token, please login again!")
                            if(signOut) {
                                signOut()
                            }
                        })
                    } else {
                        makeErrorToast("Error, please try again!")
                    }
                    // const errMsg = err.response ? err.response.data.message : err.message
                    // makeErrorToast(errMsg)
                    onError()
                })
        })
        .catch((err) => {
            // error when posting audio to s3
            console.log(err)
            makeErrorToast(err)
            onError()

        })
        .finally(() => {
            onSubmitDone()
        })
}