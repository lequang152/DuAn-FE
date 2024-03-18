'use client';
import axios, { AxiosHeaders } from 'axios';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef, memo } from 'react';
import { SplitPane, SplitPaneProps, ResizerOptions, CollapseOptions, SplitPaneHooks } from 'react-collapse-pane';
import { useSelector } from 'react-redux';
import { SurveyQuestionType } from '../../../constants/QuestionType';
import { SurveyExceptionCode } from '../../../constants/exception';
import { Question } from '../../../constants/question.types';
import { AnswerState, useLocalAnswerExam } from '../../../hook/useLocalAnswerExam';
import { userAuthSelector } from '../../../redux/Selector/userAuthorSelector';
import { handleSubmit } from '../../../utils/api_call';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../../utils/local_survey';
import ErrorMain from '../../Elements/Error/ErrorMain';
import { ConfirmModal } from '../../Elements/Models/ConfirmModal';
import Spinner from '../../Elements/Spinner/Spinner';
import TextSelection from '../../Elements/TextSelection';
import FooterTest from '../../Layout/Footer/FooterOnTest';
import HeaderTest from '../../Layout/Header/HeaderOnTest';
import PannelLeft from './PannelLeft';
import PannelRight from './PannelRight';
import css from '@emotion/styled';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import GlobalVariable from '../../../utils/GlobalVariable';
import { ApiService } from '../../../utils/api_service';
import { useQueryState } from 'next-usequerystate';
import { Box } from '@mui/material';
import DirectOnPanel from './DirectOnPanel';
import TimerSection from '../../Elements/TimerSection';
import { clearDataForAccessToken } from '../../../utils/index_db';
import Draggable from 'react-draggable';
import styles from './style.module.css';

type ErrorState = {
    err: boolean;
    message: string | undefined;
};

export function asc(x: Question, y: Question): number {
    if (x.sequence > y.sequence) {
        return 1;
    }
    if (x.sequence < y.sequence) {
        return -1;
    }
    if (x.sequence == y.sequence) {
        if (x.questionId > y.questionId) return 1;
        if (x.questionId < y.questionId) return -1;
    }
    return 0;
}

