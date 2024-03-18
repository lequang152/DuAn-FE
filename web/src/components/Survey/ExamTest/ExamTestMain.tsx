"use client"
import { userAuthSelector } from "../../../redux/Selector/userAuthorSelector"
import axios, { AxiosHeaders } from "axios"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ApiService } from "../../../utils/api_service"

const ExamTestMain: React.FC = () => {
    const userInfo = useSelector(userAuthSelector)
    const [examTest, setExamTest] = useState<any>()
    const [page, setPage] = useState(1)
    const route = useRouter()

    const header = {
        Authorization: `Bearer ${userInfo.token}`
    }

    useEffect(() => {
        const getExamTestMain = ApiService.examTestMain(page, header)
        getExamTestMain
            .then((res) => {
                // console.log("data")

                // console.log(res)

                setExamTest(res)
            })
            .catch((err) => {
                // console.log(err)
                route.push("/")
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <div className="text-center font-bold text-2xl mt-[80px]">{examTest?.data?.title?.en_US}</div>
            <div className=" w-5/6 drop-shadow-xl mt-[10px] flex flex-col justify-center items-center h-3/4 bg-[#ffed9bad] rounded-3xl relative">
                {/* action tab */}
                <div className="absolute px-4 py-3 top-0 left-0 right-0 h-fit rounded-t-3xl bg-[#d9c984] flex flex-row items-center justify-between">
                    <div
                        className={classNames("w-full flex justify-between", {
                            "flex-row-reverse": page === 1,
                            "flex-row": page > 1,
                        })}
                    >
                        {page > 1 ? (
                            <Link
                                href=""
                                className="e-btn"
                                onClick={() => setPage(page - 1)}
                            >
                                Previos
                            </Link>
                        ) : null}

                        {page < examTest?.data?.data?.numberOfPage ? (
                            <Link
                                href=""
                                className="e-btn "
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </Link>
                        ) : null}
                    </div>
                </div>

                {/* question tab */}
                <div></div>
            </div>
        </div>
    )
}

export default ExamTestMain
