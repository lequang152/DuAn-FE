"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Carousel } from "react-bootstrap"

const CarouselTab = () => {
    const [index, setIndex] = useState(0)
    const handleSelect = (selectedIndex: any) => {
        setIndex(selectedIndex)
    }
    return (
        <section className="events__area pt-50 pb-50 mb-50 p-relative">
            <div className="events__shape">
                {/* <Image
                    width={500}
                    height={500}
                    className="events-1-shape"
                    src="/assets/img/events/events-shape.png"
                    alt="img not found"
                /> */}
            </div>
            <div className="container events__carousel">
                <div className="events__carousel-content">
                    {/* <span className="events__carousel-description sm:text-center  lg:text-left">
                        Website thi thử tiếng anh
                    </span>
                    <hr></hr> */}
                    {/* <Link
                        href="/"
                        className="events__carousel-logo pb-5 pr-5 mt-10"
                    >
                        <Image
                            width={500}
                            height={500}
                            src="/assets/img/logo/odin-logo-login.png"
                            alt="img not found"
                        />
                    </Link> */}
                    <div className="events__carousel-text text-justify">
                        <span>
                            EngMaster Hub tự hào là nền tảng chuyên cung cấp các bài thi thử tiếng Anh tiêu chuẩn, phục vụ nhu cầu luyện thi và nâng cao kỹ năng ngôn ngữ cho cộng đồng. Sản phẩm của chúng tôi, được phát triển bởi người Việt, cho phép người học trải nghiệm và thực hành qua các phương pháp đào tạo hiện đại, tiên tiến, hỗ trợ họ hội nhập và thành công trên bình diện quốc tế với trình độ tiếng Anh chắc chắn.
                        </span>
                    </div>
                    <Link
                        href=""
                        className="e-btn mt-10"
                    >
                        Tìm hiểu thêm
                    </Link>
                </div>
                <div className="events__carousel-items">
                    <Carousel
                        activeIndex={index}
                        onSelect={handleSelect}
                    >
                        <Carousel.Item className="w-full">
                            <Image
                                width={500}
                                height={500}
                                src="/assets/img/carousel/hoc-vien-odin-1024x576.jpg"
                                priority
                                alt={""}
                            />
                        </Carousel.Item>
                        <Carousel.Item className="w-full">
                            <Image
                                width={500}
                                height={500}
                                src="/assets/img/carousel/odin-new-bbst-header-banner-1024x538.jpg"
                                alt={""}
                                priority
                            />
                        </Carousel.Item>
                        <Carousel.Item className="w-full">
                            <Image
                                width={500}
                                height={500}
                                src="/assets/img/carousel/odin-tuyen-dung-cong-tac-vien-1024x576.jpg"
                                alt={""}
                                priority
                            />
                        </Carousel.Item>
                        <Carousel.Item className="w-full">
                            <Image
                                width={500}
                                height={500}
                                src="/assets/img/carousel/trung-tam-tieng-anh-odin-1024x576.jpg"
                                alt={""}
                                priority
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </section>
    )
}

export default CarouselTab
