import { type } from "os"
import { useContext, createContext, useState } from "react"

type Answer = {
    value: any
}

type UserAnswer = {
    accessToken: string
    answerToken: string
    answers: Map<number, Answer>
}

const userInputContext = createContext([
    {
        accessToken: "",
        answerToken: "",
        answers: new Map(),
    } as UserAnswer,
    (input: UserAnswer) => {},
])

type Props = {
    children: any
}

export const InputContext = function ({ children }: Props) {
    const [input, setInput] = useState<UserAnswer>(null!)
    return <userInputContext.Provider value={[input, setInput]}>{children}</userInputContext.Provider>
}

export const useInputContext = function () {
    return useContext(userInputContext)
}
