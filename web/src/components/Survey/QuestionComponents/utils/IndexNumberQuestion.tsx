import classNames from "classnames"
import style from "./style.module.css"

function IndexNumberQuestion({
    title,
    index,
    questionType,
    indexEnable,
}: {
    title: string
    index?: any
    questionType: any
    indexEnable?: boolean
}) {    
    const getLocalStorage = JSON.parse(localStorage.getItem('survey') || '{}')
    const accessToken = getLocalStorage.current_input?.accessToken;
    const answerToken = getLocalStorage.current_input?.answerToken;
    const getAnswersLocal = answerToken ? getLocalStorage[accessToken][answerToken]?.answers.answers: {};
    
    return indexEnable ? (
        <div
            className={classNames(
                {
                    "flex-row mr-4": questionType !== "recording",
                    "flex-col bg-[#f0f8ff] h-[350px] py-3 px-5 text-justify": questionType === "recording",
                },
                "rounded-xl w-full h-fit flex text-left items-center"
            )}
        >
            {
            questionType === "recording" ? (
                <></>
            ) : (
                getAnswersLocal &&
               (
                <div className={`bg-green-600 ${getAnswersLocal[index]?.label?.length > 2 ? "w-[50px] h-[30px]" : "w-7 h-7"} 
                    mb-0 rounded-full text-white ${style["round-index"]}`}>
                        {getAnswersLocal[index]?.label}
                </div>
                )
            )
        }
            
            <div
                className={classNames(
                    {
                        "ml-0": questionType === "recording",
                        "ml-4": questionType !== "recording",
                    },
                    "w-fit h-fit [&>*]:mb-0"
                )}
                dangerouslySetInnerHTML={{ __html: title }}
            />
        </div>
    ) : (
        <div
            className={classNames(
                {
                    "ml-0": questionType === "recording",
                    "ml-4": questionType !== "recording",
                },
                "w-fit h-fit [&>*]:mb-0"
            )}
            dangerouslySetInnerHTML={{ __html: title }}
        />
    )
}

export default IndexNumberQuestion
