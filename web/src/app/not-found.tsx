'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();
    return (
        <main>
            <section className="error__area pt-200 pb-200">
                <div className="">
                    <div className="row">
                        <div className="">
                            <div className="error__item text-center flex flex-col items-center">
                                <div className="error__thumb mb-45">
                                    <Image
                                        width={640}
                                        height={336}
                                        src="/assets/img/error/error.png"
                                        alt="img not found"
                                    />
                                </div>
                                <div className="error__content">
                                    <h3 className="error__title">Something when wrong!!</h3>
                                    <p>Please try again.</p>
                                    <button className="e-btn e-btn-3 e-btn-4" onClick={() => router.push('/')}>
                                        Return to page
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default NotFound;
