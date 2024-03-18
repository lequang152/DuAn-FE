//@ts-nocheck
import React from "react"
import TextSelector from "text-selection-react"

const TextSelection = () => {
    return (
        <TextSelector
            unmark={true}
            unmarkText="Remove"
            events={[
                {
                    text: "Mark",
                    handler: () => {}
                },
            ]}
            color={"yellow"}
            colorText={true}
        />
    )
}

export default TextSelection
