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
                <Image
                    width={500}
                    height={500}
                    className="events-1-shape"
                    src="/assets/img/events/events-shape.png"
                    alt="img not found"
                />
            </div>
            <div className="container events__carousel">
                <div className="events__carousel-content">
                    <span className="events__carousel-description sm:text-center  lg:text-left">
                        Trung tâm ngoại ngữ
                    </span>

                    <Link
                        href="/"
                        className="events__carousel-logo pb-5 pr-5 mt-10"
                    >
                        <Image
                            width={500}
                            height={500}
                            src="/assets/img/logo/odin-logo-login.png"
                            alt="img not found"
                        />
                    </Link>
                    <div className="events__carousel-text mt-12 text-justify">
                        <span>
                            Odin Language Academy vô cùng tự hào về sản phẩm BBST (công nghệ Anh văn siêu tốc) được ứng
                            dụng và triển khai trên cộng đồng, đó cũng là mong muốn mà chúng tôi muốn hàng triệu người
                            Việt trên toàn quốc được làm quen, hội nhập với những phương pháp, công nghệ mà do người
                            Việt tạo ra cho người Việt sử dụng.
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
                            {/* <ExampleCarouselImage text="First slide" /> */}
                            <Image
                                width={500}
                                height={500}
                                src="/assets/img/carousel/hoc-vien-odin-1024x576.jpg"
                                priority
                                alt={""}
                            />
                        </Carousel.Item>

                        <Carousel.Item className="w-full">
                            {/* <ExampleCarouselImage text="Third slide" /> */}
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
