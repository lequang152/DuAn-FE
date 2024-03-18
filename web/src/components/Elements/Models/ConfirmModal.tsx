import React, { Fragment, useState } from "react"

type pageProps = {
    message: string
    header: string
    handleClose?: (...arg: any[]) => void
    handleSubmit: (...arg: any[]) => void
    handleContinue?: (...arg: any[]) => void
    textClose?: string
    textOk?: string
    textNo?: string
    useInputBox?: boolean
    inputBoxLabel?: string
}

export const ConfirmModal = ({
    handleClose,
    handleSubmit,
    message,
    header,
    handleContinue,
    textNo,
    textOk,
    useInputBox,
    inputBoxLabel,
}: pageProps) => {
    const [value, setValue] = useState("")
    return (
        <Fragment>
            <div
                className={`relative z-10 transition`}
                aria-labelledby="modal-title"
                role="dialog"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-10 sm:p-6 sm:pb-4">
                                <div className="sm:flex items-center">
                                    <div className=" flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg
                                            className="h-6 w-6 text-green-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-5 sm:text-left">
                                        <h3
                                            className="text-base font-semibold leading-6 text-gray-900"
                                            id="modal-title"
                                        >
                                            {header}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">{message}</p>
                                        </div>
                                    </div>
                                </div>
                                {useInputBox && (
                                    <div className="flex flex-col gap-1 mt-2">
                                        <label htmlFor="">{inputBoxLabel}</label>
                                        <input
                                            type="text"
                                            className="p-2 border border-lime-600"
                                            style={{
                                                outline: "none",
                                                borderRadius: "4px",
                                                color: "black",
                                            }}
                                            value={value}
                                            onChange={(e) => {
                                                setValue(e.target.value)
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-green-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:scale-95 sm:ml-3 sm:w-auto"
                                    onClick={(e) => {
                                        handleSubmit(value)
                                    }}
                                >
                                    {textOk ?? "Ok"}
                                </button>
                                {handleContinue && (
                                    <button
                                        type="button"
                                        className="mt-3 ml-3 inline-flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm ring-1 ring-inset hover:scale-95 sm:mt-0 sm:w-auto"
                                        onClick={(e) => {
                                            handleContinue(value)
                                        }}
                                    >
                                        {textNo ?? "No"}
                                    </button>
                                )}
                                {handleClose && (
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:scale-95 sm:mt-0 sm:w-auto"
                                        onClick={(e) => {
                                            handleClose(value)
                                        }}
                                    >
                                        {textOk ?? "Cancel"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
