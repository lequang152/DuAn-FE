import { createSelector } from "@reduxjs/toolkit"

const selectInputExamState = (state: any) => state.exam

export const inputExamSelector = createSelector(selectInputExamState, (state) => {
    return state
})
