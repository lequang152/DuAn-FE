'use client';
import { Question } from '../../../constants/question.types';
import { LocalAnswerExam } from '../../../hook/useLocalAnswerExam';
import { SpecQuestionFactory } from './Factory/SpecQuestionFactory';
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import GlobalVariable from '../../../utils/GlobalVariable';
import Box from '@mui/system/Box';
import Modal from '@mui/material/Modal';
import DirectOnPanel from './DirectOnPanel';
import { text } from 'stream/consumers';
import TimerSection from '../../Elements/TimerSection';
import style from './style.module.css';

type Props = {
    questions: Question[];
    answerToken: string;
    accessToken: string;
    title: string;
    setPage: (page: number) => void;
    page: number;
    setDisablePage: (value: any) => void;
    setChangeSection: (value: any) => void;
    modalOpen?: boolean;
    leftWindowWidth: number;
    setLeftWindowWidth: (value: any) => void;
    leftSectionRef: React.MutableRefObject<HTMLDivElement | null>;
    sectionTitle: string;
    changeSection: boolean;
};

function PannelLeft({
    questions,
    answerToken,
    accessToken,
    setPage,
    page,
    modalOpen,
    leftWindowWidth,
    setLeftWindowWidth,
    leftSectionRef,
}: Props) {
    const [width, setWidth] = useState(leftWindowWidth - 45);

    useEffect(() => {
        if (leftSectionRef.current) {
            leftSectionRef.current.scrollTop = 0;
        }
    }, [questions]);

    useLayoutEffect(() => {
        if (leftSectionRef.current) {
            setLeftWindowWidth(leftSectionRef.current.offsetWidth);
        }
    }, [leftSectionRef.current?.offsetWidth]);

    useLayoutEffect(() => {
        setWidth(leftWindowWidth - 45);
    }, [leftWindowWidth]);

    return (
        questions!.length > 0 && (
            <div
                ref={leftSectionRef}
                className="fulltest__section-left lg:w-full overflow-auto p-10 bg-[#f0f8ff] flex flex-col h-full flex-1 relative"
            >
                {/* {timeLimit?.isTimeLimit && timeLimit?.deadline?.isLimitSectionTime && (
                    <div
                        id="time"
                        className={`text-2xl ${style['timerSection']} ${modalOpen ? style['blur'] : ''}`}
                        style={{ width: `${width}px` }}
                    >
                        <TimerSection
                            startTime={timeLimit.startDateTime}
                            deadline={timeLimit.deadline}
                            setDisablePage={setDisablePage}
                            setChangeSection={setChangeSection}
                            modalOpen={modalOpen}
                        />
                    </div>
                )} */}
                <Box
                    component="section"
                    sx={{
                        display: 'flex',
                        fontSize: 12,
                        flexWrap: 'wrap',
                        color: 'black',
                        marginTop: '10px',
                    }}
                >
                    <DirectOnPanel page={page} setPage={setPage} />
                </Box>

                <div className="flex justify-center flex-col w-full flex-1 items-center">
                    <h3
                        className="left-title mb-3"
                        // dangerouslySetInnerHTML={{ __html: title }}
                    ></h3>

                    {questions!.map((question, index) => (
                        <div key={index} className="">
                            {SpecQuestionFactory(question, accessToken, answerToken)}
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}

export default React.memo(PannelLeft);
