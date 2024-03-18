import { QuestionProps } from '../../../../constants/props';
import { Answer } from '../../../../constants/question.types';
import GlobalVariable from '../../../../utils/GlobalVariable';

export function asc(x: Answer, y: Answer): number {
    if (x.sequence > y.sequence) {
        return 1;
    }
    if (x.sequence < y.sequence) {
        return -1;
    }
    if (x.sequence == y.sequence) {
        if (x.id > y.id) return 1;
        if (x.id < y.id) return -1;
    }
    return 0;
}

function SelectQuestion({ question, state, disable }: QuestionProps) {
    const { answers, setAnswers } = state;
    const value = answers.answers && answers.answers[question.questionId];
    const stateValue = value ? value.value : [];
    const global = GlobalVariable.getInstance();

    question.suggestedAnswers = (question.suggestedAnswers! as Answer[]).sort(asc);
    return (
        <>
            <div className="flex flex-col justify-between w-1/2">
                <select
                    disabled={disable}
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    name={question.questionId + ''}
                    onChange={(e: any) => {
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
                        setAnswers({
                            questionId: question.questionId,
                            value: [parseInt(e.target.value)],
                            accessToken: state.answers.accessToken,
                            answerToken: state.answers.answerToken,
                            questionType: question.questionType,
                        });
                    }}
                    defaultValue={stateValue.length > 0 ? stateValue[0] : -1}
                >
                    <option key={-1} value={-1}>
                        Select an option
                    </option>
                    {(question.suggestedAnswers as Answer[]).map((answer, aindex) => {
                        return (
                            <option key={aindex} value={answer.id}>
                                {answer.value.en_US}
                            </option>
                        );
                    })}
                </select>
            </div>
        </>
    );
}

export default SelectQuestion;
