import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import Select from "react-select"
import { makeErrorToast } from "../../../utils/toast"
import { ApiService } from "../../../utils/api_service"
interface pageProps {
    totalRecord: number
    currTotal: number
    selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    selectedOption: string
}

const InfoPagigationTab: React.FC<pageProps> = ({ currTotal, totalRecord, selectChange, selectedOption }) => {
    const [isLoading, setIsLoading] = useState(false)
    const ref = useRef<NodeJS.Timeout>()
    const [tags, setTags] = useState<{ value: string | number; label: string }[]>([])
    useEffect(() => {}, [])
    return (
        <div className="course__tab-inner grey-bg-2 mb-50">
            <div className="row align-items-center">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="course__tab-wrapper d-flex align-items-center">
                        <div className="course__view">
                            <h4>
                                Showing {currTotal} of {totalRecord}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="course__sort d-flex justify-content-sm-end">
                        <div className="">
                            <Select
                                options={tags}
                                isLoading={isLoading}
                                isMulti={true}
                                isSearchable={true}
                                placeholder={"Tags"}
                                className="tags"
                                onInputChange={(newValue, action) => {
                                    clearTimeout(ref.current)
                                    setIsLoading(true)
                                    ref.current = setTimeout(() => {
                                        const getInfoPagigation = ApiService.getInfoPagigationTab(newValue)
                                        getInfoPagigation
                                            .then((data) => {

                                                setTags(
                                                    data.data.map((ele: any) => {
                                                        return { label: ele.name.en_US, value: ele.id }
                                                    })
                                                )
                                            })
                                            .catch((err) => {
                                                makeErrorToast("Connection lost.")
                                            })
                                            .finally(() => {
                                                setIsLoading(false)
                                            })
                                    }, 500)
                                }}
                            />
                            {/* <select
                                className="appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-md shadow-sm text-sm leading-5 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                                value={selectedOption}
                                onChange={selectChange}
                            >
                                <option value="">Select an option</option>
                                <option value="4">Speaking</option>
                                <option value="6">Listening</option>
                                <option value="option2">Reading</option>
                                <option value="option3">Writing</option>
                            </select> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoPagigationTab
