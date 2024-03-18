'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../Layout/Header/Header';
import GlobalVariable from '../../../utils/GlobalVariable';
import CloseIcon from '@mui/icons-material/Close';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Confetti from 'react-confetti';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../../utils/local_survey';
import './style.module.css';

interface Params {
    slug: string;
}

function ReviewAnswer({ params }: { params: Params }) {
    const router = useRouter();
    const GlobalVariableInstance = GlobalVariable.getInstance();
    const correctAns = GlobalVariableInstance.getReviewAnswerData().correct;
    const totalAns = GlobalVariableInstance.getReviewAnswerData().total;
    const timeDoTheTest = GlobalVariableInstance.getTimeDoTest();
    const isTimeLimited = GlobalVariableInstance.getIsTimeLimited();

    const timeDoTestInSecond = Math.floor(timeDoTheTest / 1000);
    const minutes = Math.floor(timeDoTestInSecond / 60);
    const seconds = timeDoTestInSecond % 60;

    const gifFiles = [
        '/assets/img/gif/gift.gif',
        '/assets/img/gif/gift-1.gif',
        '/assets/img/gif/gift-2.gif',
        '/assets/img/gif/gift-3.gif',
    ];

    const randomIndex = Math.floor(Math.random() * gifFiles.length);
    const gifFile = gifFiles[randomIndex];

    useEffect(() => {
        // check submit state
        const isSubmitted = GlobalVariableInstance.getIsSubmitted();

        if (!isSubmitted) {
            router.push('/');
        }
    }, []);

    if (GlobalVariableInstance.getIsSubmitted()) {
        if (GlobalVariableInstance.getScoringType() === 'scoring_with_answers') {
            return (
                <div className="container mt-10">
                    <div className="text-center text-4xl font-bold text-cyan-800 mb-5">Percentage</div>
                    <div className="flex flex-col gap-3 items-center screenReview:flex-row screenReview:justify-around mb-6">
                        <div className="border-2 w-28 h-28 font-semibold flex flex-col items-center justify-center rounded-full">
                            <div>Correct</div>
                            <div>Answers</div>
                            <div className="text-cyan-900 font-bold">{`${correctAns}/${totalAns}`}</div>
                        </div>
                        <div
                            className="text-green-700 bg-green-100 font-bold text-2xl border-8 
                border-green-600 w-36 h-36 flex flex-col items-center justify-center rounded-full"
                        >
                            {Number(GlobalVariableInstance.getReviewAnswerData().percentage.toFixed(2))}
                        </div>
                        <div className="border-4 w-32 h-32 flex flex-col items-center justify-center rounded-full">
                            <AccessAlarmsIcon sx={{ color: 'green' }} />
                            <div className="font-semibold">Time Spent</div>
                            {isTimeLimited ? (
                                <div className="text-cyan-900 font-bold">{`${minutes > 0 ? minutes : 0} : ${
                                    seconds > 0 ? seconds : 0
                                }`}</div>
                            ) : (
                                <div className="text-cyan-900 font-bold">No limit</div>
                            )}
                            {isTimeLimited ? <div>{`(${GlobalVariableInstance.getTimeLimit()}:00)`}</div> : <></>}
                        </div>
                    </div>
                    <h3 className="font-bold text-2xl text-center mb-8 text-cyan-800">Answer Keys</h3>
                    <div className="">
                        {GlobalVariableInstance.getPagesData().map((data, index) => {
                            const dataSection = data[Object.keys(data)[0]];
                            let textContent;
                            const htmlString = dataSection.title?.en_US;
                            if (htmlString) {
                                const parser = new DOMParser();
                                const document = parser.parseFromString(htmlString, 'text/html');
                                const pTextContent = document.querySelector('p')?.textContent;
                                if (!pTextContent) {
                                    const h3TextContent = document.querySelector('h3')?.textContent;
                                    textContent = h3TextContent?.toUpperCase();
                                } else textContent = pTextContent?.toUpperCase();
                                if (!textContent) {
                                    textContent = htmlString.toUpperCase();
                                }
                            }
                            const questions: any[] = [];
                            const keys = Object.keys(dataSection?.questions);
                            for (let i = 0; i < keys.length; i++) {
                                questions.push({ [keys[i]]: dataSection?.questions[keys[i]] });
                            }
                            questions.sort((a, b) => {
                                const keysA = Object.keys(a);
                                const keysB = Object.keys(b);
                                return a[keysA[0]].label - b[keysB[0]].label;
                            });

                            return (
                                <div key={index} className="mb-16">
                                    <div className="text-cyan-800 font-semibold mb-3">{textContent}</div>
                                    <ul className="grid sm:max-lg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {questions.map((question, index) => {
                                            const id = Object.keys(question)[0];
                                            return (
                                                <li
                                                    className="flex items-center px-3 py-2 flex-wrap border rounded "
                                                    key={index}
                                                >
                                                    <span
                                                        className={`font-bold rounded-full bg-green-600 text-white h-7
                                  flex items-center justify-center
                                  ${question[id]?.label.length > 2 ? 'w-[60px]' : 'w-7'}`}
                                                    >
                                                        {question[id]?.label}
                                                    </span>
                                                    <div className="flex items-center ml-2">
                                                        <span className="mr-2">
                                                            {GlobalVariableInstance.getReviewAnswerData()?.detail[id]
                                                                ?.userAnswer === undefined
                                                                ? ''
                                                                : GlobalVariableInstance.getReviewAnswerData().detail[
                                                                      id
                                                                  ]?.userAnswer.map((item: string, index: number) => (
                                                                      <React.Fragment key={index}>
                                                                          {index > 0 && <span> - </span>}
                                                                          <span>{item}</span>
                                                                      </React.Fragment>
                                                                  ))}
                                                        </span>
                                                        {GlobalVariableInstance.getReviewAnswerData().detail[id]
                                                            ?.correct ? (
                                                            <DoneIcon sx={{ color: 'green' }} />
                                                        ) : (
                                                            <CloseIcon sx={{ color: 'red' }} />
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-8 flex items-center justify-center">
                        <Button
                            style={{
                                backgroundColor: 'green',
                                color: 'white',
                                fontWeight: 800,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}
                            onClick={() => {
                                router.push('/');
                            }}
                        >
                            Home Page
                        </Button>
                    </div>
                    <div className="h-[30px] bg-transparent"></div>
                </div>
            );
        } else {
            return (
                <div className="container mt-10 flex-col">
                    <div className="text-4xl sm:text-6xl max-[360px]:text-2xl max-[235px]:text-base font-bold text-green-700 flex justify-center">
                        CONGRATULATION!
                    </div>
                    <div className="mt-10 flex justify-center">
                        {/* <CheckCircleIcon sx={{
              color: 'green',
              fontSize: 180,
            }} /> */}
                        <img className="max-h-80" src={gifFile}></img>
                    </div>
                    <div className="flex text-center justify-center font-bold text-2xl text-green-600 mt-5 mb-48">
                        Your Answers Were Submitted Successfully
                    </div>
                    <div className="mt-8 flex items-center justify-center">
                        <Button
                            style={{
                                backgroundColor: 'green',
                                color: 'white',
                                fontWeight: 800,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}
                            onClick={() => {
                                router.push('/');
                            }}
                        >
                            Home Page
                        </Button>
                    </div>
                    <div className="h-[30px] bg-transparent"></div>
                    <Confetti />
                </div>
            );
        }
    }

    return null;
}

export default ReviewAnswer;
