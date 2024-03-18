import { useEffect, useState } from "react"
import styles from "./progressbar.module.css"
import classNames from "classnames"
type ProgressProps = {
    progress: number
}
export function ProgressBar({ progress }: ProgressProps) {
    useEffect(() => {}, [progress])
    return (
        <div className={`${styles["container"]}`}>
            <div className={`${styles["progressbar-container"]}`}>
                <div
                    className={`${styles["progressbar-complete"]}`}
                    style={{ width: `${progress}%` }}
                >
                    <div className={`${styles["progressbar-liquid"]}`}></div>
                </div>
                <span
                    className={classNames(styles["progress"], {
                        "text-gray-950": progress < 49,
                        "text-white": progress >= 49,
                    })}
                >
                    {progress}%
                </span>
            </div>
        </div>
    )
}
