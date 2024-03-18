"use client"
import { Fragment } from "react"
import Header from "../../../components/Layout/Header/Header"
import SurveyDetailMain from "../../../components/Survey/SurveyDetail/SurveyDetailMain"
import Footer from "../../../components/Layout/Footer/Footer"

export default function Page() {
    return (
        <Fragment>
            <Header />
            <SurveyDetailMain />
            <Footer />
        </Fragment>
    )
}
