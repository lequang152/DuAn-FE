// "use client"
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LocalAnswerExam } from '../../../hook/useLocalAnswerExam';
import { userAuthSelector } from '../../../redux/Selector/userAuthorSelector';
import NoteBook from '../../Elements/Models/Notebook/Notebook';
import { Button } from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextSelection from '../../Elements/TextSelection';
import GlobalVariable from '../../../utils/GlobalVariable';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../../utils/local_survey';
import { ApiService } from '../../../utils/api_service';
import { updateUserDataToBackend } from '../../../utils/api_call';
import QuestionPalette from './PalletteQuestion/QuestionPalette';

type Props = {
    hasNextPage: boolean;
    currentPage: number;
    state: LocalAnswerExam;
    param: Array<any>;
    setPage: (page: number) => void;
    changeSection: boolean;
    isLimitSectionTime: boolean;
};
const FooterTest = ({ setPage, hasNextPage, currentPage, changeSection, isLimitSectionTime }: Props) => {
    // const userInfo = useSelector(userAuthSelector)
    const [popUp, setPopUp] = useState(false);
    const userLocal = JSON.parse(localStorage.getItem('session') || '{}');
    const router = useRouter();
    const GlobalVariableInstance = GlobalVariable.getInstance();
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [directionPage, setDirectionPage] = useState(true);
    const [titleModal, setTitleModal] = useState('');

    useEffect(() => {}, [changeSection, isLimitSectionTime]);

    const styleBox = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #ccc',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
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

    const handlePreviousPage = () => {
        setPage(currentPage - 1);
        GlobalVariableInstance.removeQuestionID();
        saveAnswersToBackend();
        handleCloseModal();
    };

    const handleNextPage = () => {
        setPage(currentPage + 1);
        GlobalVariableInstance.removeQuestionID();
        saveAnswersToBackend();
        handleCloseModal();
    };

    return (
        <React.Fragment>
            <div className="px-2 text-[#005e12]  w-full h-14 bg-[#cee9ff] flex flex-row justify-between items-center z-30">
                <QuestionPalette />

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
                        <Typography>{titleModal}</Typography>
                        <div className="flex justify-between mt-6">
                            <Button
                                color="success"
                                className="bg-[#198754] w-[75px] h-[40px]"
                                onClick={handleCloseModal}
                            >
                                Close
                            </Button>
                            <Button
                                color="success"
                                className="w-[75px] h-[40px]"
                                onClick={() => {
                                    if (!directionPage) {
                                        handlePreviousPage();
                                    } else handleNextPage();
                                }}
                            >
                                OK
                            </Button>
                        </div>
                    </Box>
                </Modal>

                <div className="text-white flex flex-row items-center">
                    <NoteBook />
                    <button
                        disabled={currentPage === 1}
                        onClick={() => {
                            setDirectionPage(false);
                            if (GlobalVariableInstance.getIsPlaying()) {
                                setTitleModal('You will lose one play. Are you sure you want to move to another page?');
                                handleOpenModal();
                            } else {
                                setPage(currentPage - 1);
                                GlobalVariableInstance.removeQuestionID();
                                saveAnswersToBackend();
                            }
                        }}
                        className="group ml-2 px-8 py-1 rounded bg-green-700 flex items-center disabled:opacity-50 disabled:cursor-default"
                    >
                        <ArrowBackIcon className="" />
                    </button>

                    <button
                        disabled={!hasNextPage}
                        onClick={() => {
                            setDirectionPage(true);
                            if (GlobalVariableInstance.getIsPlaying()) {
                                setTitleModal('You will lose one play. Are you sure you want to move to another page?');
                                handleOpenModal();
                            } else if (changeSection) {
                                if (isLimitSectionTime) {
                                    setTitleModal(
                                        'If you proceed to the next page, the timer will continue for the new test. Do you want to continue?',
                                    );
                                    handleOpenModal();
                                } else {
                                    setPage(currentPage + 1);
                                    GlobalVariableInstance.removeQuestionID();
                                    saveAnswersToBackend();
                                }
                            } else {
                                setPage(currentPage + 1);
                                GlobalVariableInstance.removeQuestionID();
                                saveAnswersToBackend();
                            }
                        }}
                        className="group ml-2 px-8 py-1 rounded bg-green-700 flex items-center disabled:opacity-50 disabled:cursor-default"
                    >
                        <ArrowForwardIcon className="" />
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default FooterTest;
