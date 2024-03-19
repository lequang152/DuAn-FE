'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postLogin } from '../../redux/Slice/Auth/AuthSlice';
import { AppDispatch } from '../../redux/store';
import { makeErrorToast, makeSuccessToast } from '../../utils/toast';

const SignInMain: React.FC = () => {
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: '',
        keepSign: false,
    });
    const [passwordVisible, setPasswordVisible] = useState(true);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    //   console.log("token", authState.token);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleKeepSignChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserLogin({ ...userLogin, keepSign: e.target.checked });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userPost: {
            username: string;
            password: string;
            keepSign: boolean;
        } = userLogin;
        dispatch(postLogin(userPost)).then((originalPromiseResult: any) => {
            if (originalPromiseResult.type === 'auth/postLogin/fulfilled') {
                makeSuccessToast(
                    `Login success with user ${originalPromiseResult?.payload?.data?.data?.user.username}`,
                );
                localStorage.setItem('TOKEN', originalPromiseResult?.payload?.data?.data?.token);
                localStorage.setItem('USER', JSON.stringify(originalPromiseResult?.payload?.data?.data?.user));
                router.push('/');
                return;
            }
            if (originalPromiseResult.type === 'auth/postLogin/rejected') {
                makeErrorToast('Username or password is not correct!' ?? originalPromiseResult?.error?.message);
                return;
            }
        });
    };
    const [statusSignIn, setStatusSignIn] = useState(undefined);

    useEffect(() => {
        const getLocalStorage = JSON.parse(localStorage.getItem('session') || '{}');
        setStatusSignIn(getLocalStorage.isAuthenticated);
    }, []);

    if (statusSignIn === undefined) {
        return (
            <main className="">
                <section className="signup__area po-rel-z1 pt-24 pb-36">
                    <div className="sign__shape">
                        <Image
                            width={130}
                            height={250}
                            className="man-1"
                            src="/assets/img/icon/sign/man-1.png"
                            alt="img not found"
                        />
                        <Image
                            width={100}
                            height={123}
                            className="man-2"
                            src="/assets/img/icon/sign/man-2.png"
                            alt="img not found"
                        />
                        <Image
                            width={25}
                            height={20}
                            className="circle"
                            src="/assets/img/icon/sign/circle.png"
                            alt="img not found"
                        />
                        <Image
                            width={32}
                            height={17}
                            className="zigzag"
                            src="/assets/img/icon/sign/zigzag.png"
                            alt="img not found"
                        />
                        <Image
                            width={33}
                            height={63}
                            className="dot"
                            src="/assets/img/icon/sign/dot.png"
                            alt="img not found"
                        />
                        <Image
                            width={624}
                            height={680}
                            className="bg"
                            src="/assets/img/icon/sign/sign-up.png"
                            alt="img not found"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between ">
                        <div className="row">
                            <div className="">
                                <div className="section__title-wrapper text-center mb-14">
                                    <h2 className="section__title">
                                        Sign in to <br /> EngMaster Hub.
                                    </h2>
                                    <p>
                                        If you don&apos;t have an account you can{' '}
                                        <Link
                                            style={{
                                                color: 'blue',
                                            }}
                                            href="/sign-up"
                                        >
                                            Register here!
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row w-full lg:w-[35%] md:w-3/4">
                            <div className="w-[100%]">
                                <div className="sign__wrapper white-bg px-14 py-10">
                                    <div className="sign__header mb-9">
                                        <div className="sign__in text-center">
                                            <p>
                                                {' '}
                                                <span>........</span> Or, <Link href="/sign-in">sign in</Link> with your
                                                email
                                                <span> ........</span>{' '}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="sign__form">
                                        <form action="" onSubmit={handleSubmit}>
                                            <div className="sign__input-wrapper mb-6">
                                                <h5>Work email</h5>
                                                <div className="sign__input">
                                                    <div>
                                                        <i className="fas fa-envelope icon"></i>
                                                        <input
                                                            name="username"
                                                            type="text"
                                                            value={userLogin.username}
                                                            onChange={handleChangeInput}
                                                            placeholder="Your e-mail address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sign__input-wrapper mb-10">
                                                <h5>Password</h5>
                                                <div className="sign__input">
                                                    <div>
                                                        <i className="fas fa-lock icon"></i>
                                                        <input
                                                            name="password"
                                                            type={passwordVisible ? 'password' : 'text'}
                                                            value={userLogin.password}
                                                            onChange={handleChangeInput}
                                                            placeholder="Your password"
                                                        />
                                                        {passwordVisible ? (
                                                            <i
                                                                className="fas fa-eye icon_eye cursor-pointer"
                                                                onClick={() => setPasswordVisible(false)}
                                                            ></i>
                                                        ) : (
                                                            <i
                                                                className="fas fa-eye-slash icon_eye cursor-pointer"
                                                                onClick={() => setPasswordVisible(true)}
                                                            ></i>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sign__action d-sm-flex justify-content-between mb-30">
                                                <div className="sign__agree d-flex align-items-center">
                                                    <input
                                                        className="m-check-input"
                                                        type="checkbox"
                                                        id="m-agree"
                                                        checked={userLogin.keepSign}
                                                        onChange={handleKeepSignChange}
                                                    />
                                                    <label className="m-check-label" htmlFor="m-agree">
                                                        Keep me signed in
                                                    </label>
                                                </div>
                                                <div className="sign__forgot">
                                                    <a href="#">Forgot your password?</a>
                                                </div>
                                            </div>
                                            <button className="e-btn mt-6 w-100">
                                                <span></span> Sign In
                                            </button>
                                            <div className="sign__new text-center mt-10">
                                                <p>
                                                    You don&apos;t have an account? <Link href="/sign-up">Sign Up</Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    } else {
        router.push('/');
        return;
    }
};

export default SignInMain;
