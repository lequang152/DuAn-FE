import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { AuthLoginInputState } from '../constants/AuthenticationState';
import { AnswerState } from '../hook/useLocalAnswerExam';

interface signUpUser {
    name: string;
    username: string;
    password: string;
    rePassword: string;
    agreed: boolean;
}

export class ApiService {
    accessToken: string;
    answerToken: string;
    canRefreshToken: boolean;

    constructor() {
        this.accessToken = '';
        this.answerToken = '';
        this.canRefreshToken = true;
    }

    public getAccessToken() {
        return this.accessToken;
    }

    public setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    public getAnswerToken() {
        return this.answerToken;
    }

    public setAnswerToken(answerToken: string) {
        this.answerToken = answerToken;
    }

    public getCanRefreshToken(): boolean {
        return this.canRefreshToken;
    }

    public setCanRefreshToken(bool: boolean): void {
        this.canRefreshToken = bool;
    }

    public static async refreshToken() {
        const session = JSON.parse(localStorage.getItem('session') || '{}');

        if (!session || !session.refreshToken) {
            throw {
                message: 'Session not found, please login.',
            };
        }
        const header = {
            Authorization: `Bearer ${session.refreshToken}`,
        };
        const data = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/auth/refresh`,
            {},
            {
                headers: header,
            },
        );

        const newSession = {
            ...session,
            ...data.data,
        };

        localStorage.setItem("session", JSON.stringify(newSession))
        localStorage.setItem("TOKEN", data.data.token)
    }

    public static async Login(requestBody: AuthLoginInputState) {
        return await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/email/login`, requestBody);
    }

    public static Register(requestBody: signUpUser) {
        return axios.post(`${process.env.NEXT_PUBLIC_API}/auth/email/register`, requestBody);
    }

    public async getAudioQuestion(id: number, header: object) {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_API}/survey/count/${this.accessToken}/${this.answerToken}:/${id}/audio`,
            { headers: header },
        );
    }

    public static getSurveyList(page: number, header: object) {
        return axios.get(`${process.env.NEXT_PUBLIC_API}/survey/all?page=${page}`, {
            headers: header,
        });
    }

    public static async getFullTestQuestions(param_0: any, param_1: any, page: number, header: object) {
        return axios.get(`${process.env.NEXT_PUBLIC_API}/survey/questions/${param_0}/${param_1}?page=${page}`, {
            headers: header,
        });
    }

    public static async apiStartExam(accessToken: any, header: object) {
        return await axios.patch(
            `${process.env.NEXT_PUBLIC_API}/survey/start/${accessToken}`,
            {},
            {
                headers: header,
            },
        );
    }

    public static examTestMain(page: number, header: object) {
        return axios.get(`${process.env.NEXT_PUBLIC_API}/survey/5ef0d238-2895-4404-9dff-c493eeefe4f6?page=${page}`, {
            headers: header,
        });
    }

    public static startTestMain(param_0: any, param_1: any, header: object) {
        return axios.patch(
            `${process.env.NEXT_PUBLIC_API}/survey/begin/${param_0}/${param_1}`,
            {},
            {
                headers: header,
            },
        );
    }

    public static getInfoPagigationTab(newValue: string) {
        return axios.get(`${process.env.NEXT_PUBLIC_API}/survey/tags/by-name?name=${newValue}`);
    }

    public static async apiCallStartExam(accessToken: string, examCode: string | undefined, header: AxiosHeaders) {
        return await axios.patch(
            `${process.env.NEXT_PUBLIC_API}/survey/start/${accessToken}${examCode ? '?code=' + examCode.trim() : ''}`,
            {},
            {
                headers: header,
            },
        );
    }

    public static submitAudioQuestion(accessToken: string, answerToken: string, state: AnswerState, header: object) {
        return axios.post(`${process.env.NEXT_PUBLIC_API}/survey/submit/${accessToken}/${answerToken}`, state, {
            headers: header,
        });
    }
}
