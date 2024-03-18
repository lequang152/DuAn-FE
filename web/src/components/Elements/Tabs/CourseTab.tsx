"use client"
import Image from "next/image"
import Link from "next/link"
import { Tabs } from "react-tabs"
import "react-tabs/style/react-tabs.css"

const CourseTab = () => {
    return (
        <section
            className="course__area py-28"
            style={{
                backgroundImage: 'url("/assets/img/course/background-texture-hero.jpg")',
            }}
        >
            <Tabs>
                <div className="container">
                    {/* <TabPanel> */}
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mb-6">
                            <div className="course__item white-bg mb-30 fix">
                                <div className="course__thumb w-img p-relative fix">
                                    <Link href="">
                                        <Image
                                            width={500}
                                            height={500}
                                            src="/assets/img/course/course-1.jpg"
                                            alt="img not found"
                                        />
                                    </Link>
                                </div>
                                <div className="course__content">
                                    <div className="course__meta d-flex align-items-center justify-content-between">
                                        <div className="course__lesson">
                                            <span>
                                                <i className="fas fa-book"></i>43 Lesson
                                            </span>
                                        </div>
                                        {/* <div className="course__rating">
                                            <span>
                                                <i className="fas fa-star"></i>4.5 (44)
                                            </span>
                                        </div> */}
                                    </div>
                                    <h3 className="course__title">
                                        <Link href="https://odinlanguage.edu.vn/khoa-hoc-new-bbst/">
                                            KHÓA HỌC <span className="text-green-1">BBST 01</span>
                                        </Link>
                                    </h3>
                                    {/* <div className="course__teacher d-flex align-items-center">
                                        <div className="course__teacher-thumb mr-15">
                                            <Image
                                                width={500}
                                                height={500}
                                                src="/assets/img/course/teacher/teacher-1.jpg"
                                                alt="img not found"
                                            />
                                        </div>
                                        <h6>
                                            <Link href="">Jim Séchen</Link>
                                        </h6>
                                    </div> */}
                                </div>
                                <div className="course__more d-flex justify-content-between align-items-center">
                                    {/* <div className="course__status">
                                        <span>Free</span>
                                    </div> */}
                                    <div className="course__btn">
                                        <Link
                                            href=""
                                            className="link-btn"
                                        >
                                            Know Details
                                            <i className="fas fa-arrow-right"></i>
                                            <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mb-6">
                            <div className="course__item white-bg mb-30 fix">
                                <div className="course__thumb w-img p-relative fix">
                                    <Link href="">
                                        <Image
                                            width={500}
                                            height={500}
                                            src="/assets/img/course/course-2.jpg"
                                            alt="img not found"
                                        />
                                    </Link>
                                </div>
                                <div className="course__content">
                                    <div className="course__meta d-flex align-items-center justify-content-between">
                                        <div className="course__lesson">
                                            <span>
                                                <i className="fas fa-book"></i>15 Lesson
                                            </span>
                                        </div>
                                        {/* <div className="course__rating">
                                            <span>
                                                <i className="fas fa-star"></i>4.5 (44)
                                            </span>
                                        </div> */}
                                    </div>
                                    <h3 className="course__title">
                                        <Link href="https://odinlanguage.edu.vn/khoa-hoc-bbst-02/">
                                            KHÓA HỌC <span className="text-green-1">BBST 02</span>
                                        </Link>
                                    </h3>
                                    {/* <div className="course__teacher d-flex align-items-center">
                                        <div className="course__teacher-thumb mr-15">
                                            <Image
                                                width={500}
                                                height={500}
                                                src="/assets/img/course/teacher/teacher-2.jpg"
                                                alt="img not found"
                                            />
                                        </div>
                                        <h6>
                                            <Link href="">Barry Tone</Link>
                                        </h6>
                                    </div> */}
                                </div>
                                <div className="course__more d-flex justify-content-between align-items-center">
                                    {/* <div className="course__status d-flex align-items-center">
                                        <span className="sky-blue">$32.00</span>
                                        <span className="old-price">$68.00</span>
                                    </div> */}
                                    <div className="course__btn">
                                        <Link
                                            href=""
                                            className="link-btn"
                                        >
                                            Know Details
                                            <i className="fas fa-arrow-right"></i>
                                            <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mb-6">
                            <div className="course__item white-bg mb-30 fix">
                                <div className="course__thumb w-img p-relative fix">
                                    <Link href="">
                                        <Image
                                            width={500}
                                            height={500}
                                            src="/assets/img/course/course-3.jpg"
                                            alt="img not found"
                                        />
                                    </Link>
                                </div>
                                <div className="course__content">
                                    <div className="course__meta d-flex align-items-center justify-content-between">
                                        <div className="course__lesson">
                                            <span>
                                                <i className="fas fa-book"></i>25 Lesson
                                            </span>
                                        </div>
                                        {/* <div className="course__rating">
                                            <span>
                                                <i className="fas fa-star"></i>3.5 (55)
                                            </span>
                                        </div> */}
                                    </div>
                                    <h3 className="course__title">
                                        <Link href="https://odinlanguage.edu.vn/khoa-hoc-ielts/">
                                            KHÓA HỌC CHINH PHỤC <span className="text-green-1">IELTS</span>
                                        </Link>
                                    </h3>
                                    {/* <div className="course__teacher d-flex align-items-center">
                                        <div className="course__teacher-thumb mr-15">
                                            <Image
                                                width={500}
                                                height={500}
                                                src="/assets/img/course/teacher/teacher-3.jpg"
                                                alt="img not found"
                                            />
                                        </div>
                                        <h6>
                                            <Link href="">Elon Gated</Link>
                                        </h6>
                                    </div> */}
                                </div>
                                <div className="course__more d-flex justify-content-between align-items-center">
                                    {/* <div className="course__status d-flex align-items-center">
                                        <span className="green">$46.00</span>
                                        <span className="old-price">$68.00</span>
                                    </div> */}
                                    <div className="course__btn">
                                        <Link
                                            href=""
                                            className="link-btn"
                                        >
                                            Know Details
                                            <i className="fas fa-arrow-right"></i>
                                            <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <div className="course__item white-bg mb-30 fix">
                <div className="course__thumb w-img p-relative fix">
                  <Link href="">
                    <Image
                    width={500}
                    height={500}
                      src="/assets/img/course/course-3.jpg"
                      alt="img not found"
                    />
                  </Link>
                </div>
                <div className="course__content">
                  <div className="course__meta d-flex align-items-center justify-content-between">
                    <div className="course__lesson">
                      <span>
                        <i className="fas fa-book"></i>14 Lesson
                      </span>
                    </div>
                    <div className="course__rating">
                      <span>
                        <i className="fas fa-star"></i>3.5 (55)
                      </span>
                    </div>
                  </div>
                  <h3 className="course__title">
                    <Link href="">
                      Strategy law and organization Foundation
                    </Link>
                  </h3>
                  <div className="course__teacher d-flex align-items-center">
                    <div className="course__teacher-thumb mr-15">
                      <Image
                      width={500}
                      height={500}
                        src="/assets/img/course/teacher/teacher-3.jpg"
                        alt="img not found"
                      />
                    </div>
                    <h6>
                      <Link href="">Elon Gated</Link>
                    </h6>
                  </div>
                </div>
                <div className="course__more d-flex justify-content-between align-items-center">
                  <div className="course__status d-flex align-items-center">
                    <span className="green">$46.00</span>
                    <span className="old-price">$68.00</span>
                  </div>
                  <div className="course__btn">
                    <Link href="" className="link-btn">
                      Know Details
                      <i className="fas fa-arrow-right"></i>
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
                    </div>
                </div>
            </Tabs>
        </section>
    )
}

export default CourseTab
