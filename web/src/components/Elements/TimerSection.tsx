'use client';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import checkTimer from '../../utils/check_timer';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthSelector } from '../../redux/Selector/userAuthorSelector';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../utils/local_survey';
import { useParams, useRouter } from 'next/navigation';
import { handleSubmit } from '../../utils/api_call';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/Slice/Auth/AuthSlice';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import GlobalVariable from '../../utils/GlobalVariable';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

interface Props {
    startTime: any;
    deadline: any;
    setDisablePage: (value: any) => void;
    setChangeSection: (value: any) => void;
    modalOpen?: boolean;
}

const TimerSection: React.FC<Props> = ({ startTime, deadline, setDisablePage, setChangeSection, modalOpen }: Props) => {
    const timeLimitInMilliseconds = new Date(deadline.timeLimit).getTime() - new Date().getTime();
    const minutesLimit = Math.floor(timeLimitInMilliseconds / (1000 * 60));
    const secondsLimit = Math.floor((timeLimitInMilliseconds % (1000 * 60)) / 1000);
    const [minutes, setMinutes] = useState(!isNaN(minutesLimit) ? minutesLimit : 0);
    const [seconds, setSeconds] = useState(!isNaN(secondsLimit) ? secondsLimit : 0);

    const userInfo = useSelector(userAuthSelector);
    const userLocal = JSON.parse(localStorage.getItem('session') || '{}');
    const router = useRouter();
    const params = useParams();

    const [timeOutSection, setTimeOutSection] = useState<any>({});

    const GlobalVariableInstance = GlobalVariable.getInstance();
    const dispatch = useDispatch<AppDispatch>();
    const [popover, setPopover] = useState(false);

    const getLocalStorage = JSON.parse(localStorage.getItem('survey') || '{}');
    const accessToken = getLocalStorage.current_input?.accessToken;
    const answerToken = getLocalStorage.current_input?.answerToken;
    const getAnswersLocal = answerToken ? getLocalStorage[accessToken][answerToken]?.answers.answers : {};

    const intervalRef = useRef<number | null>(null);

    const onVisibilityChange = () => {
        if (!document.hidden) {
            const timeLeftSection = new Date(deadline.timeLimit).getTime() - new Date().getTime();
            const minutesLimitSection = Math.floor(timeLeftSection / (1000 * 60));
            const secondsLimitSection = Math.floor((timeLeftSection % (1000 * 60)) / 1000);
            if (timeLeftSection >= 0) {
                setMinutes(minutesLimitSection);
                setSeconds(secondsLimitSection);
            } else {
                setMinutes(0);
                setSeconds(0);
            }
        }
    };

    useEffect(() => {
        if (timeOutSection[deadline.page]) {
            setDisablePage(timeOutSection);
            setChangeSection(false);
        }
    }, [timeOutSection]);

    useLayoutEffect(() => {
        const timeLeftSection = new Date(deadline.timeLimit).getTime() - new Date().getTime();
        const minutesLimitSection = Math.floor(timeLeftSection / (1000 * 60));
        const secondsLimitSection = Math.floor((timeLeftSection % (1000 * 60)) / 1000);
        if (timeLeftSection >= 0) {
            setMinutes(minutesLimitSection);
            setSeconds(secondsLimitSection);
        } else {
            setTimeOutSection((prev: any) => ({
                ...prev,
                [deadline.page]: true,
            }));
        }

        const startInterval = () => {
            intervalRef.current = window.setInterval(() => {
                setSeconds((pre: any) => {
                    if (pre > 0) {
                        return pre - 1;
                    }
                    setMinutes((preMin: any) => {
                        if (preMin === 0) {
                            setTimeOutSection((prev: any) => ({
                                ...prev,
                                [deadline.page]: true,
                            }));
                            if (intervalRef.current !== null) {
                                clearInterval(intervalRef.current);
                            }
                            return 0;
                        }
                        return preMin - 1;
                    });
                    return pre >= 0 ? 59 : 0;
                });
            }, 1000);
        };

        document.addEventListener('visibilitychange', onVisibilityChange);

        startInterval();

        return () => {
            if (intervalRef.current !== undefined) {
                clearInterval(intervalRef.current!);
            }
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [deadline.page, deadline.timeLimit]);

    const autoSubmit = () => {
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
            },
            onSubmitDone() {
                if (intervalRef.current !== null) {
                    clearInterval(intervalRef.current);
                }
            },
            onBeginSubmit() {
                GlobalVariableInstance.setTimeDoTest(GlobalVariableInstance.getTimeLimit() * 60 * 1000);
                GlobalVariableInstance.setAnswers(getAnswersLocal);
            },
            onError: () => {
                router.push('/survey/survey-list');
            },
            signOut: () => {
                dispatch(logOut());
                router.push('/sign-in');
            },
        });
    };

    return (
        <React.Fragment>
            {timeOutSection[deadline.page] ? (
                <p className={`text-red-500 mb-0 font-bold text-nowrap ${modalOpen ? 'opacity-30' : ''}`}>Time out</p>
            ) : (
                // <Draggable {...dragHandlers}>
                //     <div className="box" style={{ position: 'absolute', bottom: '100px', right: '100px' }}>
                <Popover
                    containerStyle={{
                        zIndex: '99',
                    }}
                    isOpen={popover}
                    positions={'bottom'}
                    onClickOutside={() => setPopover(false)}
                    content={({ position, childRect, popoverRect }) => (
                        <ArrowContainer
                            position={position}
                            childRect={childRect}
                            popoverRect={popoverRect}
                            arrowColor={'#00ab6b'}
                            arrowSize={10}
                            className="popover-arrow-container"
                            arrowClassName="popover-arrow"
                        >
                            <div style={{ backgroundColor: '#00ab6b', color: 'white', padding: 4 }}>
                                Hurry up! Only one minute left!
                            </div>
                        </ArrowContainer>
                    )}
                >
                    <div className={`text-[#f78600] flex items-center align-middle ${modalOpen ? 'opacity-30' : ''}`}>
                        <FontAwesomeIcon icon={faHourglassHalf} beat style={{ fontSize: 18, marginRight: 8 }} />
                        <div>
                            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </div>
                    </div>
                </Popover>
                //     </div>
                // </Draggable>
            )}
        </React.Fragment>
    );
};

export default React.memo(TimerSection);
