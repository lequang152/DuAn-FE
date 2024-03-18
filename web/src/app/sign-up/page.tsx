import React from "react";
import SignUpMain from "../../components/SignUp/SignUpMain";
import HeaderFour from "../../components/Layout/Header/HeaderFour";
import FooterThree from "../../components/Layout/Footer/FooterThree";
const SignUp: React.FC = () => {
  return (
    <React.Fragment>
      <HeaderFour />
      <SignUpMain />
      <FooterThree />
    </React.Fragment>
  );
};

export default SignUp;
