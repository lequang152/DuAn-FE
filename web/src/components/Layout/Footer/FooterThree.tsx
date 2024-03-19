import React from "react"
import Link from "next/link"
import FooterBottom from "./FooterBottom"
import Image from "next/image"

const FooterThree: React.FC = () => {
    return (
        <footer>
            <div className="footer__area footer-bg">
                <div className="footer__top pt-90 pb-4">
                    <div className="px-4">
                        <div className="row">
                            <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="footer__widget mb-50">
                                    <div className="footer__widget-head mb-22">
                                        <div className="footer__logo">
                                            <Link href="/">
                                                <Image
                                                    width={500}
                                                    height={64}
                                                    src="/assets/img/logo/logo-odin1.png"
                                                    alt="img not found"
                                                    style={{ width: "70%" }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="footer__widget-body">
                                        <p>
                                            IELTS Mock Tests: Streamlined and Focused Preparation Online
                                        </p>

                                        <div className="footer__social">
                                            <ul>
                                                <li>
                                                    <Link href="https://www.facebook.com/TheODINLanguage">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="tw"
                                                    >
                                                        <i className="fab fa-twitter"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="pin"
                                                    >
                                                        <i className="fab fa-pinterest-p"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-6 col-md-6 col-sm-6">
                                <div className="footer__widget mb-50">
                                    <div className="footer__widget-head mb-22">
                                        <h3 className="footer__widget-title">Address</h3>
                                    </div>
                                    <div className="footer__widget-body">
                                        <div className="footer__link">
                                            <ul>
                                                <li>
                                                    <Link href="/#">HUB Xuân Thủy</Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                <div className="footer__widget mb-50">
                                    <div className="footer__widget-head mb-22">
                                        <h3 className="footer__widget-title">
                                            CTCP Phát Triển Giáo Dục và Đào Tạo HUB
                                        </h3>
                                    </div>
                                    <div className="footer__widget-body">
                                        <div className="footer__link">
                                            <ul>
                                                <li>
                                                    <Link href="#">
                                                        Số 144 Xuân Thủy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành
                                                        phố Hà Nội, Việt Nam
                                                    </Link>
                                                </li>
                                                <br />
                                                <li>
                                                    <Link href="#">Điện thoại: 024.62675555</Link>
                                                </li>
                                                <br />
                                                <li>
                                                    <Link href="#">
                                                        Email: admin.hub@gmail.com
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="footer__widget  mb-50">
                                    <div className="footer__widget-head mb-22">
                                        <h3 className="footer__widget-title">Subscribe</h3>
                                    </div>
                                    <div className="footer__widget-body">
                                        <div className="footer__subscribe">
                                            <form action="#">
                                                <div className="footer__subscribe-input mb-15">
                                                    <input
                                                        type="email"
                                                        placeholder="Your email address"
                                                    />
                                                    <button type="submit">
                                                        <i className="fas fa-arrow-right"></i>
                                                        <i className="fas fa-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </form>
                                            <p>Receive news and updates straight to your inbox.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterBottom />
            </div>
        </footer>
    )
}

export default FooterThree
