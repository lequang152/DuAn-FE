import { QuestionProps } from "../../../../constants/props"
import { Input } from "@mui/joy"
import React from "react"

export const DateTimeQuestion = ({ question, state }: QuestionProps) => {
    const { answers, setAnswers } = state
    const value = answers.answers[question.questionId]
    let valueStr: string = ''
    if(value) {
        try {
            const stateValue = new Date(value.value)
            valueStr = stateValue?.toISOString()
        } catch {
            const stateValue = new Date()
            valueStr = stateValue?.toISOString()
        }
    }
    
    return (
        <div>
            <Input
                type="datetime-local"
                value={valueStr.substring(0, 16)}
                onChange={(e) => {
                    const newValue: object = {[question.questionId]: new Date(e.target.value).toLocaleString()}
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
                    
                    setAnswers({
                        questionId: question.questionId,
                        value: new Date(e.target.value),
                        accessToken: state.answers.accessToken,
                        answerToken: state.answers.answerToken,
                        questionType: question.questionType,
                    })
                }}
                variant="outlined"
                color="success"
            />
        </div>
    )
}
