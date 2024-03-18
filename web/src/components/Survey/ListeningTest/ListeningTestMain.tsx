"use client"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import classNames from "classnames"
import React, { Fragment, useEffect, useState } from "react"
import ConfirmNotification from "../../Elements/ConfirmNotification"
import Player from "./AudioSection/Player"
// import dataUserTest from "./Data/dataUserTest.json"
// import QuestionRes from "./Data/questionTestRes.json"

const ListeningTestMain: React.FC = () => {
    const userInfo = null
    const [pageNumber, setPageNumber] = useState<any>(0)
    const [pageData, setPageData] = useState<any>()
    const [questionRes, setQuestionRes] = useState<any>()
    const [view, showView] = useState<any>(false)

    const setShowView = () => {
        showView(!view)
    }
    useEffect(() => {
        setPageData(questionRes.pages[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // console.log("data", questionRes.pages)
    // console.log(view)
    return (
        <div className="flex flex-col w-full h-screen overflow-hidden">
            <Fragment>
                <ConfirmNotification
                    data={view}
                    onClick={setShowView}
                />
                <div className="mt-[64px] mb-[64px] h-screen w-full flex flex-row sm:flex-col">
                    {/* title-nav */}
                    <div className="w-1/2 h-screen overflow-auto p-10 bg-[#ffed9bad] ">
                        {/* <div>{pageData?.page?.description?.en_US}</div> */}
                        <Player src="" />
                        {pageNumber === 0 ? (
                            <div>
                                <h3 className="text-[#005e12]">PART 1 : QUESTIONS 1-10</h3>
                                <h1>Questions 1-5</h1>
                                <p className="text-black text-1xl">
                                    The housing officer takes some details from the girl.
                                </p>

                                <p className="text-black text-2xl italic">
                                    Complete the following form with{" "}
                                    <span className="text-red-600">NO MORE THAN THREE WORDS AND/OR A NUMBER</span> for
                                    each answer.
                                </p>
                            </div>
                        ) : pageNumber === 1 ? (
                            <div>
                                <h3 className="text-[#005e12]">PART 1 : QUESTIONS 1-10</h3>
                                <h1>Questions 7-10</h1>
                                <p className="text-black text-1xl">
                                    The housing officer takes some details from the girl.
                                </p>

                                <p className="text-black text-2xl italic">
                                    Fill in the blanks with{" "}
                                    <span className="text-red-600">NO MORE THAN THREE WORDS</span> for each answer.
                                </p>
                            </div>
                        ) : null}
                    </div>
                    {/* question-nav */}
                    <div className="w-1/2 h-screen overflow-scroll px-10 pt-10 pb-64 relative">
                        {/* <QuestionSection questions={pageData?.questions} state={state}/> */}
                    </div>
                    {/* btn action  */}
                    <div
                        className={classNames(
                            " bg-[#d4dae0] h-[60px] w-1/2 absolute bottom-16  right-0 flex justify-between items-center",
                            {
                                "flex-row": pageNumber > 0 && pageNumber < questionRes.pages.length - 1,
                                "flex-row-reverse": pageNumber === 0,
                            }
                        )}
                    >
                        {pageNumber === 0 ? null : (
                            <button
                                value="previous"
                                className="text-white mx-4 px-3 py-1 rounded bg-[#767676e7] flex items-center h-3/5"
                                onClick={() => {
                                    if (pageNumber >= 1) {
                                        setPageNumber(pageNumber - 1)
                                        setPageData(questionRes.pages[pageNumber - 1])
                                    }
                                }}
                            >
                                <NavigateBeforeIcon className="pr-1" /> Previous
                            </button>
                        )}
                        {pageNumber <= questionRes.pages.length - 1 ? (
                            <button
                                value="next"
                                className="text-white mx-4 px-3 py-1 rounded bg-[#767676e7] flex items-center h-3/5"
                                onClick={() => {
                                    if (pageNumber < questionRes.pages.length - 1) {
                                        setPageNumber(pageNumber + 1)
                                        setPageData(questionRes.pages[pageNumber + 1])
                                    }
                                }}
                            >
                                Next <NavigateNextIcon className="pl-1" />
                            </button>
                        ) : null}
                    </div>
                </div>
                {/* <FooterTest /> */}
            </Fragment>
        </div>
    )
}

export default ListeningTestMain
