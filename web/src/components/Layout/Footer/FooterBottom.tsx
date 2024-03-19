import React from "react"
import Link from "next/link"

const FooterBottom = () => {
    return (
        <div className="footer__bottom">
            <div className="container">
                <div className="row">
                    <div className="col-xxl-12">
                        <div className="footer__copyright text-center">
                            <p>
                                © 2024 EngMaster Hub, All Rights Reserved. Design By <Link href="/">Hub team</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterBottom
