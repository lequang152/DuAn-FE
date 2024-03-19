'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { surveySelector } from '../../../redux/Selector/surveySelector';
import { userAuthSelector } from '../../../redux/Selector/userAuthorSelector';
import { getRandomOneExam } from '../../../utils/api_call';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../../utils/local_survey';
import { makeErrorToast } from '../../../utils/toast';
import Spinner from '../../Elements/Spinner/Spinner';
import CourseSidebar from './CourseSidebar';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

interface PropsSurvey {
    idSurveyDetails?: string;
}

const SurveyDetailMain = ({ idSurveyDetails }: PropsSurvey) => {
    const surveyRedux = useSelector(surveySelector);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const userInfo = useSelector(userAuthSelector);
    const [currentSurvey, setCurrentSurvey] = useState<any>();
    const pathname = usePathname();
    const router = useRouter();
    const [showTabPanel, setShowTabPanel] = useState(false);
    const tabRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showTabPanel && tabRef.current) {
            tabRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 100, behavior: 'smooth' });
        }
    }, [showTabPanel]);

    useEffect(() => {
        const local = LocalStorageService.getLocalStorageInstance(localStorage);
        const preInput = local.get([SURVEY_INPUT_KEY]);
        setMounted(true);
        setIsLoading(true);
        if (pathname === '/survey/survey-details/random') {
            if (!preInput || !preInput.answerToken) {
                getRandomOneExam()
                    .then((res) => {
                        if (res.data.data.length == 0) {
                            makeErrorToast('No content, back to home page.');
                            router.push('/');
                        } else {
                            setCurrentSurvey(() => {
                                local.set([], SURVEY_INPUT_KEY, res.data.data[0]);
                                return res.data.data[0];
                            });
                        }
                    })
                    .catch((err: any) => {
                        makeErrorToast('An error happened due to some problems, try again.');
                        router.push('/');
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
                return;
            }
        }
        setCurrentSurvey(() => {
            setIsLoading(false);
            return preInput;
        });
    }, []);

    return !isLoading && currentSurvey ? (
        <section className="course__area pt-20 md:pt-36 pb-24">
            {/* shape */}
            <div className="page__title-shape">
                <Image
                    width={55}
                    height={191}
                    className="page-title-shape-5 d-none d-sm-block"
                    src="/assets/img/page-title/page-title-shape-1.png"
                    alt="img not found"
                />
                <Image
                    width={56}
                    height={69}
                    className="page-title-shape-6"
                    src="/assets/img/page-title/page-title-shape-6.png"
                    alt="img not found"
                />
                <Image
                    width={47}
                    height={170}
                    className="page-title-shape-7"
                    src="/assets/img/page-title/page-title-shape-4.png"
                    alt="img not found"
                />
            </div>
            {/* container */}
            <div className="container">
                {/* directory */}
                <div className="row">
                    {/* left */}
                    <div className="col-xxl-8 col-xl-8 col-lg-8">
                        <div className="course__wrapper">
                            {/* title and direct */}
                            <div className="page__title-content mb-6">
                                <div className="page__title-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item home-link">
                                                <Link href="/">
                                                    <span>
                                                        <i className="fa fa-home"></i>
                                                    </span>
                                                    Home
                                                </Link>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                {currentSurvey.title?.en_US}
                                            </li>
                                        </ol>
                                    </nav>
                                </div>

                                <h5 className="page__title-3 md:pt-10 sm:pt-0">{currentSurvey.title?.en_US}</h5>
                            </div>
                            {/*  */}
                            <div className="course__meta-2 flex mb-8 gap-5 flex-row">
                                <div className="course__update mr-10 mb-30">
                                    <h5>Last Update:</h5>
                                    <p>
                                        {currentSurvey.updatedAt
                                            ? new Date(currentSurvey.updatedAt).toLocaleDateString()
                                            : new Date().toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="course__update mr-10 mb-30">
                                    <h5>Number of questions:</h5>
                                    <p>{currentSurvey.numberOfQuestions}</p>
                                </div>
                                <div className="course__rating-2 mb-30">
                                    <h5>User Attempts:</h5>
                                    <div className="course__rating-inner d-flex align-items-center">
                                        <p>{currentSurvey.userAttempts}</p>
                                    </div>
                                </div>
                            </div>
                            {/* img survey */}
                            <div className="course__img w-img mb-8">
                                <Image
                                    className="rounded"
                                    width={1024}
                                    height={576}
                                    src="/assets/img/carousel/quiz.png"
                                    alt="img not found"
                                />
                            </div>
                            {/* info */}
                            <Tabs>
                                <div className="course__tab-2 mb-45">
                                    <ul className="navs nav-tabss" id="courseTab" role="tablist">
                                        <TabList style={{ display: 'flex' }}>
                                            <Tab style={{ width: '100%' }}>
                                                <button
                                                    onClick={() => setShowTabPanel(!showTabPanel)}
                                                    className="nav-link"
                                                    type="button"
                                                    role="tab"
                                                >
                                                    <i className="fas fa-ribbon" ref={tabRef}></i>{' '}
                                                    <span>Description</span>{' '}
                                                </button>
                                            </Tab>
                                        </TabList>
                                        <TabPanel>
                                            {showTabPanel && (
                                                <div className="course__tab-content mb-95 shadow-lg p-4 mt-4">
                                                    <div className="tab-contents">
                                                        <div className="course__description">
                                                            <div className="font-bold text-2xl text-black">
                                                                {currentSurvey.title?.en_US}
                                                            </div>
                                                            <div
                                                                className="ml-4"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: currentSurvey.description?.en_US,
                                                                }}
                                                            />
                                                            <div className="font-semibold text-2xl text-black">
                                                                Good Luck!
                                                                <span>
                                                                    {' '}
                                                                    <SentimentSatisfiedAltIcon />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </TabPanel>
                                    </ul>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                    {/* right */}
                    <div className="col-xxl-4 col-xl-4 col-lg-4">
                        <CourseSidebar
                            currentSurvey={currentSurvey}
                            userInfo={userInfo}
                            idSurveyDetails={idSurveyDetails || currentSurvey.accessToken}
                        />
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <Spinner></Spinner>
    );
};

export default SurveyDetailMain;
