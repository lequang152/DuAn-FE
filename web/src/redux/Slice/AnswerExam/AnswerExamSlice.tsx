import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export type SetAnswerPayload = {
    questionId: number
    value: any
}

export type AnswerPayload = {
    value: string | number | Array<any> | Date
}

export type AnswerStateType = {
    answers: any
}

const initialState: AnswerStateType = {
    answers: {}, // []
}

const AnswerExamSlice = createSlice({
    name: "answer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setAnswer.fulfilled, (state, action: PayloadAction<SetAnswerPayload>) => {
            const questionId = action.payload.questionId
            const value = action.payload.value
            state.answers[questionId] = { value: value }
            localStorage.setItem("answer", JSON.stringify(state))
        })
    },
})

export const setAnswer = createAsyncThunk("answer/setAnswer", async (item: SetAnswerPayload) => {
    return item
})

export default AnswerExamSlice
