import Image from "next/image"
import Link from "next/link"
import React from "react"
import FooterBottom from "./FooterBottom"

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="footer__area footer-bg">
                <div className="footer__top pt-190 pb-4">
                    <div className="px-4">
                        <div className="row">
                            <div className="col-xxl-2 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="footer__widget mb-50">
                                    <div className="footer__widget-head mb-22 pt-[5px]">
                                        <div className="footer__logo">
                                            {/* <Link href="/">
                                                <Image
                                                    width={500}
                                                    height={64}
                                                    src="/assets/img/logo/odin-logo-login.png"
                                                    alt="img not found"
                                                    style={{ width: "70%" }}
                                                />
                                            </Link> */}
                                        </div>
                                    </div>
                                    <div className="footer__widget-body">
                                        <p>ENGMASTER HUB</p>

                                        <div className="footer__social">
                                            <ul>
                                                <li>
                                                    <Link
                                                        href="https://www.facebook.com/TheODINLanguage"
                                                        target="_blank"
                                                    >
                                                        <i className="fab fa-facebook-f"></i>
                                                    </Link>
                                                </li>
                                                {/* <li>
                                                    <Link
                                                        href="#"
                                                        className="tw"
                                                    >
                                                        <i className="fab fa-twitter"></i>
                                                    </Link>
                                                </li> */}
                                                <li>
                                                    <Link
                                                        href="https://www.youtube.com/@odinlanguageacademy4990"
                                                        className="pin"
                                                    >
                                                        <i className="fab fa-youtube"></i>
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
                                                    <Link href="/about">HUB Đông Tác</Link>
                                                </li>
                                                <li>
                                                    <Link href="">HUB Trần Quốc Vượng</Link>
                                                </li>
                                                <li>
                                                    <Link href="/event-details">HUB Nguyễn Văn Lộc</Link>
                                                </li>
                                                <li>
                                                    <Link href="/instructor">HUB Trần Đại Nghĩa</Link>
                                                </li>
                                                <li>
                                                    <Link href="/instructor">HUB Phố Vọng</Link>
                                                </li>
                                                {/* <li>
                                                    <Link href="/instructor">Become a Teacher</Link>
                                                </li> */}
                                                {/* <li>
                                                    <Link href="/contact">Contact</Link>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-5 col-xl-4 col-lg-6 col-md-6 col-sm-6">
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
                                                    <Link href="/instructor">
                                                        Số 70 Trần Đại Nghĩa, Phường Đồng Tâm, Quận Hai Bà Trưng, Thành
                                                        phố Hà Nội, Việt Nam
                                                    </Link>
                                                </li>
                                                <br />
                                                <li>
                                                    <Link href="tel:024.62675555">Điện thoại: 024.62675555</Link>
                                                </li>
                                                <br />
                                                <li>
                                                    <Link href="mailto:anhdp.odin@gmail.com">
                                                        Email: anhdp.hub@gmail.com
                                                    </Link>
                                                </li>
                                                <br />
                                                <li>
                                                    <Link href="#">
                                                        Số chứng nhận ĐKKD: 0109302312 do Sở kế hoạch và đầu tư Hà Nội
                                                        cấp.
                                                    </Link>
                                                </li>
                                                <br />
                                                <li>
                                                    <Link href="https://www.facebook.com/dpa.paradox?comment_id=Y29tbWVudDo2NzU4MDk4MzI3NTgxODcyXzgzNzY2NDQ3MTQxNTAxNw%3D%3D">
                                                        Người đại diện: Đào Phương Anh
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
                                            <p>Get the latest news and updates right at your inbox.</p>
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

export default Footer
