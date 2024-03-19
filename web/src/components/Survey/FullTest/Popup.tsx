import { useEffect, useState } from 'react';
import CourseSidebar from '../SurveyDetail/CourseSidebar';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthSelector } from '../../../redux/Selector/userAuthorSelector';
import GlobalVariable from '../../../utils/GlobalVariable';
import CampaignIcon from '@mui/icons-material/Campaign';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '../../../redux/store';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../../utils/local_survey';
import { makeErrorToast } from '../../../utils/toast';
import { logOut, refreshUnexpriredToken } from '../../../redux/Slice/Auth/AuthSlice';
import { startExam } from '../../../utils/api_call';
import Spinner from '../../Elements/Spinner/Spinner';
import { ConfirmModal } from '../../Elements/Models/ConfirmModal';
import { Button } from '@mui/material';

interface PropsSurvey {
    idSurveyDetails?: string;
}

function Popup({ idSurveyDetails }: PropsSurvey) {
    const userInfo = useSelector(userAuthSelector);
    const router = useRouter();
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const GlobalVariableInstance = GlobalVariable.getInstance();
    const dispatch = useDispatch<AppDispatch>();
    const [inputFromLocal, setInputFromLocal] = useState<any>({});

    useEffect(() => {
        const local = LocalStorageService.getLocalStorageInstance();
        setInputFromLocal(local.get([SURVEY_INPUT_KEY]));
    }, []);

    const startExamSuccess = (res: any, accessToken: string, answerToken?: string, examCode?: string) => {
        const data = res.data;
        const _answerToken = data.answerToken;

        let userAnswers: any = {};

        if (!data.userAnswerData || data.userAnswerData.answers === undefined) {
            const keys = Object.keys(data.initialData);
            for (let i = 0; i < keys.length; i++) {
                if (data.initialData[keys[i]]) {
                    userAnswers = {
                        ...userAnswers,
                        ...data.initialData[keys[i]].questions,
                    };
                }
            }
        } else userAnswers = data.userAnswerData.answers;

        const local = LocalStorageService.getLocalStorageInstance();
        const newState = {
            accessToken: accessToken,
            answerToken: _answerToken,
            answers: data.questions,
        };
        local.set([accessToken, data.answerToken], 'answers', newState);
        data.questions = undefined;
        const localData = local.get([SURVEY_INPUT_KEY]);
        local.set([], SURVEY_INPUT_KEY, {
            ...localData,
            ...res.data,
            userAnswerData: undefined,
            examCode: examCode,
        });

        if (data && data.userAnswerData) {
            local.set([accessToken], data.answerToken, {
                answers: {
                    accessToken: accessToken,
                    answerToken: data.answerToken,
                    answers: userAnswers,
                },
                audio: data.userAnswerData.audio,
            });
        } else if (!data.userAnswerData) {
            local.set([accessToken], data.answerToken, {
                answers: {
                    accessToken: accessToken,
                    answerToken: data.answerToken,
                    answers: userAnswers,
                },
                audio: {},
            });
        }

        router.push(`/survey/full-test/${data?.accessToken}/${data?.answerToken}`);
    };

    const handleStartTest = (accessToken: string, answerToken?: string, examCode?: string) => {
        if (accessToken && isLoading == false) {
            setIsLoading(true);

            startExam(accessToken, answerToken, examCode)
                .then((res) => {
                    startExamSuccess(res, accessToken, answerToken, examCode);
                })
                .catch((err: any) => {
                    if (err.response?.status === 401 || err.response?.status === 403) {
                        dispatch(refreshUnexpriredToken()).then(async (originalPromiseResult: any) => {
                            if (originalPromiseResult.type === 'auth/refreshToken/fulfilled') {
                                localStorage.getItem('TOKEN');
                                startExam(accessToken, answerToken, examCode)
                                    .then((res) => {
                                        startExamSuccess(res, accessToken, answerToken, examCode);
                                    })
                                    .catch((err: any) => {
                                        localStorage.clear();
                                        dispatch(logOut());
                                        makeErrorToast(
                                            (err.response && err.response.data.message) || 'Error, please login again!',
                                        );
                                        router.push('/sign-in');
                                    })
                                    .finally(() => {
                                        setIsLoading(false);
                                        setIsShow(false);
                                    });
                                return;
                            }
                            if (originalPromiseResult.type === 'auth/refreshToken/rejected') {
                                makeErrorToast(
                                    (err.response && err.response.data.message) || 'Error, please login again!',
                                );
                                localStorage.clear();
                                dispatch(logOut());

                                router.push('/sign-in');
                                return;
                            }
                        });
                    } else {
                        const local = LocalStorageService.getLocalStorageInstance();
                        const localData = local.get([SURVEY_INPUT_KEY]);
                        const newData = {
                            ...localData,
                            answerToken: undefined,
                        };
                        local.set([], SURVEY_INPUT_KEY, newData);
                        setInputFromLocal(newData);
                        makeErrorToast((err.response && err.response.data.message) || 'Error, please try again!');
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsShow(false);
                });
        }
    };

    const closeModal = () => {
        setIsShow(false);
    };
    const handleCreateInputExam = async () => {
        if (!isLoading) {
            setIsShow(true);
        }
    };

    return (
        <section className={styles.popup}>
            {isLoading && <Spinner />}
            {isShow && (
                <ConfirmModal
                    header="Warning"
                    message={`${inputFromLocal.answerToken ? 'Continue this test?' : 'Are you ready for the Test ?'}`}
                    handleSubmit={(code) => {
                        handleStartTest(
                            inputFromLocal.accessToken,
                            inputFromLocal.answerToken,
                            code || inputFromLocal.examCode,
                        );
                        GlobalVariableInstance.removeQuestionID();
                        GlobalVariableInstance.removeTotalQuestions();
                        GlobalVariableInstance.removeAnswers();
                        GlobalVariableInstance.removePageData();
                        GlobalVariableInstance.setIsPlaying(false);
                    }}
                    handleClose={() => closeModal()}
                    useInputBox={inputFromLocal.answerToken ? false : true}
                    inputBoxLabel="Exam code (optional)"
                />
            )}
            <Image
                width={55}
                height={191}
                className="md:block absolute left-0 top-2/3 hidden"
                src="/assets/img/page-title/page-title-shape-1.png"
                alt="img not found"
            />
            <Image
                width={47}
                height={170}
                className="md:block absolute right-0 top-1/3 hidden"
                src="/assets/img/page-title/page-title-shape-4.png"
                alt="img not found"
            />

            <div className="container d-flex justify-content-center align-items-center  ">
                <div>
                    <div>
                        <div className="text-center text-4xl text-black font-bold">
                            Chào mừng bạn đến với bài kiểm tra của
                        </div>
                        <div className="text-center text-4xl text-[#2196f3] font-bold mb-4">ENGMASTER HUB</div>
                    </div>
                    <div className="text-black font-semibold text-xl mb-3">
                        Để giúp bạn hoàn thành bài kiểm tra tốt nhất, bạn hãy đọc những lưu ý sau:
                    </div>
                    <ol className="text-black text-justify">
                        <li className="mb-2 text-lg">
                            1.Trước khi bắt đầu, bạn nên chuyển ngôn ngữ về Tiếng Anh để nhập đáp án dễ dàng và chính
                            xác nhất nhé.
                        </li>
                        <li className="mb-2 text-lg">
                            2.Thời gian làm bài cho từng phần sẽ được hiển thị đếm ngược ở góc phía trên và sẽ tự động
                            chuyển sang phần tiếp theo khi đã hết giờ. Vì vậy bạn chú ý hoàn thành các phần trước khi
                            hết giờ nhé.
                        </li>
                        <li className="mb-2 text-lg">
                            3.Mỗi đề bài nghe sẽ có quy định về số lần nghe, và audio chỉ chạy đúng số lần quy định rồi
                            dừng hẳn. Vì vậy, bạn nên chú ý khi sẵn sàng rồi thì mới bấm chạy audio nhé.
                        </li>
                        <li className="mb-2 text-lg">
                            4.Bạn có thể sử dụng tính năng highlight<span> (đánh dấu)</span> để làm bài Đọc dễ dàng hơn.
                        </li>
                        <li className="mb-2 text-lg">
                            5.Có một ô trống <span>(góc dưới bên phải màn hình)</span> để các bạn có thể nháp đáp án nếu
                            muốn.
                        </li>
                    </ol>
                    <div className={styles.buttonStart}>
                        <button className="btn btn-outline-primary" color="error" onClick={handleCreateInputExam}>
                            Click Here To Start!
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Popup;
