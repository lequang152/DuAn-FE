import Image from "next/image"
import React from "react"

const ShapeBackground = () => (
    <div className="hero__shape">
        <Image
            className="hero-1-circle -z-10"
            src="/assets/img/shape/hero/hero-1-circle.png"
            alt="img not found"
            width={500}
            height={500}
            style={{ width: "5%", height: "auto" }}
        />
        <Image
            className="hero-1-circle-2"
            src="/assets/img/shape/hero/hero-1-circle-2.png"
            alt="img not found"
            width={500}
            height={500}
            style={{ width: "4%", height: "auto" }}
        />
        <Image
            className="hero-1-dot-2"
            src="/assets/img/shape/hero/hero-1-dot-2.png"
            alt="img not found"
            width={500}
            height={500}
            style={{ width: "4%", height: "auto" }}
        />
    </div>
)

export default ShapeBackground
