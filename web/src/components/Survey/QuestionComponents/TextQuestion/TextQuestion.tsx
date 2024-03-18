import { QuestionProps } from '../../../../constants/props';
import { Textarea } from '@mui/joy';
import style from '../utils/style.module.css';
import React, { useState, useEffect } from 'react';

export const TextQuestion = ({ question, state, disable }: QuestionProps) => {
    const { answers, setAnswers } = state;
    const [wordCount, setWordCount] = useState(0);
    const value = answers.answers[question.questionId];
    const stateValue = value ? value.value : '';

    useEffect(() => {
        const newValue = { [question.questionId]: stateValue };
        let myAnswer = JSON.parse(localStorage.getItem('answerOnTest') || '{}');
        if (Object.keys(myAnswer).length === 0) {
            localStorage.setItem('answerOnTest', JSON.stringify(newValue));
        } else {
            myAnswer = {
                ...myAnswer,
                ...newValue,
            };

            localStorage.setItem('answerOnTest', JSON.stringify(myAnswer));
        }
    }, [question.questionId, stateValue]);

    const convertText = (text: string) => {
        return '<p>' + text.replace(/\n/g, '</br>') + '</p>';
    };

    const handleBlur = () => {
        const convertedValue = convertText(stateValue);
        setAnswers({
            questionId: question.questionId,
            value: convertedValue,
            accessToken: state.answers.accessToken,
            answerToken: state.answers.answerToken,
            questionType: question.questionType,
        });
    };

    return (
        <div className="w-100">
            <Textarea
                disabled={disable}
                minRows={5}
                className={`border ${style['full-width']}`}
                onChange={(e) => {
                    setAnswers({
                        questionId: question.questionId,
                        value: e.target.value,
                        accessToken: state.answers.accessToken,
                        answerToken: state.answers.answerToken,
                        questionType: question.questionType,
                    });
                    const match = e.target.value.match(/([0-9a-zA-Z]+)/gm) || [];
                    setWordCount(match.length);
                }}
                name={question.questionId + ''}
                onBlur={handleBlur}
                value={stateValue.replace(/<p>|<\/p>/g, '').replace(/<\/br>/g, '\n')}
                color="success"
            />
            <div className="pt-3">Word count: {wordCount}</div>
        </div>
    );
};
