'use client';
import { Fragment, useEffect } from 'react';
import FullTest from '../../../../components/Survey/FullTest/FullTest';
import axios from 'axios';
import { LocalStorageService, SURVEY_INPUT_KEY } from '../../../../utils/local_survey';
import { updateUserDataToBackend } from '../../../../utils/api_call';

export default function Page({ params }: { params: { slug: any } }) {
    // console.log('====================================');
    // console.log("params", params);

    // console.log('====================================');
    useEffect(() => {
        const handleBeforeUnload = (e?: BeforeUnloadEvent) => {
            if (e) {
                e.preventDefault();
            }
            const local = LocalStorageService.getLocalStorageInstance();

            const data = local.get([SURVEY_INPUT_KEY]);
            if (data) {
                const accessToken = data.accessToken;
                const answerToken = data.answerToken;
                const examData = local.get([accessToken, answerToken]);

                updateUserDataToBackend(answerToken, examData);
            }
            if (e) {
                e.returnValue = '';
            }
        };

        const handlePopState = () => {
            alert('You clicked the browser back button!');
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            handleBeforeUnload();
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    return (
        <Fragment>
            {/* <HeaderTest /> */}
            <FullTest params={params} />
        </Fragment>
    );
}
