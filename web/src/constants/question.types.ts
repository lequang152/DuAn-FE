import { SurveyQuestionType } from "./QuestionType"

export type Answer = {
    valueImageFileName?: string
    value: any
    answerScore: number
    id: number
    sequence: number
}
export type MatrixAnswer = {
    cols: Answer[]
    rols: Answer[]
}
export type Question = {
    questionId: number
    sequence: number
    questionType: SurveyQuestionType
    title: any
    isCorrectingQuestion?: boolean
    description: any
    saveAsEmail: boolean
    saveAsNickName: boolean
    isTimeLimited: boolean
    audioFilename?: string
    questionPlaceholder?: any
    constrErrorMsg?: any
    validationErrorMsg?: any
    constrMandatory: boolean
    timeLimit: number
    validationLengthMin: number
    validationLengthMax: number
    suggestedAnswers?: Answer[] | MatrixAnswer | Question[]
    isSubHeading: boolean
    limitListeningTimes: number
    isAnswerInBox: boolean
    maxSelectionNumber?: number
}
