import { QuestionProps } from "../../../constants/props"
import React from "react"

export const WritingQuestion = ({ question }: QuestionProps) => {
    return (
        <div>
            {/* Anh css cho nay cho no dep */}

            {/* Day hien tieu de */}
            <div
                className="mb-3"
                dangerouslySetInnerHTML={{ __html: question.title.en_US }}
            />

            <div>
                {/* Day hien phan bai viet cho thi sinh */}
                {/* Css cho nay nua la ok */}
                <textarea></textarea>
            </div>
        </div>
    )
}
