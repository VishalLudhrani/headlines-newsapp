import React from "react";
import Hero from "./Hero";

const LandingPage = (props) => {
  return(
    <div className="App">
      <Hero signUpFunc={props.signUpFunc} heroBoxMargin={props.heroBoxMargin} headingVariant={props.headingVariant} />
    </div>
  )
}

export default LandingPage;