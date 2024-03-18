import React, { useEffect } from "react"

type Props = {
    currentPage: number
    hasNextPage: boolean
    totalPage: number
    setPage: (page: number) => void
}

export const Pagination = ({ currentPage, hasNextPage, totalPage, setPage }: Props) => {
    const fakePage: any[] = []
    const start = (Math.ceil(currentPage / (Number(process.env.RECORD_PER_PAGE) || 10)) - 1) * 3 + 1
    for (let i = start; currentPage <= totalPage && i <= totalPage && i < start + 3; i++) {
        fakePage.push(
            <li
                key={i}
                className={`${currentPage == i ? "active" : ""} `}
            >
                <a
                    onClick={(e) => {
                        if (i > currentPage && !hasNextPage) {
                            return
                        }
                        setPage(i)
                    }}
                    className={` ${i > currentPage && !hasNextPage && "disable"} `}
                >
                    <span>{i}</span>
                </a>
            </li>
        )
    }

    return (
        <div className="row">
            <div className="col-xxl-12">
                <div
                    className="basic-pagination wow fadeInUp mt-30"
                    data-wow-delay=".2s"
                >
                    <ul className="d-flex align-items-center">
                        <li className={`prev ${currentPage <= 1 ? "disabled" : ""}`}>
                            <a
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (currentPage > 1) {
                                        setPage(currentPage - 1)
                                    }
                                }}
                                href="#"
                                className={`link-btn link-prev ${currentPage == 1 ? "disabled" : ""}`}
                            >
                                Prev
                                <i className="fas fa-arrow-left"></i>
                                <i className="fas fa-arrow-left"></i>
                            </a>
                        </li>
                        {fakePage.map((li) => li)}
                        <li className={`next ${!hasNextPage ? "disabled" : ""}`}>
                            <a
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (hasNextPage) {
                                        setPage(Number(currentPage) + 1)
                                    }
                                }}
                                href="#"
                                className="link-btn"
                            >
                                Next
                                <i className="fas fa-arrow-right"></i>
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
