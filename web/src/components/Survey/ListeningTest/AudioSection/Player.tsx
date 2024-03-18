import React from "react"

type Props = {
    src: string
}

const Player = (props: Props) => {
    return (
        <div className="">
            <audio controls>
                <source
                    src={props.src}
                    type="audio/mpeg"
                />
            </audio>
        </div>
    )
}

export default Player
