"use client"
import { Fragment, useEffect } from "react"
import Header from "../../../../../components/Layout/Header/Header"
import Popup from "../../../../../components/Survey/FullTest/Popup"

export default function Page({ params }: { params: { slug: string } }) {
 
    return (
        <Fragment>
            <style global jsx>{`
                body {
                overflow: hidden;
                }
            `}</style>
            <Header />
            <Popup idSurveyDetails={params?.slug}/>
        </Fragment>
    )
}
