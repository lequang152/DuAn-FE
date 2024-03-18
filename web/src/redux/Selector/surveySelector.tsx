import { createSelector } from "@reduxjs/toolkit"

export const surveySelected = (state: any) => state.survey

export const surveySelector = createSelector(surveySelected, (survey) => {
    return survey
})
