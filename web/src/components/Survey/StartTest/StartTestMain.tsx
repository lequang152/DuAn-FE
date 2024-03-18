"use client"
import { ConfirmModal } from "../../Elements/Models/ConfirmModal"
import { inputExamSelector } from "../../../redux/Selector/inputExamSelector"
import { userAuthSelector } from "../../../redux/Selector/userAuthorSelector"
import axios, { AxiosHeaders } from "axios"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { LocalStorageService, SURVEY_INPUT_KEY } from "../../../utils/local_survey"
import { ApiService } from "../../../utils/api_service"

export const StartTestMain: React.FC<any> = ({ params }) => {
    // console.log("====================================")
    // console.log("params", params?.slug)
    // console.log("====================================")

    const selectedExam = useSelector(inputExamSelector)
    const userInfo = useSelector(userAuthSelector)
    const router = useRouter()

    const [isShow, setIsShow] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const handleStart = () => {
        if (params && params?.slug.length < 1) {
            return
        }

        const local = LocalStorageService.getLocalStorageInstance()
        local.remove([params?.slug[0]], params?.slug[1])
        
        const header = {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
        }
        
        const startTestMain = ApiService.startTestMain(params?.slug[0], params?.slug[1], header)
        startTestMain
            .then((res) => {
                const data = res.data
                // luu localstorage:
                const localData = local.get(SURVEY_INPUT_KEY)

                local.set([], SURVEY_INPUT_KEY, {
                    ...localData,
                    ...res.data,
                })

                router.push(`/survey/full-test/${data?.accessToken}/${data?.answerToken}`)
            })
            .catch((err) => {
                setIsShow(true)
                setErrMsg(err.response.data.message)
            })
    }

    return (
        <>
            {isShow && (
                <ConfirmModal
                    header="Error"
                    message={errMsg}
                    handleSubmit={() => setIsShow(false)}
                />
            )}

            <div className="pt-16 flex flex-col container h-screen justify-center items-center">
                <button
                    className="px-5 py-3 bg-green-1 text-yellow-1 rounded-3xl mb-5"
                    onClick={handleStart}
                >
                    Start?
                </button>
                <button
                    className="mx-5 my-3 text-green-1 mb-5"
                    onClick={() => router.push("/survey/survey-list")}
                >
                    Back
                </button>
            </div>
        </>
    )
}
