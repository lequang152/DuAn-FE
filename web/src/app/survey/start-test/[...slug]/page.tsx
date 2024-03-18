"use client"
import HeaderTest from "../../../../components/Layout/Header/HeaderOnTest"
import { StartTestMain } from "../../../../components/Survey/StartTest/StartTestMain"
import React, { Fragment } from "react"

export default function Page({ params }: { params: { slug: any } }) {
    // console.log('====================================');
    // console.log("params", params);
    // console.log('====================================');
    return (
        <Fragment>
            {/* <HeaderTest /> */}
            <StartTestMain params={params} />
        </Fragment>
    )
}
