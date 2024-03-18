import { QuestionProps } from "../../../../constants/props"
import { Input } from "@mui/joy"
import React from "react"

export const DateQuestion = ({ question, state }: QuestionProps) => {
    const { answers, setAnswers } = state

    const value = answers.answers[question.questionId]
    const stateValue = value ? new Date(value.value) : new Date()
    // console.log(stateValue)
    const valueStr = stateValue.toISOString()
    return (
        <div>
            <Input
                type="date"
                value={valueStr.slice(0, 10)}
                onChange={(e) => {
                    console.log(question.suggestedAnswers)

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

function dispatch(arg0: any) {
    throw new Error("Function not implemented.")
}
