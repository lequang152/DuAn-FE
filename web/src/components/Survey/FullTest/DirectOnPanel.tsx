import React, { useEffect, useRef, useState, useCallback } from 'react';
import Box from '@mui/system/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { Button } from '@mui/joy';
import GlobalVariable from '../../../utils/GlobalVariable';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../../utils/local_survey';
import { updateUserDataToBackend } from '../../../utils/api_call';

type Props = {
    page: number;
    setPage: (page: number) => void;
};

function DirectOnPanel({ page, setPage }: Props) {
    const [openModal, setOpenModal] = React.useState(false);

    const [directionPageNumber, setDirectionPageNumber] = useState(1);

    const [arrayPagesTitle, setArrayPageTitle] = useState<any[]>([]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const saveAnswersToBackend = () => {
        const local = LocalStorageService.getLocalStorageInstance();
        const data = local.get([SURVEY_INPUT_KEY]);
        if (data) {
            const accessToken = data.accessToken;
            const answerToken = data.answerToken;
            const examData = local.get([accessToken, answerToken]);
            updateUserDataToBackend(answerToken, examData);
        }
    };

    const handleToPage = () => {
        setPage(directionPageNumber);
        GlobalVariable.getInstance().removeQuestionID();
        saveAnswersToBackend();
        handleCloseModal();
    };

    const styleBox = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '1px solid #ccc',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
    };

    useEffect(() => {
        const arrTextContent: any[] = [];
        const pagesData = GlobalVariable.getInstance().getPagesData();

        for (let data of pagesData) {
            const dataSection = data[Object.keys(data)[0]];
            let textContent;
            const htmlString = dataSection.title?.en_US;
            if (htmlString) {
                const parser = new DOMParser();
                const document = parser.parseFromString(htmlString, 'text/html');
                const pTextContent = document.querySelector('p')?.textContent;
                if (!pTextContent) {
                    const h3TextContent = document.querySelector('h3')?.textContent;
                    textContent = h3TextContent?.toUpperCase();
                } else {
                    textContent = pTextContent?.toUpperCase();
                }
                if (!textContent) {
                    textContent = htmlString.toUpperCase();
                }
            }
            arrTextContent.push(textContent);
        }
        setArrayPageTitle(arrTextContent);
    }, []);

    function convertArrayToDictionary(arr: string[]): { [key: string]: number[] } {
        const dictionary: { [key: string]: number[] } = {};

        arr.forEach((item, index) => {
            const key = item.toUpperCase();
            if (dictionary[key]) {
                dictionary[key].push(index + 1);
            } else {
                dictionary[key] = [index + 1];
            }
        });

        return dictionary;
    }

    const [numberOfSection, setNumberOfSection] = useState<{ [key: string]: number[] }>({});

    useEffect(() => {
        const pageSection = convertArrayToDictionary(arrayPagesTitle);
        setNumberOfSection(pageSection);
    }, [arrayPagesTitle]);

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <div className="flex justify-center">
                        <WarningIcon sx={{ fontSize: 24 }} color="warning" />
                        <h4 className="ml-2 text-[#ed6c02]">Warning!</h4>
                    </div>
                    <Typography>You will lose one play. Are you sure you want to move to another page?</Typography>
                    <div className="flex justify-between mt-6">
                        <Button color="success" className="bg-[#198754] w-[75px] h-[40px]" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button
                            color="success"
                            className="w-[75px] h-[40px]"
                            onClick={() => {
                                handleToPage();
                            }}
                        >
                            OK
                        </Button>
                    </div>
                </Box>
            </Modal>

            {arrayPagesTitle.map((title, index) => {
                return index === 0 ? (
                    <button
                        className={`font-bold hover:underline ${
                            page == index + 1 || arrayPagesTitle[index] === arrayPagesTitle[page - 1]
                                ? 'text-sky-600'
                                : ''
                        }`}
                        key={index}
                        onClick={() => {
                            if (GlobalVariable.getInstance().getIsPlaying()) {
                                setDirectionPageNumber(index + 1);
                                handleOpenModal();
                            } else {
                                setPage(index + 1);
                                GlobalVariable.getInstance().removeQuestionID();
                                saveAnswersToBackend();
                            }
                        }}
                    >
                        {title}
                    </button>
                ) : index < page && arrayPagesTitle[index] !== arrayPagesTitle[index - 1] ? (
                    <button
                        className={`font-bold hover:underline ${
                            arrayPagesTitle[page - 1] === arrayPagesTitle[index] ? 'text-sky-600' : ''
                        }`}
                        key={index}
                        onClick={() => {
                            if (GlobalVariable.getInstance().getIsPlaying()) {
                                setDirectionPageNumber(index + 1);
                                handleOpenModal();
                            } else {
                                setPage(index + 1);
                                GlobalVariable.getInstance().removeQuestionID();
                                saveAnswersToBackend();
                            }
                        }}
                    >
                        <span> / </span>
                        <span className="hover:underline">{title}</span>
                    </button>
                ) : (
                    <React.Fragment key={index}></React.Fragment> // or <></>
                );
            })}
            {Array.isArray(numberOfSection[arrayPagesTitle[page - 1]]) && (
                <div className={`text-sky-600 text-center`} key={page}>
                    {numberOfSection[arrayPagesTitle[page - 1]].indexOf(page) +
                        1 +
                        ' / ' +
                        numberOfSection[arrayPagesTitle[page - 1]].length}
                </div>
            )}
        </div>
    );
}

export default DirectOnPanel;
