import { QuestionProps } from "../../../../constants/props"
import { Input } from "@mui/joy"
import React from "react"
import { NumericFormat, NumericFormatProps } from "react-number-format"

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
}

const NumericFormatAdapter = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatAdapter(props, ref) {
        const { onChange, ...other } = props

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    })
                }}
                thousandSeparator
                valueIsNumericString
            />
        )
    }
)

export const NumericQuestion = ({ question, state }: QuestionProps) => {
    const { answers, setAnswers } = state
    const value = answers.answers[question.questionId]
    const stateValue = value ? value.value : ""
    return (
        <div>
            <Input
                value={stateValue}
                onChange={(e) => {
                    setAnswers({
                        questionId: question.questionId,
                        value: Number(e.target.value),
                        accessToken: state.answers.accessToken,
                        answerToken: state.answers.answerToken,
                        questionType: question.questionType,
                    })
                }}
                slotProps={{
                    input: {
                        component: NumericFormatAdapter,
                    },
                }}
                color="success"
            />
        </div>
    )
}

{
    /* <input
type="number"
class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
id="exampleFormControlInputNumber"
placeholder="Example label" />
<label
for="exampleFormControlInputNumber"
class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
>Number input
</label> */
}
