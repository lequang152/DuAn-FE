"use client"
import { Fragment, useEffect } from "react"
import Header from "../../../../components/Layout/Header/Header"
import SurveyDetailMain from "../../../../components/Survey/SurveyDetail/SurveyDetailMain"
import Footer from "../../../../components/Layout/Footer/Footer"

export default function Page({ params }: { params: { slug: string } }) {
 
    return (
        <Fragment>
            <Header />
            <SurveyDetailMain idSurveyDetails={params?.slug} />
            <Footer />
        </Fragment>
    )
}
