'use client';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios, { AxiosHeaders } from 'axios';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthSelector } from '../../../redux/Selector/userAuthorSelector';
import { fetchSurveyData } from '../../../redux/Slice/Surveys/SurveySlice';
import { AppDispatch } from '../../../redux/store';
import { makeErrorToast } from '../../../utils/toast';
import ShapeBackground from '../../Elements/ShapeBackground';
import Spinner from '../../Elements/Spinner/Spinner';
import InfoPagigationTab from '../../Elements/Tabs/InfoPagigationTab';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../../utils/local_survey';
import { ConfirmModal } from '../../Elements/Models/ConfirmModal';
import { current } from '@reduxjs/toolkit';
import { Pagination } from '../../Elements/Pagination';
import { ApiService } from '../../../utils/api_service';
const SurveyListMain: React.FC = () => {
    const route = useRouter();
    const [survey, setSurvey] = useState<any>(null!);
    const [page, setPage] = useState(1);

    const [selectedOption, setSelectedOption] = useState<string>('');
    // const [selectedSurvey, setSelectedSurvey] = useState<any>()
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector(userAuthSelector);

    const [isSelecting, setIsSelecting] = useState(false);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value); // Update the selected option in state
    };

    const router = useRouter();

    const [isNotSameInput, setIsNotSame] = useState({
        bool: false,
        input: undefined,
    } as {
        bool: boolean;
        input?: any;
    });

    const handleClick = async (item: any) => {
        const local = LocalStorageService.getLocalStorageInstance();
        setIsNotSame({
            bool: false,
            input: item,
        });
        try {
            const preInput = local.get([SURVEY_INPUT_KEY]);
            //  href={`/survey/survey-details/${item?.accessToken}`}

            if (preInput && preInput.accessToken != item.accessToken && preInput.answerToken) {
                setIsNotSame({
                    bool: true,
                    input: item,
                });
            } else {
                if (!preInput || !preInput.answerToken) {
                    local.set([], SURVEY_INPUT_KEY, item);
                }
                setIsSelecting(true);
                await dispatch(fetchSurveyData(item));
                route.push(`/survey/survey-details/${item.accessToken}`);
            }
        } catch (err: any) {
            makeErrorToast(err.message);
        } finally {
            setIsSelecting(false);
        }
    };
    useEffect(() => {
        const header = {
            Authorization: `Bearer ${userInfo.token}`,
        };

        const getSurveyList = ApiService.getSurveyList(page, header);
        getSurveyList
            .then(async (response) => {
                setSurvey(response.data);
            })
            .catch((error) => {
                try {
                    if (error.response.data.statusCode == 403) {
                        makeErrorToast('You are not allowed to access this page.');
                    } else {
                        makeErrorToast('An error has occurred, please contact the administrator for more information.');
                    }
                } catch (err) {
                    makeErrorToast('An error has occurred, please contact the administrator for more information.');
                }
                route.push('/');
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <>
            {isNotSameInput.bool && (
                <ConfirmModal
                    message="You have an inprogress exam, do you want to select it instead?"
                    header="Attention!"
                    textNo="No, clear and continue"
                    handleSubmit={() => {
                        const local = LocalStorageService.getLocalStorageInstance();
                        route.push(`/survey/survey-details/${local.get([SURVEY_INPUT_KEY]).accessToken}`);
                        setIsNotSame({
                            bool: false,
                        });
                    }}
                    handleClose={() => {
                        setIsNotSame({
                            bool: false,
                        });
                    }}
                    handleContinue={() => {
                        const local = LocalStorageService.getLocalStorageInstance();
                        local.set([], SURVEY_INPUT_KEY, isNotSameInput.input);
                        route.push(`/survey/survey-details/${isNotSameInput.input.accessToken}`);
                        setIsNotSame({
                            bool: false,
                        });
                    }}
                />
            )}
            {isSelecting || survey == undefined ? (
                <Spinner />
            ) : (
                <section className="course__area pt-36 pb-24">
                    <div className="container">
                        <div className="page__title-breadcrumb">
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="/">
                                            <span>
                                                <i className="fa fa-home"></i>
                                            </span>
                                            Home
                                        </Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">
                                        Exams List
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <InfoPagigationTab
                            currTotal={survey.data.length}
                            totalRecord={survey.totalRecord}
                            selectChange={handleSelectChange}
                            selectedOption={selectedOption}
                        />
                        {
                            <div className="row">
                                {survey && survey.data && survey.data.length > 0 ? (
                                    survey.data.map((item: any, index: any) => {
                                        const htmlDescription = item.description?.en_US;
                                        let truncatedHtml = htmlDescription;
                                        const maxLength = 50;
                                        if (htmlDescription) {
                                            if (htmlDescription.length > maxLength) {
                                                truncatedHtml = htmlDescription.substring(0, maxLength) + '...';
                                            }
                                        }
                                        return (
                                            <div className="col-xxl-12 mb-7" key={index}>
                                                <div className="course__tab-conent">
                                                    <div className="course__item white-bg mb-30 fix">
                                                        <div className="row gx-0 h-fit">
                                                            <div className="col-xxl-12 col-xl-12 col-lg-12">
                                                                <div className="course__right">
                                                                    <div className="course__content course__content-3 ">
                                                                        <div className="course__meta d-flex align-items-center">
                                                                            <div className="course__lesson mr-20 flex flex-row justify-center gap-2 items-center">
                                                                                <MenuBookIcon className="text-green-1" />
                                                                                <span className="flex flex-row  justify-center">
                                                                                    {' '}
                                                                                    {item.numberOfQuestions} questions
                                                                                </span>
                                                                            </div>
                                                                            <div className="course__rating flex flex-row  justify-center gap-2 items-center">
                                                                                <AccessAlarmIcon className="text-yellow-1" />
                                                                                <span className="flex flex-row  justify-center">
                                                                                    {item.isTimeLimited
                                                                                        ? item.timeLimit + ' minutes'
                                                                                        : 'No limit'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <h3
                                                                            className="course__title course__title-3 pt-5 link-btn"
                                                                            onClick={() => handleClick(item)}
                                                                        >
                                                                            <div>{item.title?.en_US}</div>
                                                                        </h3>
                                                                        <div
                                                                            className="course__summary pb-[70px]"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: truncatedHtml,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <div className="course__more course__more-2 flex flex-row justify-between items-center">
                                                                        <div className="course__detail-tag">
                                                                            <div className="course__tag-2 flex flex-row items-center text-black">
                                                                                <i className="fas fa-tags"></i>
                                                                                {item.tags.map(
                                                                                    (tag: any, index: any) => (
                                                                                        <span
                                                                                            key={index}
                                                                                            className={classNames(
                                                                                                {
                                                                                                    'bg-red-600':
                                                                                                        tag.color === 1,
                                                                                                    'bg-amber-600':
                                                                                                        tag.color === 5,
                                                                                                },
                                                                                                'px-3 py-1 mx-1 rounded-full text-black',
                                                                                            )}
                                                                                        >
                                                                                            {tag.name.en_US}
                                                                                        </span>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className="course__btn py-1">
                                                                            <div
                                                                                className="link-btn"
                                                                                onClick={() => handleClick(item)}
                                                                            >
                                                                                Select Test
                                                                                <i className="fas fa-arrow-right"></i>
                                                                                <i className="fas fa-arrow-right"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center">No data available</div>
                                )}
                            </div>
                        }

                        <Pagination
                            currentPage={survey.currentPage}
                            hasNextPage={survey.hasNextPage}
                            setPage={setPage}
                            totalPage={survey.totalRecord}
                        />
                    </div>
                    <ShapeBackground />
                </section>
            )}
        </>
    );
};

export default SurveyListMain;
