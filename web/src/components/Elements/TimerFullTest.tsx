import React, { useEffect, useState } from 'react';
import checkTimer from '../../utils/check_timer';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthSelector } from '../../redux/Selector/userAuthorSelector';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../utils/local_survey';
import { useParams, useRouter } from 'next/navigation';
import { handleSubmit } from '../../utils/api_call';
import GlobaleVariable from '../../utils/GlobalVariable';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/Slice/Auth/AuthSlice';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import GlobalVariable from '../../utils/GlobalVariable';
import { clearData, clearDataForAccessToken } from '../../utils/index_db';

interface Props {
    startTime: any;
    timeLimit: number;
}

const TimerFullTest: React.FC<Props> = ({ startTime, timeLimit }: Props) => {
    const time = checkTimer(new Date(startTime), timeLimit);

    const userInfo = useSelector(userAuthSelector);
    const userLocal = JSON.parse(localStorage.getItem('session') || '{}');
    const router = useRouter();
    const params = useParams();
    const [minutes, setMinutes] = useState(time.timeLeft.minute);
    const [seconds, setSeconds] = useState(time.timeLeft.second);
    const [isTimeout, setIsTimeout] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const GlobaleVariableInstance = GlobaleVariable.getInstance();
    const dispatch = useDispatch<AppDispatch>();
    const [popover, setPopover] = useState(false);

    const getLocalStorage = JSON.parse(localStorage.getItem('survey') || '{}');
    const accessToken = getLocalStorage.current_input?.accessToken;
    const answerToken = getLocalStorage.current_input?.answerToken;
    const getAnswersLocal = answerToken ? getLocalStorage[accessToken][answerToken]?.answers.answers : {};

    const GlobalVariableInstance = GlobalVariable.getInstance();

    const clearDataInIndexedDB = async (accessToken: string) => {
        try {
            // Call clearData to clear all data in IndexedDB
            await clearDataForAccessToken(accessToken);
        } catch (error) {
            console.error('Error clearing data from IndexedDB:', error);
        }
    };

    useEffect(() => {
        const onVisibilityChange = () => {
            if (!document.hidden) {
                const time = checkTimer(new Date(startTime), timeLimit);
                if (time.hasExpired) {
                    setMinutes(0);
                    setSeconds(0);
                } else {
                    setMinutes(time.timeLeft.minute);
                    setSeconds(time.timeLeft.second);
                }
            }
        };

        document.onvisibilitychange = onVisibilityChange;

        let myInterval = setInterval(() => {
            setSeconds((pre) => {
                if (pre > 0) {
                    return pre - 1;
                }

                setMinutes((preMin) => {
                    if (preMin == 0) {
                        setIsTimeout(true);
                        clearInterval(myInterval);
                        // auto submit here
                        const local = LocalStorageService.getLocalStorageInstance();
                        const input = local.get([SURVEY_INPUT_KEY]);

                        const accessToken = params.slug[0];
                        const answerToken = params.slug[1];
                        const answer = local.get([accessToken, answerToken, 'answers']);
                        handleSubmit({
                            state: answer,
                            userInfo,
                            userLocal,
                            onSubmitSuccess: () => {
                                GlobalVariableInstance.setIsSubmitted(true);
                                router.push(`/survey/full-test/${params}/review`);
                                localStorage.removeItem('answerOnTest');
                                local.remove([input.accessToken], input.answerToken);
                                input.answerToken = undefined;
                                local.set([], SURVEY_INPUT_KEY, input);
                                clearDataInIndexedDB(accessToken);
                            },
                            onSubmitDone() {
                                clearInterval(myInterval);
                            },
                            onBeginSubmit() {
                                GlobaleVariableInstance.setTimeDoTest(timeLimit * 60 * 1000);
                                GlobalVariableInstance.setAnswers(getAnswersLocal);
                            },
                            onError: () => {
                                router.push('/survey/survey-list');
                            },
                            signOut: () => {
                                dispatch(logOut());
                                router.push('/sign-in');
                                localStorage.removeItem('USER');
                                localStorage.removeItem('session');
                            },
                        });
                        return 0;
                    }
                    return preMin - 1;
                });
                return pre >= 0 ? 59 : 0;
            });
        }, 1000);
        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, []);

    return (
        <React.Fragment>
            {isTimeout ? (
                <p className="text-red-500 mb-0 font-bold">Time out</p>
            ) : (
                <div className="text-[#f78600]">
                    {' '}
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
            )}
        </React.Fragment>
    );
};

export default React.memo(TimerFullTest);
