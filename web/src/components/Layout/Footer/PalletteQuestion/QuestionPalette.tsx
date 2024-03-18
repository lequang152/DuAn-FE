import React, { useState, useEffect, useLayoutEffect } from 'react';
import GlobalVariable from '../../../../utils/GlobalVariable';
import ButtonQuestion from './ButtonQuestion';
import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Drawer } from '@mui/material';
import styles from './style.module.css';
import ReactPaginate from 'react-paginate';
import { Button } from 'react-bootstrap';
import './style.module.css';

function QuestionPalette() {
    const getLocalStorage = JSON.parse(localStorage.getItem('survey') || '{}');
    const accessToken = getLocalStorage?.current_input?.accessToken;
    const answerToken = getLocalStorage?.current_input?.answerToken;
    const getAnswers = answerToken ? getLocalStorage[accessToken][answerToken]?.answers.answers : {};

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const styleNormal = {
        backgroundColor: '',
        border: '1px solid',
        borderColor: 'green',
        color: 'green',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const styleDone = {
        backgroundColor: '#15803D',
        border: '1px solid',
        borderColor: 'green',
        color: 'white',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const GlobalVariableInstance = GlobalVariable.getInstance();
    const getQuestionId = GlobalVariableInstance.getQuestionID();

  const handleButtonFocus = (id: number) => {
    const inputElements = document.getElementsByName(`${id}`);
    if (inputElements && inputElements.length > 0) {
      const parentElement = inputElements[0].closest('li');
      if (parentElement) {
        parentElement.classList.add(styles.highlight);
        parentElement.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          parentElement.classList.remove(styles.highlight);
        }, 500);
        //inputElements[0].focus();
      } 
    } else {
      const divElement = document.getElementById(`id-${id}`)
      if(divElement) {
        const parentElement = divElement.closest('li');
        if (parentElement) {
          parentElement.classList.add(styles.highlight);
          parentElement.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            parentElement.classList.remove(styles.highlight);
          }, 500);
        } 
      }
    }
  }

    // when questionID length change, isRender change state
    const [isRender, setIsRender] = useState(getQuestionId.length);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setIsRender(getQuestionId.length);
    }, [getAnswers]);

    //re-render Button
    useLayoutEffect(() => {
        setCurrentPage(0);
    }, [isRender]);

    const itemsPerPage = 10;

    const handlePageChange = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };

    const renderButton = getQuestionId
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        .map((id, index) => {
            const answer = getAnswers && getAnswers[id];
            const label = answer?.label;
            return (
                label && (
                    <ButtonQuestion
                        onClick={() => {
                            handleButtonFocus(id);
                            if (isDrawerOpen) {
                                setDrawerOpen(false);
                            }
                        }}
                        styleButton={
                            answer?.value?.length === 0 || answer?.value === undefined ? styleNormal : styleDone
                        }
                        key={index}
                    >
                        {label}
                    </ButtonQuestion>
                )
            );
        });

    const pageCount = Math.ceil(getQuestionId.length / itemsPerPage);

    return (
        <div>
            <div className="flex buttonPallette:hidden">
                <button onClick={toggleDrawer}>
                    <MenuBookIcon fontSize="large" />
                </button>
                <Drawer
                    open={isDrawerOpen}
                    onClose={toggleDrawer}
                    keepMounted={false}
                    anchor="left"
                    PaperProps={{
                        style: {
                            width: '80px',
                            backgroundColor: 'aliceblue',
                            display: 'flex',
                            gap: '8px',
                            justifyContent: 'center',
                            padding: '10px',
                        },
                    }}
                >
                    {renderButton}
                </Drawer>
            </div>

            <div className="hidden buttonPallette:flex">
                <Box
                    sx={{
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        maxHeight: '55px',
                    }}
                >
                    {renderButton}
                    {getQuestionId.length > 10 ? (
                        <ReactPaginate
                            className="flex gap-2 items-center"
                            previousLabel={
                                <Button
                                    className="btn-success"
                                    disabled={currentPage === 0}
                                    style={{
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        padding: '0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#198754',
                                        borderColor: '#198754',
                                    }}
                                >
                                    <span style={{ marginTop: '-2px', marginRight: '2px' }}>&lt;</span>
                                </Button>
                            }
                            nextLabel={
                                <Button
                                    className="btn-success"
                                    disabled={currentPage === pageCount - 1}
                                    style={{
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        padding: '0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#198754',
                                        borderColor: '#198754',
                                    }}
                                >
                                    <span style={{ marginTop: '-2px', marginLeft: '2px' }}>&gt;</span>
                                </Button>
                            }
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={-1}
                            pageRangeDisplayed={-1}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            renderOnZeroPageCount={null}
                        />
                    ) : (
                        <></>
                    )}
                </Box>
            </div>
        </div>
    );
}

export default QuestionPalette;
