"use client"
// @ts-ignore
import style from "./style.module.css"

type Props = {
    message?: string
}

function Spinner({ message }: Props) {
    return (
        <div
            className="container"
            style={{
                zIndex: 3,
            }}
        >
            <div className={style["loader-container"]}>
                <div className={style["spinner"]}></div>
                <div className={style["brand-name"]}>
                    <div>{message || "Odin Academy"}</div>
                    <span className={style["dot-container"]}>
                        <span className={style["dot-1"]}>.</span>
                        <span className={style["dot-2"]}>.</span>
                        <span className={style["dot-3"]}>.</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Spinner
