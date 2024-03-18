import { useEffect, useState } from 'react';
import { SurveyQuestionType } from '../../../../constants/QuestionType';
import { Question } from '../../../../constants/question.types';
import { LocalAnswerExam } from '../../../../hook/useLocalAnswerExam';
import AudioQuestion from '../../ListeningTest/AudioSection/AudioQuestion';
import { ReadingQuestion } from '../../ReadingTest/ReadingQuestion';

export type SpecQuestionProps = {
    question: Question;
    accessToken: string;
    answerToken: string;
};

export function SpecQuestionFactory(question: Question, accessToken: string, answerToken: string) {
    switch (question.questionType) {
        case SurveyQuestionType.AUDIO:
            return (
                <AudioQuestion
                    accessToken={accessToken}
                    answerToken={answerToken}
                    question={question}
                    audioURL={question.audioFilename!}
                />
            );
        case SurveyQuestionType.ONLY_TITLE:
            return (
                <ReadingQuestion
                    // accessToken={accessToken}
                    // answerToken={answerToken}
                    question={question}
                />
            );
    }
}
