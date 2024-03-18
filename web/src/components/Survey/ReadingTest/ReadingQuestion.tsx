'use client';
import { QuestionProps } from '../../../constants/props';
import { Question } from '../../../constants/question.types';
import { useEffect, useState } from 'react';
import TextSelection from '../../Elements/TextSelection';

export const ReadingQuestion = ({ question }: { question: Question }) => {
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    return (
        <div>
            <TextSelection />
            <div
                id="editor"
                className="mb-3 text-justify flex flex-col items-center"
                dangerouslySetInnerHTML={{ __html: question.title.en_US }}
            />
        </div>
    );
};
