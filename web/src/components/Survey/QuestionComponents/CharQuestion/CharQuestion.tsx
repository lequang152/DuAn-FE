import { QuestionProps } from "../../../../constants/props"
import React, { useEffect, useState } from "react"
import Input from "@mui/joy/Input"
import GlobalVariable from "../../../../utils/GlobalVariable"


export const CharQuestion = ({ question, state, disable }: QuestionProps) => {
    const { answers, setAnswers } = state;
    const value = answers?.answers && answers.answers[question.questionId];
    const stateValue = value ? value.value : ""
    const [widthInput, setWidthInput] = useState(200)

    useEffect(() => {
        if(stateValue.length * 9 > 200) {
            setWidthInput(stateValue.length * 9)
        } else {
            setWidthInput(200)
        }
    }, [stateValue])
    // const calculateWidth = stateValue.length * 9 

    // const handleDelete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Backspace" || e.key === "Delete") {
    //       e.currentTarget.style.width = "auto";
    //     }
    //   };

    return (
        <div className="input-wrapper">
            <Input
                sx={{
                    width: widthInput,
                }}
                placeholder="Type your answer here..."
                onChange={(e) => {
                    const newValue: object = {[question.questionId]: e.target.value}
                    let myAnswer: object = JSON.parse(localStorage.getItem("answerOnTest") || "{}")
                    if(Object.keys(myAnswer).length === 0) {
                        localStorage.setItem("answerOnTest", JSON.stringify(newValue))
                    } else {
                        myAnswer = {
                            ...myAnswer,
                            ...newValue,
                        };

                        localStorage.setItem('answerOnTest', JSON.stringify(myAnswer));
                    }

                    setAnswers({
                        questionId: question.questionId,
                        value: e.target.value,
                        accessToken: state.answers.accessToken,
                        answerToken: state.answers.answerToken,
                        questionType: question.questionType,
                    });
                }}
                name={question.questionId + ""}
                value={stateValue}
                variant="outlined"
                color="success"
                className='mt-3'
                disabled={disable}
                // onFocus={(e) => {
                //     if(calculateWidth > e.target.offsetWidth) {
                //         e.target.style.width = calculateWidth + 'px'
                //     }
                // }}
            />
        </div>
    );
};
