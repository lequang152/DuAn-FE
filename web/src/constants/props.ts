import {LocalAnswerExam} from "../hook/useLocalAnswerExam"
import {Question} from "./question.types"

export type QuestionProps = {
    state: LocalAnswerExam
    question: Question
    disable?: boolean
    isCorrectingQuestion?: boolean
}

export type QuestionsProps = {
    questions: Question[]
}
