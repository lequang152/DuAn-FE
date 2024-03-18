"use client"
import React, { useEffect, useState } from "react"

const ButtonToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            setIsVisible(scrollY > 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <button
            type="button"
            className={`fixed z-30 bottom-10 right-12 bg-yellow-1 p-3 rounded-full transition shadow-sm ${
                isVisible ? `block` : `hidden`
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <i className="fas fa-arrow-up w-7 h-7 flex flex-col justify-center items-center text-green-1"></i>
        </button>
    )
}

export default ButtonToTop
