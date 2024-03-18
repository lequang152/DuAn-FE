import { createSelector } from "@reduxjs/toolkit"

const AnswerExam = (state: any) => state.answer

export const AnserExamSelected = createSelector(AnswerExam, (item) => {
    return item
})
