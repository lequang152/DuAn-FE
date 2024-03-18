import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { AuthenticationUserState } from "../../../constants/AuthenticationState"
import checkTimer from "../../../utils/check_timer"
import { makeErrorToast } from "../../../utils/toast"
import { ConfirmModal } from "../../Elements/Models/ConfirmModal"
import { api, startExam } from "../../../utils/api_call"
import { LocalStorageService, SURVEY_INPUT_KEY } from "../../../utils/local_survey"
import Spinner from "../../Elements/Spinner/Spinner"
import GlobalVariable from "../../../utils/GlobalVariable"
import { SurveyExceptionCode } from "../../../constants/exception"
import { AppDispatch } from "../../../redux/store"
import { ApiService } from "../../../utils/api_service"
import { useDispatch } from "react-redux";
import { logOut, refreshUnexpriredToken } from "../../../redux/Slice/Auth/AuthSlice"
import clearLocal from "../../Layout/Header/BurgerMenus"


interface pageProps {
    currentSurvey: any;
    userInfo: AuthenticationUserState;
    idSurveyDetails?: string;
}

const CourseSidebar: React.FC<pageProps> = ({ currentSurvey, userInfo, idSurveyDetails }) => {
    const router = useRouter();
    const [inputFromLocal, setInputFromLocal] = useState<any>({});

    useEffect(() => {
        const local = LocalStorageService.getLocalStorageInstance();
        setInputFromLocal(local.get([SURVEY_INPUT_KEY]));
    }, []);

    return (
        <>
            <div className="course__sidebar pl-70 p-relative">
                <div className="course__shape">
                    <Image
                        width={70}
                        height={110}
                        className="course-dot"
                        src="/assets/img/course/course-dot.png"
                        alt="img not found"
                    />
                </div>
                <div className="course__sidebar-widget-2 white-bg mb-20">
                    <div className="course__video">
                        <div className="course__video-content mb-9">
                            <ul>
                                {currentSurvey.timeLimit && (
                                    <li className="d-flex align-items-center">
                                        <div className="course__video-icon">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                        <div className="course__video-info">
                                            <h5>
                                                <span>Duration:</span>
                                                {currentSurvey.isTimeLimited
                                                    ? currentSurvey.timeLimit + ' minutes'
                                                    : 'No limit'}
                                            </h5>
                                        </div>
                                    </li>
                                )}

                                <li className="d-flex align-items-center">
                                    <div className="course__video-icon">
                                        <i className="fas fa-globe"></i>
                                    </div>
                                    <div className="course__video-info">
                                        <h5>
                                            <span>Language:</span>English
                                        </h5>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="course__enroll-btn">
                            <div
                                className="e-btn e-btn-7 w-100 cursor-pointer transition"
                                onClick={() => {
                                    router.push(`/survey/survey-details/${idSurveyDetails || currentSurvey.accessToken}/start`)
                                }}
                            >
                                {inputFromLocal.answerToken ? 'Continue' : 'Start Exam'}
                                <i className="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseSidebar;
