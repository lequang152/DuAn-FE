"use client"
import dynamic from "next/dynamic"
import HomeMain from "../components/Home/HomeMain"
import Footer from "../components/Layout/Footer/Footer"
// import Header from '../components/Layout/Header/Header';
const Header = dynamic(() => import("../components/Layout/Header/Header"), { ssr: false })
import React, { useEffect, useState } from "react"

import "tailwindcss/tailwind.css"

export default function Home() {
    
    return (
        <React.Fragment>
            <Header />
            <HomeMain />
            <Footer />
        </React.Fragment>
    )
}
