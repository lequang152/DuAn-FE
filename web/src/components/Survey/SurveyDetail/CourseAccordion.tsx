import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from "react-accessible-accordion"

interface pageProps {
    surveyInfo: any
}

export const CourseAccordion: React.FC<pageProps> = ({ surveyInfo }) => {
    return (
        <div className="course__curriculum">
            <Accordion className="accodion-style--1">
                {surveyInfo.pages.map((item: any, index: any) => (
                    <AccordionItem
                        key={index}
                        className="accordion-item"
                    >
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <h2
                                    className="accordion-header"
                                    id="week-01"
                                >
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#week-01-content"
                                        aria-expanded="true"
                                        aria-controls="week-01-content"
                                        dangerouslySetInnerHTML={{ __html: item.page.title.en_US }}
                                    ></button>
                                </h2>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            {item.questions.map((subItem: any, index: any) => (
                                <div
                                    className="course__curriculum-content d-sm-flex justify-content-between align-items-center"
                                    key={index}
                                >
                                    <div className="course__curriculum-info flex items-center">
                                        <svg
                                            className="document"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                className="st0"
                                                d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z"
                                            />
                                            <polyline
                                                className="st0"
                                                points="14,2 14,8 20,8 "
                                            />
                                            <line
                                                className="st0"
                                                x1="16"
                                                y1="13"
                                                x2="8"
                                                y2="13"
                                            />
                                            <line
                                                className="st0"
                                                x1="16"
                                                y1="17"
                                                x2="8"
                                                y2="17"
                                            />
                                            <polyline
                                                className="st0"
                                                points="10,9 9,9 8,9 "
                                            />
                                        </svg>
                                        <h3 dangerouslySetInnerHTML={{ __html: subItem.title.en_US }}></h3>
                                    </div>
                                    <div className="course__curriculum-meta">
                                        <span className="time">
                                            <i className="fas fa-clock"></i> {subItem.timeLimit} minutes
                                        </span>
                                        <span className="question">2 questions</span>
                                    </div>
                                </div>
                            ))}
                            {/* <div className="course__curriculum-content d-sm-flex justify-content-between align-items-center">
                                <div className="course__curriculum-info flex">
                                    <svg viewBox="0 0 24 24">
                                        <polygon
                                            className="st0"
                                            points="23,7 16,12 23,17 "
                                        />
                                        <path
                                            className="st0"
                                            d="M3,5h11c1.1,0,2,0.9,2,2v10c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7C1,5.9,1.9,5,3,5z"
                                        />
                                    </svg>
                                    <h3>
                                        <span>Video: </span> Greetings and introduction
                                    </h3>
                                </div>
                                <div className="course__curriculum-meta">
                                    <span className="time">
                                        <i className="fas fa-clock"></i> 15 minutes
                                    </span>
                                </div>
                            </div> */}
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
