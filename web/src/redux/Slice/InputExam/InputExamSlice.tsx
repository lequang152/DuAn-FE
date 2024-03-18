import { ExamTest } from "../../../constants/exam.type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosHeaders } from "axios"
import { headers } from "next/dist/client/components/headers"
import { ApiService } from "../../../utils/api_service"

const initialState: ExamTest = {
    accessToken: "",
    answerToken: "",
    timeLimit: 0,
    isTimeLimited: 0,
    timeLSLimit: 0,
    title: {},
}

const InputExam = createSlice({
    name: "exam",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(StartExam.fulfilled, (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        })
    },
})

export const StartExam = createAsyncThunk("Exam/startExam", async (data: any) => {
    const header = {
        Authorization: `Bearer ${data.userInfo.token}`
    }
    const res = await ApiService.apiStartExam(data.accessToken, header)
    return res.data
})

export default InputExam
