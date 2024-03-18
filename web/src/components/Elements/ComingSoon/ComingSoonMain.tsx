"use client"

import { useRouter } from "next/navigation"
import React from "react"

const ComingSoonMain = () => {
    const router = useRouter()
    return (
        <div className="bg-green-1 h-full flex flex-col justify-center items-center">
            <h1 className="text-yellow-1 text-6xl mb-2">
                coming soon<span className="dot text-red-500">.</span>
            </h1>
            <div className="mb-5 text-white">Function under development, please come back later</div>
            <div
                className="e-btn mb-3 transition"
                onClick={() => router.push("/")}
            >
                Return to home page
            </div>
            <div className="icons text-center flex flex-row">
                <a
                    href=""
                    className="flex flex-col justify-center p-3 mx-3 text-yellow-1 rounded-full border  hover:text-green-1 hover:bg-yellow-1 hover:border-0"
                >
                    <i className="fab fa-facebook-f w-4 h-4"></i>
                </a>
                <a
                    href=""
                    className="flex flex-col justify-center p-3 mx-3 text-yellow-1 rounded-full border  hover:text-green-1 hover:bg-yellow-1 hover:border-0"
                >
                    <i className="fab fa-youtube w-4 h-4"></i>
                </a>
                <a
                    href=""
                    className="flex flex-col justify-center p-3 mx-3 text-yellow-1 rounded-full border hover:text-green-1 hover:bg-yellow-1 hover:border-0"
                >
                    <i className="fa fa-paper-plane w-4 h-4"></i>
                </a>
            </div>
        </div>
    )
}

export default ComingSoonMain
