"use client"
import { useRouter } from "next/navigation"
import Header from "../../../components/Layout/Header/Header"
import SurveyListMain from "../../../components/Survey/SurveyList/SurveyListMain"
// const SurveyListMain = dynamic(() => import("../../../components/Survey/SurveyList/SurveyListMain"))
import React, { Fragment, useEffect } from "react"

const SurveyList: React.FC = () => {
    return (
        <Fragment>
            <Header />
            <SurveyListMain />
        </Fragment>
    )
}

export default SurveyList
