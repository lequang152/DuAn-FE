'use client';
import { Dispatch, useEffect, useReducer } from 'react';
import { SurveyQuestionType } from '../constants/QuestionType';
import { LocalStorageService, SURVEY_KEY } from '../utils/local_survey';
import { SURVEY_INPUT_KEY } from '../utils/local_survey';

export type AnswerState = {
    accessToken: string;
    answerToken: string;
    answers: {
        [key: number]: {
            value: any;
            label: string;
        };
    };
    answersAudio?: {
        [key: number]: {
            blob: any;
        };
    };
};

export type AnswerReducerAction = {
    questionId: number;
    questionType: SurveyQuestionType;
    accessToken: string;
    answerToken: string;
    value: any;
    blobValue?: any;
};

export type AnswerReducerParams = { accessToken: string; answerToken: string };

export type LocalAnswerExam = {
    answers: AnswerState;
    setAnswers: Dispatch<AnswerReducerAction>;
};

export function useLocalAnswerExam({ accessToken, answerToken }: AnswerReducerParams, initState?: AnswerState) {
    const _initState = initState ?? {
        accessToken: accessToken,
        answerToken: answerToken,
        answers: {},
    };
    const [answers, setAnswers] = useReducer(
        (preState: AnswerState, action: AnswerReducerAction) => {
            const local = LocalStorageService.getLocalStorageInstance();

            const newState = answerDispatcher(preState, action);

            try {
                local.set([accessToken, answerToken], 'answers', newState);
            } catch (e) {
                console.log(e);
            }
            return newState;
        },
        _initState,
        (e) => {
            try {
                const local = LocalStorageService.getLocalStorageInstance();

                // go to localstorage to get the answer's data:
                const localAnswer = local.get([accessToken, answerToken, 'answers']);

                if (!localAnswer.accessToken || !localAnswer.answerToken) {
                    return _initState;
                }
                return localAnswer;
            } catch {
                return _initState;
            }
        },
    );

    useEffect(() => {
        const local = LocalStorageService.getLocalStorageInstance();

        try {
            local.set([accessToken, answerToken], 'answers', answers);
        } catch (e) {
            console.log(e);
        }
    }, [answers]);

    return {
        answers,
        setAnswers,
    };
}

function answerDispatcher(preState: AnswerState, action: AnswerReducerAction): AnswerState {
    const preAnswer = preState.answers;
    const preAnswerAudio = preState.answersAudio;

    let value: any;
    let blob: any | undefined = undefined;
    switch (action.questionType) {
        case SurveyQuestionType.SELECT:
            if (action.value <= 0) {
                value = [];
                break;
            }
        case SurveyQuestionType.SIMPLE_CHOICE:
        case SurveyQuestionType.MULTIPLE_CHOICE:
            value = Array.from(new Set(action.value));
            break;

        default:
            value = action.value;
            blob = action.blobValue;
    }

    // luu duoc blob cho moi question id vao trong state,
    // luu y thay doi blob lien tuc

    return {
        ...preState,
        answers: {
            ...preAnswer,
            [action.questionId]: {
                ...preAnswer[action.questionId],
                value: value,
            },
        },
        answersAudio: {
            ...preAnswerAudio,
            [action.questionId]: {
                blob: blob,
            },
        },
    };
}
