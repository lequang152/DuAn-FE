'use client';
import classNames from 'classnames';
import { Question } from '../../../constants/question.types';
import { LocalAnswerExam } from '../../../hook/useLocalAnswerExam';
import { SpecQuestionFactory } from './Factory/SpecQuestionFactory';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import QuestionSection from '../ListeningTest/QuestionSection';

import style from './style.module.css';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import GlobalVariable from '../../../utils/GlobalVariable';

type Props = {
    questions: Question[];
    state: LocalAnswerExam;
    isExpand: boolean;
    hasPanelLeft: boolean;
    disablePage: boolean;
};

function PannelRight({ questions, state, isExpand, hasPanelLeft, disablePage }: Props) {
    const GlobalVariableInstance = GlobalVariable.getInstance();
    const rightSectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (rightSectionRef.current) {
            rightSectionRef.current.scrollTop = 0;
        }
    }, [questions]);
    return (
        <div
            ref={rightSectionRef}
            className={classNames(
                {
                    'lg:w-1/2': !isExpand,
                    'lg:w-full': isExpand,
                },
                'fulltest__section-right p-4 flex-1 lg:w-full h-full overflow-auto relative',
                style['right-panel'],
            )}
        >
            {questions.length > 0 && (
                <QuestionSection
                    questions={questions}
                    state={state}
                    hasPanelLeft={hasPanelLeft}
                    disablePage={disablePage}
                />
            )}
        </div>
    );
}

export default React.memo(PannelRight);
