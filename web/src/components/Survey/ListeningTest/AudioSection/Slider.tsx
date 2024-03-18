import * as React from "react"
import { SliderProps } from "@mui/base/Slider"

const Slider = React.forwardRef(function Slider(props: SliderProps, ref: React.ForwardedRef<HTMLSpanElement>) {
    return (
        <Slider
            {...props}
            ref={ref}
            slotProps={{
                thumb: {
                    className:
                        "ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute",
                },
                root: { className: "w-full relative inline-block h-2 cursor-pointer" },
                rail: {
                    className: "bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute",
                },
                track: {
                    className: "bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full",
                },
            }}
        />
    )
})

export default Slider
