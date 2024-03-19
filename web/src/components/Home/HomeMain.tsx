import React, { useEffect, useState } from "react"
import Hero from "./HeroSection"

import CarouselTab from "./CarouselSection"
import Cta from "./CtaSection"
import ButtonToTop from "../Elements/ButtonToTop/ButtonToTop"

const HomeMain: React.FC = () => {
    return (
        <main>
            {/* hero-start */}
            <Hero />
            {/* hero-end */}

            {/* Carousel-start */}
            <CarouselTab />
            {/* Carousel-end */}

            {/* cta-start */}
            <Cta />
            {/* cta-end */}

            <ButtonToTop/>
        </main>
    )
}

export default HomeMain
