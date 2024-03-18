"use client"

import Link from "next/link"
import React, { ChangeEvent, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import Image from "next/image"
import { makeErrorToast, makeSuccessToast } from "../../utils/toast"
import { useRouter } from "next/navigation"
import { ApiService } from "../../utils/api_service"

const SignUpMain: React.FC = () => {
    const router = useRouter()
    const [formSignUp, setFormSignUp] = useState({
        name: "",
        username: "",
        password: "",
        rePassword: "",
        agreed: false,
    })
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [re_passwordVisible, setRe_PasswordVisible] = useState(true)
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormSignUp({ ...formSignUp, [name]: value })
    }
    const handleAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormSignUp({ ...formSignUp, agreed: e.target.checked })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userPost = {
            name: "",
            username: "",
            password: "",
        }
        userPost.name = formSignUp.name
        userPost.username = formSignUp.username
        userPost.password = formSignUp.password
        // console.log({ userPost })

        if (formSignUp.password != formSignUp.rePassword) {
            makeErrorToast("Password does not match.")
        } else if (formSignUp.agreed == false) {
            makeErrorToast("Please agree to our Terms & Conditions.")
        } else {
            const response = ApiService.Register(formSignUp)
            response.then((res: AxiosResponse<any, any>) => {
                makeSuccessToast("Registered successfully.")
                router.push("/sign-in")
            })
            .catch((error: any) => {
                let textMessage = ""
                try {
                    const errors = error.response.data.errors
                    const keys = Object.keys(errors)
                    const values = Object.values(errors)
                    textMessage = `${values[0]}`
                } catch (err: any) {
                    textMessage = "An unknown error happended. Try again."
                } finally {
                    makeErrorToast(textMessage)
                }
            })
            
        }
    }
    return (
        <main>
            <section className="signup__area po-rel-z1 pt-24 pb-36">
                <div className="sign__shape">
                    <Image
                        width={130}
                        height={250}
                        className="man-1"
                        src="/assets/img/icon/sign/man-1.png"
                        alt="img not found"
                    />
                    <Image
                        width={100}
                        height={123}
                        className="man-2"
                        src="/assets/img/icon/sign/man-2.png"
                        alt="img not found"
                    />
                    <Image
                        width={25}
                        height={20}
                        className="circle"
                        src="/assets/img/icon/sign/circle.png"
                        alt="img not found"
                    />
                    <Image
                        width={32}
                        height={17}
                        className="zigzag"
                        src="/assets/img/icon/sign/zigzag.png"
                        alt="img not found"
                    />
                    <Image
                        width={33}
                        height={63}
                        className="dot"
                        src="/assets/img/icon/sign/dot.png"
                        alt="img not found"
                    />
                    <Image
                        width={624}
                        height={680}
                        className="bg"
                        src="/assets/img/icon/sign/sign-up.png"
                        alt="img not found"
                    />
                    <Image
                        width={70}
                        height={66}
                        className="flower"
                        src="/assets/img/icon/sign/flower.png"
                        alt="img not found"
                    />
                </div>
                <div className="flex flex-col items-center justify-between">
                    <div className="row">
                        <div className="">
                            <div className="section__title-wrapper text-center mb-14">
                                <h2 className="section__title">
                                    Create a free <br /> Account
                                </h2>
                                <p>I&apos;m a subhead that goes with a story.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row w-full lg:w-[35%] md:w-3/4">
                        <div className="w-[100%]">
                            <div className="sign__wrapper px-14 py-10 white-bg">
                                <div className="sign__header mb-9">
                                    <div className="sign__in text-center">
                                        {/* <a
                      href="#"
                      className="sign__social g-plus text-start mb-15"
                    >
                      <i className="fab fa-google"></i>Sign Up with Google
                    </a> */}
                                        <p>
                                            <span>........</span> Or, <Link href="/sign-up">sign up</Link> with your
                                            email
                                            <span> ........</span>{" "}
                                        </p>
                                    </div>
                                </div>

                                <div className="sign__form">
                                    <form
                                        action="#"
                                        onSubmit={handleSubmit}
                                    >
                                        {/* <div className="sign__input-wrapper mb-25">
                  <h5>Full Name</h5>
                  <div className="sign__input">
                    <input
                      type="text"
                      name="fullName"
                      value={formSignUp.fullName}
                      onChange={handleChangeInput}
                      placeholder="Full name"
                    />
                    <i className="fas fa-user"></i>
                  </div>
                </div> */}
                                        <div className="sign__input-wrapper mb-6">
                                            <h5>Your Name</h5>
                                            <div className="sign__input">
                                                <div>
                                                    <i className="fas fa-user icon"></i>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formSignUp.name}
                                                        onChange={handleChangeInput}
                                                        placeholder="Enter your name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sign__input-wrapper mb-6">
                                            <h5>Work email</h5>
                                            <div className="sign__input">
                                                <div>
                                                    <i className="fas fa-envelope icon"></i>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={formSignUp.username}
                                                        onChange={handleChangeInput}
                                                        placeholder="Enter your e-mail address"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sign__input-wrapper  mb-6">
                                            <h5>Password</h5>
                                            <div className="sign__input">
                                                <div>
                                                    <i className="fas fa-lock icon"></i>
                                                    <input
                                                        type="text"
                                                        name="password"
                                                        value={formSignUp.password}
                                                        onChange={handleChangeInput}
                                                        placeholder="Password"
                                                    />
                                                    {passwordVisible ? (
                                                        <i
                                                            className="fas fa-eye icon_eye cursor-pointer"
                                                            onClick={() => setPasswordVisible(false)}
                                                        ></i>
                                                    ) : (
                                                        <i
                                                            className="fas fa-eye-slash icon_eye cursor-pointer"
                                                            onClick={() => setPasswordVisible(true)}
                                                        ></i>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sign__input-wrapper  mb-6">
                                            <h5>Re-Password</h5>
                                            <div className="sign__input">
                                                <div>
                                                    <i className="fas fa-lock icon"></i>
                                                    <input
                                                        type={passwordVisible ? "text" : "password"}
                                                        name="rePassword"
                                                        value={formSignUp.rePassword}
                                                        onChange={handleChangeInput}
                                                        placeholder="Re-Password"
                                                    />
                                                    {re_passwordVisible ? (
                                                        <i
                                                            className="fas fa-eye icon_eye cursor-pointer"
                                                            onClick={() => setRe_PasswordVisible(false)}
                                                        ></i>
                                                    ) : (
                                                        <i
                                                            className="fas fa-eye-slash icon_eye cursor-pointer"
                                                            onClick={() => setRe_PasswordVisible(true)}
                                                        ></i>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sign__action d-flex justify-content-between mb-30">
                                            <div className="sign__agree d-flex align-items-center">
                                                <input
                                                    className="m-check-input"
                                                    type="checkbox"
                                                    id="m-agree"
                                                    checked={formSignUp.agreed}
                                                    onChange={handleAgreeChange}
                                                />
                                                <label
                                                    className="m-check-label"
                                                    htmlFor="m-agree"
                                                >
                                                    I agree to the <a href="#">Terms & Conditions</a>
                                                </label>
                                            </div>
                                        </div>
                                        <button className="e-btn mt-6 w-100">
                                            {" "}
                                            <span></span> Sign Up
                                        </button>
                                        <div className="sign__new text-center mt-10">
                                            <p>
                                                Already have an account ? <Link href="/sign-in">Sign In</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default SignUpMain
