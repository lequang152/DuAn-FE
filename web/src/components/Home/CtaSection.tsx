import Image from "next/image"
import Link from "next/link"
import React from "react"

const Cta: React.FC = () => {
    return (
        <main>
            <section className="cta__area mb--120">
                <div className="container">
                    <div className="cta__inner purple-bg fix">
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
                                    <h3 className="cta__title">Đăng ký Luyện Đề</h3>
                                    <p className="text-white text-justify">
                                        Tham gia cùng hàng nghìn học viên đã làm chủ nghệ thuật ngôn ngữ tại ENGMASTER HUB,
                                        nơi bạn có thể trở thành người tiếp theo tỏa sáng trên hành trình chinh phục tiếng Anh.
                                        Cung cấp một loạt bài thi thử từ cơ bản đến nâng cao, chúng tôi đồng hành cùng bạn từ
                                        những bước đầu tiên đến chạm ngõ các kỳ thi IELTS, TOEIC, giúp bạn tinh chỉnh lộ trình học tập
                                        theo mục tiêu riêng. Là đối tác chiến lược của Hội Đồng Anh, ENGMASTER HUB còn mang đến cơ
                                        hội thử sức với các đề thi IELTS chính thống, giúp bạn làm quen với format thi, tích lũy kinh
                                        nghiệm và tự tin đạt chứng chỉ quốc tế mà không cần rời khỏi hệ thống của chúng tôi.
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
