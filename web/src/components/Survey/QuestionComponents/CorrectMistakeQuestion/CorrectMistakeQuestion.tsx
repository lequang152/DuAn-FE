'use client';
import { Radio } from '@mui/joy';
import { RadioGroup } from '@mui/material';
import { QuestionProps } from '../../../../constants/props';
import { Answer } from '../../../../constants/question.types';
import { setAnswer } from '../../../../redux/Slice/AnswerExam/AnswerExamSlice';
import { asc } from '../SelectQuestion/SelectQuestion';
import GlobalVariable from '../../../../utils/GlobalVariable';
import { useState, useEffect } from 'react';
import style from './style.module.css';
import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';
import htmlparser2 from "react-html-parser"

interface IAnswer {
    id: number,
    value: string
}

export const CorrectMistakeQuestion = ({ question, state, isCorrectingQuestion, disable }: QuestionProps) => {
    const { answers, setAnswers } = state;
    const _value = answers.answers && answers.answers[question.questionId];
    const [titleOnTest, setTitleOnTest] = useState(question?.title?.en_US.replace(/{|}/g, ''));
    const stateValue = _value ? (_value.value == '' ? [] : _value.value) : [];
    const getLocalStorage = JSON.parse(localStorage.getItem('survey') || '{}');
    const accessToken = getLocalStorage.current_input?.accessToken;
    const answerToken = getLocalStorage.current_input?.answerToken;
    const getAnswersLocal = answerToken ? getLocalStorage[accessToken][answerToken]?.answers.answers : {};
    const [idAnswer, setIdAnswer] = useState(state?.answers?.answers[question.questionId]?.value[0]?.id || 0)
    const [saveAnswer, setSaveAnswer] = useState<IAnswer>()
    const [idQuestion, setIdQuestion] = useState(0)

    const [editableIndex, setEditableIndex] = useState<number | null>(null);
    const preAnswer = state?.answers?.answers?.[question.questionId]?.value 
    const preValue = preAnswer !== '' ? preAnswer?.[0]?.value : '' 

    useEffect(() => {
        if(preAnswer && preAnswer !== '') {
            const getIdAnswer = preAnswer[0].id
            const getValueAnswer = preAnswer[0].value
            if(getIdAnswer) {
                const getUtag = document.getElementById(`id-${getIdAnswer}`)
                if(getUtag) {
                    getUtag.innerText = getValueAnswer !== '' ? getValueAnswer : GlobalVariable.getInstance().getQuestionToCorrect()[question.questionId][parseInt(getIdAnswer)]
                    getUtag.style.color = 'red'
                }
                Object.keys(GlobalVariable.getInstance().getQuestionToCorrect()).forEach((questionId) => {
                    if(parseInt(questionId) === question.questionId) {
                        Object.keys(GlobalVariable.getInstance().getQuestionToCorrect()[questionId]).forEach((idAns) => {

                            if(idAns !== getIdAnswer.toString()) {
                                const getElementU = document.getElementById(`id-${idAns}`)
                                if(getElementU) {
                                    getElementU.innerText = GlobalVariable.getInstance().getQuestionToCorrect()[question.questionId][parseInt(idAns)]
                                    getElementU.style.color = '#6d6e75'
                                }
                            }
                        })
                    }
                })
            }
        }
    }, [state, idAnswer, idQuestion])
    
    const transform = (node: any, index:number) => {
        if(node.type === 'tag' && node.name == 'u' && node.children.length > 0) {
            const data = node.children[0].data;
            const containsCurlyBraces = /{.*}/.test(data);
            if (containsCurlyBraces) {
                const handleClickOnUTag = () => {
                    setIdQuestion(question.questionId)
                    setEditableIndex(index === editableIndex ? null : index);
                    Object.keys(GlobalVariable.getInstance().getQuestionToCorrect()).forEach((questionId) => {
                        Object.keys(GlobalVariable.getInstance().getQuestionToCorrect()[parseInt(questionId)]).forEach((questionAnsId) => {
                            const value = GlobalVariable.getInstance().getQuestionToCorrect()[parseInt(questionId)][parseInt(questionAnsId)];
                            if(value === data.replace(/{|}/g, '')) {
                                setIdAnswer(parseInt(questionAnsId))
                            }
                        })
                    })
                }; 

                let findAnswerId: string | undefined = undefined
                Object.keys(GlobalVariable.getInstance().getQuestionToCorrect()).find((questionId) => {
                    const foundId = Object.keys(GlobalVariable.getInstance().getQuestionToCorrect()[parseInt(questionId)]).find((questionAnsId) => {
                        const value = GlobalVariable.getInstance().getQuestionToCorrect()[parseInt(questionId)][parseInt(questionAnsId)];
                        return value === data.replace(/{|}/g, '');
                    });
                
                    // Nếu tìm thấy giá trị, gán cho findAnswerId và dừng vòng lặp
                    if (foundId !== undefined) {
                        findAnswerId = foundId;
                        return true;
                    }
                
                    return false;
                });
                  
                  return index === editableIndex ? (
                    <input
                        id={idAnswer.toString()}
                        disabled={disable}
                        key={index}
                        type="text"
                        value={
                            preAnswer !== '' ? (preAnswer?.[0]?.id === idAnswer ? preValue : data.replace(/{|}/g, '').replace(/\(\d+\)/g, '').replace(/[()]/g, '')) 
                                            : data.replace(/{|}/g, '').replace(/\(\d+\)/g, '').replace(/[()]/g, '')
                        }
                        onClick={(e) => e.stopPropagation()} 
                        style={{ 
                            border: '1px solid', 
                            padding: '2px', 
                            maxWidth: 150,
                            marginLeft: 4,
                            paddingLeft: 10,
                            paddingRight: 10,
                            transition: 'ease-in-out 0.3s',
                            borderRadius: 4,
                        }}
                        onChange={(e) => {
                            setIdQuestion(question.questionId)
                            const newValue: object = {[question.questionId]: `${data.replace(/{|}/g, '')}:${e.target.value}`}
                            let myAnswer: object = JSON.parse(localStorage.getItem("answerOnTest") || "{}")
                            if(Object.keys(myAnswer).length === 0) {
                                localStorage.setItem("answerOnTest", JSON.stringify(newValue))
                            } else {
                                myAnswer = {
                                    ...myAnswer, 
                                    ...newValue
                                }
                                            
                                localStorage.setItem("answerOnTest", JSON.stringify(myAnswer))
                            }
                            setSaveAnswer({
                                id: idAnswer,
                                value: e.target.value
                            })
                            state.setAnswers({
                                accessToken: state.answers.accessToken,
                                answerToken: state.answers.answerToken,
                                questionId: question.questionId,
                                questionType: question.questionType,
                                value: [{ id: idAnswer, value: e.target.value}]
                            })
                            
                        }}
                    />
                    ) : (
                    <u id={`id-${findAnswerId}`} key={index} onClick={handleClickOnUTag}>
                        {data.replace(/{|}/g, '')}
                    </u>
                  );
            }
        }
    }



    question.suggestedAnswers = (question.suggestedAnswers! as Answer[]).sort(asc);

    return !isCorrectingQuestion ? (
        <>
            <RadioGroup
                onChange={(e) => {
                    setAnswer({
                        questionId: question.questionId,
                        value: e.target.value,
                    });
                }}
                className="flex"
            >
                {(question.suggestedAnswers as Answer[]).map((answer, aindex) => {
                    return (
                        <div key={aindex} className="flex flex-row items-center mb-2">
                            <Radio
                                checked={stateValue.find((id: number) => id == answer.id) != undefined}
                                onChange={(e) => {
                                    if (question.suggestedAnswers) {
                                        const suggestAns = question.suggestedAnswers as Answer[];
                                        const userAns = suggestAns.find((ans) => ans.id.toString() === e.target.value);
                                        const newValue: object = { [question.questionId]: userAns?.value.en_US };
                                        let myAnswer: object = JSON.parse(localStorage.getItem('answerOnTest') || '{}');
                                        if (Object.keys(myAnswer).length === 0) {
                                            localStorage.setItem('answerOnTest', JSON.stringify(newValue));
                                        } else {
                                            myAnswer = {
                                                ...myAnswer,
                                                ...newValue,
                                            };

                                            localStorage.setItem('answerOnTest', JSON.stringify(myAnswer));
                                        }
                                    }
                                    const element = e.target as HTMLInputElement;
                                    setAnswers({
                                        questionId: question.questionId,
                                        value: [Number(element.value)],
                                        accessToken: state.answers.accessToken,
                                        answerToken: state.answers.answerToken,
                                        questionType: question.questionType,
                                    });
                                }}
                                value={answer.id}
                                name={question.questionId + ''}
                                color="success"
                                disabled={disable}
                            />
                            <p className="ml-3 pr-4 text-left mb-0">{answer.value.en_US}</p>
                        </div>
                    );
                })}
            </RadioGroup>
        </>
    ) : (
        <>
            {(question.suggestedAnswers as Answer[]).map((answer, aindex) => {
                GlobalVariable.getInstance().setQuestionToCorrect(question.questionId ,answer.id, answer.value.en_US);
                return <div key={aindex}></div>;
            })}
            <div
                className="rounded-xl w-full h-fit flex text-left items-center flex-row mr-4 "
                id={`id-${question.questionId}`}
            >
                <div
                    className={`bg-green-600 ${
                        getAnswersLocal[question.questionId]?.label.length > 2 ? 'w-[50px] h-[30px]' : 'w-7 h-7'
                    } 
                        mb-0 rounded-full text-white ${style['round-index']}`}
                >
                    {getAnswersLocal[question.questionId]?.label}
                </div>

                <div className="w-fit h-fit [&>*]:mb-0 ml-4">
                    {ReactHtmlParser(question?.title?.en_US, {decodeEntities: true, transform: transform})}
                </div>
            </div>
        </>
    );
};