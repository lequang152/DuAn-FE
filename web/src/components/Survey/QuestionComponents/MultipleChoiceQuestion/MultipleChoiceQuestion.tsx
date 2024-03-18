import { QuestionProps } from "../../../../constants/props"
import { Answer } from "../../../../constants/question.types"
import Checkbox from "@mui/joy/Checkbox"
import React, { useState } from "react"
import { asc } from "../SelectQuestion/SelectQuestion"
import GlobalVariable from "../../../../utils/GlobalVariable"


export const MultipleChoiceQuestion = ({ question, state, disable }: QuestionProps) => {
    const { answers, setAnswers } = state
    const _value = answers.answers[question.questionId]
    const global = GlobalVariable.getInstance()
    const [isChoose, setIsChoose] = useState(false)

    const stateValue = _value ? (_value.value == "" ? [] : _value.value) : []
    question.suggestedAnswers = (question.suggestedAnswers! as Answer[]).sort(asc)

    return (
        <>
            <div className="flex flex-col justify-between">
                {(question.suggestedAnswers as Answer[]).map((answer, aindex) => {
                    const checkBoxAnswer = new Array()
                    checkBoxAnswer.push(answer)
                    return (
                        <div
                            key={aindex}
                            className="flex flex-row items-center"
                        >
                            <Checkbox
                                disabled={disable}
                                name={question.questionId + ""}
                                value={answer.id}
                                checked={stateValue.find((e: any) => e == answer.id) != undefined}
                                onChange={(e) => {

                                    const x = document.getElementsByName(question.questionId + "")
                                    const checkedId: number[] = []
                                    x.forEach((e) => {
                                        const element = e as HTMLInputElement
                                        if (element.checked) {
                                            checkedId.push(Number(element.value))
                                        }
                                    })
                                    if(question.suggestedAnswers) {
                                        let textAnswer: string = ''
                                        const userAnswer: any[] = []
                                        
                                        const suggestAnswers = question.suggestedAnswers as Answer[]
                                        checkedId.map((id) => {
                                            const ans = suggestAnswers.find((suggestAns) => suggestAns.id == id)
                                            userAnswer.push(ans)
                                        })
                                        userAnswer.map((ans, index) => {
                                            if(index === 0) {
                                                if(ans.value.en_US.length > 10) {
                                                    textAnswer += ans.value.en_US.substring(0, 10) + '...'
                                                } else {
                                                    textAnswer += ans.value.en_US
                                                }
                                            } else {
                                                if(ans.value.en_US.length > 20) {
                                                    textAnswer += " - " + ans.value.en_US.substring(0, 20) 
                                                } else {
                                                    textAnswer += " - " + ans.value.en_US
                                                }
                                            }
                                        })
                                        const newValue: object = {[question.questionId]: textAnswer}
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

                                    }
                                    if (question.maxSelectionNumber && checkedId.length > question.maxSelectionNumber) {
                                        return
                                    }
                                    setAnswers({
                                        questionId: question.questionId,
                                        value: checkedId,
                                        accessToken: state.answers.accessToken,
                                        answerToken: state.answers.answerToken,
                                        questionType: question.questionType,
                                    })
                                }}
                                color="success"
                            />
                            <p className="ml-3 pr-4 text-left mb-0">{answer.value.en_US}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
