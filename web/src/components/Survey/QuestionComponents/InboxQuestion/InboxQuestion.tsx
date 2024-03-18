import { useEffect, useRef, useState } from "react"
import { QuestionProps } from "../../../../constants/props"
import { LocalStorageService, SURVEY_KEY } from "../../../../utils/local_survey"
import ReactDOMServer from "react-dom/server"
import { Question } from "../../../../constants/question.types"
import { current } from "@reduxjs/toolkit"
import { Input } from "@mui/material"
import React from "react"
import { SurveyQuestionType } from "../../../../constants/QuestionType"
import GlobalVariable from "../../../../utils/GlobalVariable"

function InboxQuestion({ question, state, disable }: QuestionProps) {
    const regex = new RegExp(/({{[0-9]+}}+)/gi)
    const suggestedQuestions = question.suggestedAnswers as Question[]
    let index = 0
    // const timeoutRef = useRef<NodeJS.Timeout>()
    useEffect(() => {
        const handleChange = (id: number, questionType: SurveyQuestionType) => {
            return (e: Event) => {
                    const newValue: object = {[id]: (e.target as HTMLInputElement).value}
                    let myAnswer: object = JSON.parse(localStorage.getItem("answerOnTest") || "{}")
                    if(Object.keys(myAnswer).length === 0) {
                        localStorage.setItem("answerOnTest", JSON.stringify(newValue))
                    } else {
                        myAnswer = {
                            ...myAnswer, 
                            ...newValue
                        }
                                    
                        localStorage.setItem("answerOnTest", JSON.stringify(myAnswer))
                    }
                state.setAnswers({
                    accessToken: state.answers.accessToken,
                    answerToken: state.answers.answerToken,
                    questionId: id,
                    questionType: questionType,
                    value: (e.target as HTMLInputElement).value,
                })

            }
        }
        for (let suggestedAnswer of question.suggestedAnswers as Question[]) {
            const id = suggestedAnswer.questionId
            const element = document.getElementById(id + "") as HTMLInputElement
           
            if (element) {
                element.addEventListener('change', handleChange(id, suggestedAnswer.questionType))
            }
        }
        return () => {
            for (let suggestedAnswer of question.suggestedAnswers as Question[]) {
                const id = suggestedAnswer.questionId;
                const element = document.getElementById(id + "") as HTMLInputElement;
    
                if (element) {
                    element.removeEventListener('change', handleChange(id, suggestedAnswer.questionType));
                }
            }
        };
       
    })

    return (
        <>
            <div
                className="container"
                dangerouslySetInnerHTML={{
                    __html: question.title.en_US
                        .split(regex)
                        .filter((e: any) => e != "")
                        .map((e: any) => {
                            if (regex.test(e)) {
                                try {
                                    let crrIndex = index
                                    index++
                                    const preInput = state.answers.answers[suggestedQuestions[crrIndex].questionId]
                                    return ReactDOMServer.renderToString(
                                        <input
                                            id={suggestedQuestions[crrIndex].questionId + ""}
                                            name={suggestedQuestions[crrIndex].questionId + ""}
                                            type="text"
                                            className="input-inbox"
                                            placeholder="Type your answer here..."
                                            value={preInput ? preInput.value : ""}
                                            onChange={() => {}}
                                            disabled={disable}
                                        />
                                    )
                                } catch (err) {
                                    // console.warn("Number of patterns does not match all questions. ")
                                }
                            }
                            return e
                        })
                        .join(""),
                }}
            />
        </>
    )
}

export default React.memo(InboxQuestion)