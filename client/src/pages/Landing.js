import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import Wrapper from '../assets/wrappers/LandingPage';


const Landing = () => {
  return (
    <>
      <Wrapper>
        <nav>
          <img src={logo} alt="jobify" className="logo" />
        </nav>

        <div className="container page">
          <div className="info">
            <h1>
              Job <span> tracking</span> App
            </h1>
          
          <p>
            I'm baby thundercats tumblr truffaut +1 roof party lo-fi. Artisan
            blog fashion axe, messenger bag swag selvage yuccie pour-over
            raclette.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
            <img src={main} className="img main-img" alt="job hunt"/>

        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