const FullTest: React.FC<any> = ({ params }) => {
    const draggableRef = useRef(null);

    const belongTo = {
        accessToken: params.slug[0],
        answerToken: params.slug[1],
    };
    const [mounted, setMounted] = useState(false);
    const state = useLocalAnswerExam(belongTo, {
        ...belongTo,
        answers: {},
    });

    const [jsonSurvey, setJsonSurvey] = useState<any>(null);
    const [paginateData, setPaginateData] = useState<{
        hasNextPage: boolean;
        currentPage: number;
        totalRecord: number;
    }>(null!);
    const router = useRouter();

    const [pageNumber, setPageNumber] = useQueryState('page');
    const searchParams = useSearchParams();

    let initialPage: string = '1';
    if (searchParams.get('page')) {
        initialPage = String(searchParams.get('page'));
    }
    const [page, setPage] = useState(parseInt(initialPage));
    const [currentInput, setCurrentInput] = useState<any>(null!);
    const [specialQuestion, setSpecialQuestion] = useState<Question[]>([]);
    const [normalQuestion, setNormalQuestion] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    const [deadline, setDeadline] = useState<any>({});
    const [disablePage, setDisablePage] = useState<any>({});
    const [changeSection, setChangeSection] = useState(false);
    const [isLimitSectionTime, setIsLimitSectionTime] = useState(false);
    const [sectionTitle, setSectionTitle] = useState('');

    const [isError, setIsError] = useState<ErrorState>({
        err: false,
        message: undefined,
    });

    const [modalOpen, setModalOpen] = useState(false);

    const clearDataInIndexedDB = async (accessToken: string) => {
        try {
            // Call clearData to clear all data in IndexedDB
            await clearDataForAccessToken(accessToken);
        } catch (error) {
            console.error('Error clearing data from IndexedDB:', error);
        }
    };

    const [leftWindowWidth, setLeftWindowWidth] = useState(0);
    const leftSectionRef = useRef<HTMLDivElement | null>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setMounted(true);
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const local = LocalStorageService.getLocalStorageInstance();

        const header = {
            Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        };
        const getFullTestQuestions = ApiService.getFullTestQuestions(params.slug[0], params.slug[1], page, header);

        getFullTestQuestions
            .then((res: any) => {
                const deadlineTime = res.data.data.pages[0].page.deadline;
                const currentSectionId = res.data.data.pages[0].page.tagId;
                const nextSectionId = res.data?.nextSection?.tagId;

                setSectionTitle(res.data.data.pages[0].page.title.en_US.toUpperCase());
                setChangeSection(currentSectionId !== nextSectionId);
                setIsLimitSectionTime(res.data.data.pages[0].page.limitSectionTime > 0);

                setDeadline((prev: any) => ({
                    ...prev,
                    page: page,
                    timeLimit: deadlineTime,
                    isLimitSectionTime: res.data.data.pages[0].page.limitSectionTime > 0,
                }));

                GlobalVariable.getInstance().setScoringType(res.data?.scoringType);
                let data = res.data.data.pages;

                if (data.length == 0) {
                    setJsonSurvey(null);
                    setNormalQuestion([]);
                    setSpecialQuestion([]);
                    return;
                }
                data = data[0];
                const sepcQuest: Question[] = [];
                const norQuest: Question[] = [];

                for (let item of data.questions as Question[]) {
                    if (
                        [SurveyQuestionType.ONLY_TITLE, SurveyQuestionType.AUDIO].includes(
                            item.questionType as SurveyQuestionType,
                        ) &&
                        !item.isSubHeading
                    ) {
                        sepcQuest.push(item);
                    } else {
                        norQuest.push(item);
                    }
                }
                const input = local.get([SURVEY_INPUT_KEY]);

                setCurrentInput(input);
                setJsonSurvey(data || []);

                setNormalQuestion(norQuest.sort(asc) || []);
                setSpecialQuestion(sepcQuest.sort(asc) || []);
                setPaginateData({
                    currentPage: res.data.data.currentPage,
                    hasNextPage: res.data.data.hasNextPage,
                    totalRecord: res.data.data.totalRecord,
                });
                setPageNumber(page.toString());
            })
            .catch((err) => {
                console.log(err);
                setIsError(() => {
                    const scode = err.response?.data.scode;
                    if (scode == SurveyExceptionCode.TOKEN_EXPIRED || scode == SurveyExceptionCode.CLOSED) {
                        // make new Thread
                        setTimeout(() => {
                            const input = local.get([SURVEY_INPUT_KEY]);
                            if (input && input.accessToken && input.answerToken) {
                                // first : auto submit user's answer if it is present in local storage:
                                const userLocal = JSON.parse(localStorage.getItem('session') || '{}');

                                const userAnswer = local.get([input.accessToken, input.answerToken, 'answers']);

                                handleSubmit({
                                    state: userAnswer as AnswerState,
                                    userInfo,
                                    userLocal,
                                    onBeginSubmit: () => {
                                        setIsError({
                                            err: true,
                                            message: 'Auto submitting...',
                                        });
                                    },
                                    onSubmitDone: () => {
                                        //remove local data
                                        local.remove([input.accessToken], input.answerToken);
                                        input.answerToken = undefined;
                                        local.set([], SURVEY_INPUT_KEY, input);
                                    },
                                    onSubmitSuccess: () => {
                                        GlobalVariable.getInstance().setIsSubmitted(true);
                                        clearDataInIndexedDB(input.accessToken);
                                        router.push(`/survey/full-test/${params}/review`);
                                    },
                                    onError: () => {},
                                    signOut: () => {},
                                });
                            }
                        }, 500);
                    }
                    return {
                        err: true,
                        message: err.response?.data.message || undefined,
                    };
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const getLocalStorage = JSON.parse(localStorage.getItem('survey') || '{}');
        const currentInput = getLocalStorage.current_input;
        if (currentInput) {
            const initData = currentInput?.initialData;
            const objects: { [key: string]: any } = initData;
            let sortedObjectsArray = [];

            const sortedObjects = Object.entries(objects).sort((a, b) => a[1].sequence - b[1].sequence);
            sortedObjectsArray = sortedObjects.map(([key, value]) => ({ [key]: value }));
            GlobalVariable.getInstance().setPagesData(sortedObjectsArray);
        }
    }, []);

    const userInfo = useSelector(userAuthSelector);
    if (!params.slug || !params.slug[0] || !params.slug[1]) {
        return (
            <ConfirmModal
                header="Params not found!"
                message="This happends when you are mispassing some args to url."
                handleSubmit={() => {
                    return;
                }}
            />
        );
    }

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    return (
        <>
            {isLoading && <Spinner />}
            {isError.err ? (
                <ErrorMain message={isError.message} />
            ) : (
                jsonSurvey && (
                    <div className=" flex flex-col justify-between h-screen overflow-hidden">
                        <HeaderTest
                            params={params.slug[1]}
                            state={state}
                            hasNextPage={paginateData.hasNextPage}
                            currentPage={page}
                            timeLimit={{
                                isTimeLimit: currentInput.isTimeLimited,
                                timeLimit: currentInput.timeLimit,
                                startDateTime: currentInput.startDateTime,
                            }}
                            setModalOpen={setModalOpen}
                        />

                        {specialQuestion.length === 0 ? (
                            <div className="fulltest__section flex w-full h-4/6 flex-grow flex-col item justify-center relative">
                                {currentInput.isTimeLimited && deadline?.isLimitSectionTime && (
                                    <Draggable bounds="parent" nodeRef={draggableRef}>
                                        <div
                                            className={`absolute z-50 ${
                                                modalOpen ? styles['blur-bg'] : ''
                                            } top-14 left-10 bg-[#fff] p-1 text-2xl rounded`}
                                            ref={draggableRef}
                                            style={{ cursor: 'move' }}
                                        >
                                            <TimerSection
                                                startTime={currentInput.startDateTime}
                                                deadline={deadline}
                                                setDisablePage={setDisablePage}
                                                setChangeSection={setChangeSection}
                                            />
                                        </div>
                                    </Draggable>
                                )}

                                <div>
                                    <Box
                                        component="section"
                                        sx={{
                                            p: 1,
                                            display: 'flex',
                                            fontSize: 12,
                                            flexWrap: 'wrap',
                                            color: 'black',
                                            padding: '14px',
                                        }}
                                    >
                                        <DirectOnPanel page={page} setPage={setPage} />
                                    </Box>
                                </div>
                                <PannelRight
                                    questions={normalQuestion}
                                    state={state}
                                    isExpand={specialQuestion.length == 0}
                                    hasPanelLeft={false}
                                    disablePage={disablePage[page]}
                                />
                            </div>
                        ) : (
                            <div className="fulltest__section w-full h-4/6 flex-grow flex lg:flex-row md:flex-col flex-col item justify-center relative">
                                {currentInput.isTimeLimited && deadline?.isLimitSectionTime && (
                                    <Draggable bounds="parent" nodeRef={draggableRef}>
                                        <div
                                            className={`absolute z-50 ${
                                                modalOpen ? styles['blur-bg'] : ''
                                            } top-3 left-10 bg-[#f0f8ff] p-1 text-2xl rounded`}
                                            ref={draggableRef}
                                            style={{ cursor: 'move' }}
                                        >
                                            <TimerSection
                                                startTime={currentInput.startDateTime}
                                                deadline={deadline}
                                                setDisablePage={setDisablePage}
                                                setChangeSection={setChangeSection}
                                            />
                                        </div>
                                    </Draggable>
                                )}

                                <SplitPane
                                    split={windowWidth < 821 ? 'horizontal' : 'vertical'}
                                    // collapse={true}
                                    hooks={{
                                        onChange(sizes) {
                                            if (leftSectionRef.current) {
                                                if (sizes[0] === leftSectionRef.current.offsetWidth) {
                                                    setLeftWindowWidth(sizes[0]);
                                                } else setLeftWindowWidth(leftSectionRef.current.offsetWidth);
                                            }
                                        },
                                        onDragStarted: () => {
                                            if (leftSectionRef.current) {
                                                setLeftWindowWidth(leftSectionRef.current.offsetWidth);
                                            }
                                        },
                                    }}
                                >
                                    <PannelLeft
                                        page={page}
                                        setPage={setPage}
                                        questions={specialQuestion}
                                        accessToken={state.answers.accessToken}
                                        answerToken={state.answers.answerToken}
                                        title={''}
                                        // timeLimit={{
                                        //     isTimeLimit: currentInput.isTimeLimited,
                                        //     deadline: deadline,
                                        //     startDateTime: currentInput.startDateTime,
                                        // }}
                                        setDisablePage={setDisablePage}
                                        setChangeSection={setChangeSection}
                                        modalOpen={modalOpen}
                                        leftWindowWidth={leftWindowWidth}
                                        setLeftWindowWidth={setLeftWindowWidth}
                                        leftSectionRef={leftSectionRef}
                                        sectionTitle={sectionTitle}
                                        changeSection={changeSection}
                                    />
                                    <PannelRight
                                        questions={normalQuestion}
                                        state={state}
                                        isExpand={specialQuestion.length == 0}
                                        hasPanelLeft={true}
                                        disablePage={disablePage[page]}
                                    />
                                </SplitPane>
                            </div>
                        )}

                        {/* </SplitPane> */}
                        <FooterTest
                            state={state}
                            hasNextPage={paginateData.hasNextPage}
                            currentPage={paginateData.currentPage}
                            setPage={setPage}
                            param={params.slug}
                            changeSection={changeSection}
                            isLimitSectionTime={isLimitSectionTime}
                        />
                    </div>
                )
            )}
        </>
    );
};

export default memo(FullTest);
