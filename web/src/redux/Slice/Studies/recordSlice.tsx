import { RecordStateResponse } from "../../../constants/RecordStateReponse"
import { createSlice } from "@reduxjs/toolkit"

const initialState: RecordStateResponse = {
    data: {},
}

const recordSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {},
})
