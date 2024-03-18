'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type } from 'os';

type Props = {
    message?: string;
};
const ErrorMain = ({ message }: Props) => {
    const router = useRouter();
    return (
        <main
            style={{
                width: '100%',
                height: '100%',
            }}
            className="flex items-center justify-center relative"
        >
            <section className="error__area">
                <div className="error__item text-center flex flex-col items-center">
                    <div className="error__thumb mb-45">
                        <Image width={640} height={336} src="/assets/img/error/error.png" alt="img not found" />
                    </div>
                    <div className="error__content">
                        <h4 className="error__title">{message || 'Something went wrong!!'}</h4>
                        <p>Please try again.</p>
                        <button className="e-btn e-btn-3 e-btn-4" onClick={() => router.push('/')}>
                            Return to page
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ErrorMain;
