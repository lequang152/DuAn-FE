'use client'
import { Fragment } from "react";
import ReviewAnswer from "../../../../../components/Survey/FullTest/ReviewAnswer";
import Header from "../../../../../components/Layout/Header/Header";

function Page({ params }: { params: {slug: any} }) {
    return ( 
        <Fragment>
            <style global jsx>{`
                body {
                overflow-x: hidden;
                }
            `}</style>
            <Header/>
            <ReviewAnswer params={params}/>
        </Fragment>
    );
}

export default Page;