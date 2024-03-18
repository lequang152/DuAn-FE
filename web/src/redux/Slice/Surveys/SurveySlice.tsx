import { SurveySelectedState } from "../../../constants/SurveySelectedState"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState: SurveySelectedState = {}

const SurveySlice = createSlice({
    name: "survey",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSurveyData.fulfilled, (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        })
    },
})

export const fetchSurveyData = createAsyncThunk("survey/fetchSurveyData", async (data: any) => {
    // const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/survey/${data?.accessToken}?page=1`, {
    //     headers: { Authorization: `Bearer ${data?.token}` },
    // })
    // return { data: res.data }

    return data
})
export default SurveySlice
