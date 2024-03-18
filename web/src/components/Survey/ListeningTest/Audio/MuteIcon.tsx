function MuteIcon({ width = 24, height = 24, fill = "white" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g
                id="SVGRepo_bgCarrier"
                stroke-width="0"
            ></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <g clip-path="url(#clip0_15_183)">
                    <rect
                        width={width}
                        height={height}
                    ></rect>
                    <path
                        d="M3 16V8H6L11 4V20L6 16H3Z"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M14.5 15L20.5 9"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M14.5 9L20.5 15"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </g>
                <defs>
                    <clipPath id="clip0_15_183">
                        <rect
                            width={width}
                            height={height}
                        ></rect>
                    </clipPath>
                </defs>
            </g>
        </svg>
    )
}

export default MuteIcon
