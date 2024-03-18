"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userAuthSelector } from "../../../redux/Selector/userAuthorSelector"
import { logOut } from "../../../redux/Slice/Auth/AuthSlice"
import BurgerMenus from "./BurgerMenus"
import { useRouter } from "next/navigation"
import { AppDispatch } from "../../../redux/store"
import { ConfirmModal } from "../../Elements/Models/ConfirmModal"
import { makeWarningToast } from "../../../utils/toast"

const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [isShow, setIsShow] = useState<boolean>(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const userInfo = useSelector(userAuthSelector)
    const headerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const clearLocal = () => {
        localStorage.clear()
        dispatch(logOut())
        makeWarningToast("Signed out!")
        router.push("/sign-in")
    }

    const sigOutHandler = () => {
        setIsShow(true)
    }
    const closeModal = () => {
        setIsShow(false)
    }
    // console.log("use Info", userInfo)

    const sticky = (e: Event) => {
        const header = headerRef.current
        const scrollTop = window.scrollY
        scrollTop >= 1 ? header?.classList.add("sticky") : header?.classList.remove("sticky")
    }

    useEffect(() => {
        window.addEventListener("scroll", sticky)
        return () => {
            window.removeEventListener("scroll", sticky)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            {/* <Head>
                <title>Educal – Online Course and Education React, Nextjs Template</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head> */}

            <header className="w-screen">
                {isShow && (
                    <ConfirmModal
                        header="Warning"
                        message={`Do you want to log out?`}
                        handleSubmit={() => clearLocal()}
                        handleClose={() => closeModal()}
                    />
                )}
                <div
                    // ref={headerRef}
                    id="header-sticky"
                    className="header__area sticky top-0 z-30 w-full box-border px-3 py-3 md:px-0 md:py-0"
                >
                    <div className="container-fluid">
                        <div className="row align-items-center w-full ">
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6">
                                <div className="header__left d-flex">
                                    <div className="logo">
                                        <Link href="/">
                                            <Image
                                                width={500}
                                                height={64}
                                                src="/assets/img/logo/odin-logo-login.png"
                                                alt="logo"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-8 col-sm-8 col-6">
                                <div className="header__right d-flex justify-content-end align-items-center">
                                    <div className="main-menu d-none d-xl-block border-r pr-5">
                                        <nav id="mobile-menu">
                                            {userInfo.isAuthenticated ? (
                                                <ul>
                                                    <li className="has-dropdown1">
                                                        <Link href="/">Home</Link>
                                                    </li>

                                                    <li className="has-dropdown">
                                                        <Link href="">Select a test</Link>
                                                        <ul className="submenu">
                                                            <li>
                                                                <Link href="/survey/survey-list">Full Test</Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    href="/survey/survey-details/random"
                                                                    onClick={() => {
                                                                        const host = window.location.origin

                                                                        window.location.href =
                                                                            "/survey/survey-details/random"
                                                                    }}
                                                                >
                                                                    Progress Test
                                                                </Link>
                                                                <ul className="submenu">
                                                                    <li
                                                                        onClick={() =>
                                                                            router.push("/survey/survey-details/random")
                                                                        }
                                                                    >
                                                                        <Link href="">Full Exam</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link href="/coming-soon">Listening Test</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link href="/coming-soon">Reading Test</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link href="/coming-soon">Speaking Test</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link href="/coming-soon">Writing Test</Link>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <Link href='/'>Test With Code</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            ) : (
                                                <ul>
                                                    <li className="has-dropdown1">
                                                        <Link href="/">Home</Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </nav>
                                    </div>
                                    {userInfo.isAuthenticated ? (
                                        <div className="header__btn ml-5 d-none d-sm-block">
                                            <Link
                                                href="/"
                                                className="e-btn"
                                            >
                                                {userInfo.user?.username}
                                            </Link>
                                            <Link
                                                onClick={() => {
                                                    sigOutHandler()
                                                }}
                                                href=""
                                            >
                                                Log out
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="header__btn ml-5 d-none d-sm-block">
                                            <Link
                                                href="/sign-in"
                                                className="e-btn"
                                            >
                                                Sign-in
                                            </Link>
                                            <Link href="/sign-up">Sign-up</Link>
                                        </div>
                                    )}
                                    <div className="sidebar__menu d-xl-none">
                                        <div
                                            className="sidebar-toggle-btn ml-30"
                                            id="sidebar-toggle"
                                            onClick={() => {
                                                setMenuOpen(!menuOpen)
                                            }}
                                        >
                                            <span className="line"></span>
                                            <span className="line"></span>
                                            <span className="line"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <BurgerMenus
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                />
                {/* <div
                    onClick={() => setMenuOpen(false)}
                    className={menuOpen ? "body-overlay show" : "body-overlay"}
                ></div> */}
            </header>
        </React.Fragment>
    )
}

export default Header
