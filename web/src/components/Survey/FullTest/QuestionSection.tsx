"use client"
import React from "react"
import classNames from "classnames"
import { NormQuestionFactory } from "./Factory/NormQuestionFactory"

interface pageProps {
    data?: any
}

const QuestionSection: React.FC<pageProps> = (props: pageProps) => {
    return (
        <React.Fragment>
            <ul className="question border-solid border-2 border-[#005e12]">
                {props.data?.map((item: any, index: any) => (
                    <li key={index}>
                        <div
                            className={classNames(
                                "flex flex-row p-10 items-center justify-between border-solid  border-[#005e12] px-4",
                                {
                                    "border-b-2": index !== props.data?.length - 1,
                                }
                            )}
                        >
                            <div className="question__title mr-4 rounded-full w-100% h-[42px] text-center flex flex-row justify-center items-center">
                                <div className="bg-[#005e12] w-fit h-fit mb-0 rounded-full text-white">
                                    <p className="p-2 w-[42px] h-[42px] mb-0">{index + 1}</p>
                                </div>
                                <div className="ml-4 title-text">{item.title.en_US}</div>
                            </div>

                            <div className="question_content">{NormQuestionFactory(item, index)}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    )
}

export default QuestionSection
