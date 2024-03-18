"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import BurgerMenus from "./BurgerMenus"

const HeaderFour: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isSignInPage, setIsSignInPage] = useState(false)

    const pathname = usePathname()

    const headerRef = useRef<HTMLDivElement>(null)

    const sticky = (e: Event) => {
        const header = headerRef.current
        const scrollTop = window.scrollY
        scrollTop >= 1 ? header?.classList.add("sticky") : header?.classList.remove("sticky")
    }

    useEffect(() => {
        window.addEventListener("scroll", sticky)

        // Hủy đăng ký sự kiện khi component unmount
        return () => {
            window.removeEventListener("scroll", sticky)
        }
    }, [])

    useEffect(() => {
        pathname === "/sign-in" ? setIsSignInPage(true) : setIsSignInPage(false)
    }, [pathname])

    return (
        <React.Fragment>
            {/* <Head>
                <title>Educal – Online Course and Education React, Nextjs Template</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head> */}
            <header>
                <div
                    ref={headerRef}
                    id="header-sticky"
                    className="header__area header__padding-2 header__shadow  px-3 py-3"
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-5 col-6">
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
                            <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-8 col-sm-7 col-6">
                                <div className="header__right d-flex justify-content-end align-items-center">
                                    <div className="main-menu main-menu-2 d-none d-xl-block">
                                        <nav id="mobile-menu">
                                            <ul>
                                                <li className="has-dropdown1">
                                                    <Link href="/">Home</Link>
                                                </li>
                                               
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="header__btn header__btn-2 ml-50 d-none d-sm-block">
                                        {isSignInPage ? (
                                            <Link
                                                href="/sign-up"
                                                className="e-btn"
                                            >
                                                Sign Up
                                            </Link>
                                        ) : (
                                            <Link
                                                href="/sign-in"
                                                className="e-btn"
                                            >
                                                Sign In
                                            </Link>
                                        )}
                                    </div>
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
                <div
                    onClick={() => setMenuOpen(false)}
                    className={menuOpen ? "body-overlay show" : "body-overlay"}
                ></div>
            </header>
        </React.Fragment>
    )
}

export default HeaderFour
