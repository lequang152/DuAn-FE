import Image from "next/image"
import Link from "next/link"
import React from "react"

const Cta: React.FC = () => {
    return (
        <main>
            <section className="cta__area mb--120">
                <div className="container">
                    <div className="cta__inner blue-bg fix">
                        <div className="cta__shape">
                            <Image
                                width={500}
                                height={500}
                                src="/assets/img/cta/cta-shape.png"
                                alt="img not found"
                            />
                        </div>
                        <div className="row align-items-center">
                            <div className="col-xxl-7 col-xl-7 col-lg-8 col-md-8">
                                <div className="cta__content">
                                    <h3 className="cta__title">Đăng kí học thử</h3>
                                    <p className="text-white text-justify">
                                        Hàng ngàn học viên đã bứt phá trên con đường học tiếng Anh của mình, và bạn cũng
                                        có thể trở thành người tiếp theo! ODIN LANGUAGE ACADEMY cung cấp các khóa học từ
                                        trình độ mất gốc nền tảng (khóa học tiếng Anh siêu tốc BBST) tới những khóa
                                        tiếng Anh học thuật (IELTS, TOEIC) giúp bạn dễ dạng lựa chọn lộ trình phù hợp
                                        với định hướng của cá nhân. Ngoài ra, ODIN còn là đối tác chính thức của Hội
                                        Đồng Anh (British Council). Các bạn học viên có thể yên tâm học, thi và nhận
                                        chứng chỉ IELTS quốc tế ngay tại ODIN LANGUAGE trong cùng một lộ trình xuyên
                                        suốt, giúp tiết kiệm thời gian và đạt hiệu quả một cách nhanh nhất.
                                    </p>
                                </div>
                            </div>
                            <div className="col-xxl-5 col-xl-5 col-lg-4 col-md-4">
                                <div className="cta__more d-md-flex justify-content-end p-relative z-index-1">
                                    <Link
                                        href="https://odinlanguage.edu.vn/dang-ki/"
                                        className="e-btn e-btn-white"
                                    >
                                        Đăng ký ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Cta
