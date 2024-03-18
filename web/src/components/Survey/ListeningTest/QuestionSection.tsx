'use client';
import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { QuestionsProps } from '../../../constants/props';
import { NormQuestionFactory } from '../FullTest/Factory/NormQuestionFactory';
import { LocalAnswerExam } from '../../../hook/useLocalAnswerExam';
import IndexNumberQuestion from '../QuestionComponents/utils/IndexNumberQuestion';
import { Question } from '../../../constants/question.types';
import { SurveyQuestionType } from '../../../constants/QuestionType';
import InboxQuestion from '../QuestionComponents/InboxQuestion/InboxQuestion';
import GlobalVariable from '../../../utils/GlobalVariable';

interface IQuestionSection {
    questions: Question[];
    state: LocalAnswerExam;
    hasPanelLeft: boolean;
    disablePage: boolean;
}

const QuestionSection = ({ questions, state, hasPanelLeft, disablePage }: IQuestionSection) => {
    // fillter:

    const [questionsState, setQuestionsState] = useState<Question[]>([]);
    const GlobalVariableInstance = GlobalVariable.getInstance();
    const inputRef = useRef<(HTMLLIElement | null)[]>([]);
    const getLocalStorage = JSON.parse(localStorage.getItem('survey') || '{}');
    const accessToken = getLocalStorage?.current_input?.accessToken;
    const answerToken = getLocalStorage?.current_input?.answerToken;
    const getAnswersLocal = answerToken ? getLocalStorage[accessToken][answerToken]?.answers.answers : {};

    useEffect(() => {
        const filteredQuestions: Question[] = [];
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            filteredQuestions.push(question);

            if (questions[i].isAnswerInBox) {
                const matched = (question.title.en_US as string).match(/({{[0-9]+}}+)/gi);
                const maxPatternNum = matched ? matched.length : 0;
                let j;
                let count = 0;
                for (
                    j = i + 1;
                    j < questions.length &&
                    count < maxPatternNum &&
                    !(
                        questions[j].isSubHeading ||
                        questions[j].questionType != SurveyQuestionType.SINGLE_LINE_WITH_ANSWER
                    );
                    j++
                ) {
                    const suggestedAnswers = question.suggestedAnswers as Question[];
                    suggestedAnswers.push(questions[j]);
                    count++;
                    i++;
                }
            }
        }

        setQuestionsState(filteredQuestions);

        let myQuestions: any[] = [];
        for (let question of filteredQuestions) {
            if (question.isAnswerInBox) {
                myQuestions = myQuestions.concat(question.suggestedAnswers);
            } else if (question.questionType != SurveyQuestionType.ONLY_TITLE) {
                myQuestions.push(question);
            }
        }
        myQuestions.map((item) => {
            GlobalVariableInstance.setQuestionID(item.questionId);
        });
    }, [questions]);

    useEffect(() => {
        for (const key in getAnswersLocal) {
            GlobalVariableInstance.setTotalQuestions(parseInt(key));
        }
    }, []);

    return (
        questionsState.length > 0 && (
            <div className={hasPanelLeft ? '' : 'flex justify-center'}>
                <ul className={hasPanelLeft ? 'h-full mt-1 flex flex-col' : 'h-full w-1/2 mt-1 flex flex-col'}>
                    {questionsState.map((item: Question, index: number) => {
                        const isCharQuestion = [
                            SurveyQuestionType.SINGLE_LINE_WITH_ANSWER,
                            SurveyQuestionType.SINGLE_LINE_WIHTOUT_ANSWER,
                        ].includes(item.questionType);

                        // tao function focus

                        const li = (
                            <li
                                ref={(ref) => (inputRef.current[index] = ref!)}
                                key={item.questionId}
                                className={classNames(
                                    {
                                        'flex md:flex-col justify-start': item.questionType !== 'title',
                                        'px-3 py-3': !item.isSubHeading,
                                        'flex-col ': !isCharQuestion,
                                        // "items-center": isCharQuestion,
                                        'mb-4 bg-green-100 rounded': item.questionType === 'recording',
                                        border: !hasPanelLeft,
                                    },
                                    'flex w-full',
                                )}
                            >
                                {!item.isCorrectingQuestion && (
                                    <div
                                        className={classNames({
                                            'mb-3': !isCharQuestion,
                                        })}
                                    >
                                        {item.isAnswerInBox ? (
                                            <InboxQuestion
                                                state={state}
                                                question={item}
                                                key={item.questionId}
                                                disable={disablePage}
                                            />
                                        ) : (
                                            <IndexNumberQuestion
                                                key={item.questionId}
                                                questionType={item.questionType}
                                                index={item.questionId}
                                                title={item.title.en_US}
                                                indexEnable={!item.isSubHeading}
                                            />
                                        )}
                                    </div>
                                )}
                                {!item.isSubHeading && (
                                    <div
                                        key={item.questionId}
                                        className={classNames({
                                            'flex flex-row items-center justify-between':
                                                item.questionType !== 'recording',
                                            'flex flex-col items-center justify-between h-fit w-full':
                                                item.questionType === 'recording',
                                        })}
                                    >
                                        {NormQuestionFactory(item, state, item.isCorrectingQuestion, disablePage)}
                                    </div>
                                )}
                            </li>
                        );
                        if (item.isAnswerInBox) {
                            if (Array.isArray(item.suggestedAnswers)) {
                                item.suggestedAnswers.map((question, index) => {
                                    if ('questionId' in question) {
                                        GlobalVariableInstance.setMyRef(question.questionId, inputRef.current[index]);
                                    }
                                });
                            }
                        } else if (item.questionType != SurveyQuestionType.ONLY_TITLE) {
                            GlobalVariableInstance.setMyRef(item.questionId, inputRef.current[index]);
                        }
                        return li;
                    })}
                </ul>
            </div>
        )
    );
};

export default QuestionSection;
