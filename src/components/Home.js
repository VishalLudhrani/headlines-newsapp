import React from "react";
import Hero from "./Hero";

const Home = (props) => {
  return(
    <div className="App">
      <Hero signUpFunc={props.signUpFunc} />
    </div>
  )
}

export default Home;