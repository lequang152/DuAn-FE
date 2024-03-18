import React from "react"
import FooterThree from "../../components/Layout/Footer/FooterThree"
import HeaderFour from "../../components/Layout/Header/HeaderFour"
import SignInMain from "../../components/SignIn/SignInMain"
import Spinner from "../../components/Elements/Spinner/Spinner"

const SignIn: React.FC = () => {
      return (
        <React.Fragment>
            <HeaderFour />
            {/* <Spinner/> */}
            <SignInMain />
            <FooterThree />
        </React.Fragment>
    )
}

export default SignIn
