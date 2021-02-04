import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import pearls from "./images/pearls.jpg";
import gardening from "./images/gardening.jpg";
import watering from "./images/watering.jpg";
import watering2 from "./images/watering2.jpg";
import logo from "./images/logo.png";
import { TweenMax, Power3 } from "gsap";
import "bootstrap/dist/css/bootstrap.css";

const Homepage = () => {
  const history = useHistory();

  let logoIcon = useRef(null);
  let tagLine = useRef(null);
  //console.log(logoIcon);

  useEffect(() => {
    //console.log(logoIcon)
    TweenMax.from(
      logoIcon, //item
      3, // duration
      {
        //gsap options
        opacity: 0,
        y: -200,
        ease: Power3.easeInOut,
      }
    );
  }, []);

  useEffect(() => {
    TweenMax.from(tagLine, 3, {
      opacity: 0,
      y: -600,
      ease: Power3.easeInOut,
    });
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="title d-flex flex-column justify-content-start align-items-center">
        <img
          ref={(element) => {
            logoIcon = element;
          }}
          src={logo}
          alt="logo"
          className="logo-sizer"
        ></img>
        <h5
          ref={(element) => {
            tagLine = element;
          }}
          style={{
            fontSize: "1rem",
            marginBottom: "5rem",
            marginTop: "-2rem",
            textAlign: "center",
          }}
        >
          Your Personal Plant Watering Reminder Tool
        </h5>
      </div>
      <div className="spacer-vh50"></div>
      <div className="content-two d-flex flex-column justify-content-around align-items-center">
        <h3 style={{ margin: "3rem auto", textAlign: "center" }}>
          Welcome To Water My Plants
        </h3>

        <img
          src={gardening}
          className="gardening-sizer"
          alt="child gardening"
        />

        <p style={{ textAlign: "justify" }}>
          <strong>Water My Plants </strong>
          is a free app that reminds to you water your plants no matter how big
          or how small. Whether you frequently forget to water your plants and
          precious flowers at your home/ office or you would like to set
          watering cycles for your landscaping management, Water My Plants is
          the tool that will help to save many lives.{" "}
        </p>
      </div>
      <div className="spacer-vh50"></div>
      <div className="content-flex">
        <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          What is Water My Plants
        </h3>
        <p style={{ textAlign: "justify" }}>
          Water My Plants is a free app that reminds to you water your plants no
          matter how big or how small. Whether you frequently forget to water
          your plants and precious flowers at your home/ office or you would
          like to set watering cycles for your landscaping management, Water My
          Plants is the tool that will help to save many lives.{" "}
        </p>
        <img src={pearls} className="pearl-sizer" alt="dragon's pearls" />
      </div>
      <div className="spacer-vh50"></div>
      <div className="content-two d-flex flex-column justify-content-center align-items-center">
        <h3 style={{ padding: "3rem 0" }}>How Do I Use It?</h3>
        <p style={{ padding: "3rem auto" }}>
          After setting up your account simply head to your dashboard and begin
          there! Setting up a new plant to be watered is accomplished in a few
          easy steps.
        </p>
        <br />
        <ul>
          <li>Pick a plant to be watered</li>
          <li>Add a nickname for your plant..</li>
          <li>Next, enter a species</li>
          <li>
            Then, pick a watering cycle appropriate for nourishing your plant -
            every other day as an example
          </li>
          <li>Finally, add a picture of your plant</li>
          <p>
            That's it! Simply and easily you have just taken your first steps
            towards total plant care management and happier healthier plants and
            flowers.
          </p>
        </ul>
        <img
          src={watering}
          className="watering-sizer"
          alt="watering the garden"
        />
        <h4 style={{ padding: "3rem", textAlign: "center" }}>
          Begin your journey towards ensuring that all of your plants get the
          nourishment that they deserve. Sign up today and see the difference
          away. Your plants will thank you.
        </h4>
      </div>
      <div className="spacer-vh50"></div>
      <div className="content-two d-flex flex-row justify-content-around align-items-center">
        <img src={watering2} className="happy-sizer" alt="happy gardener" />
      </div>
      <button
        className="btn btn-three"
        style={{ margin: "5rem auto" }}
        variant="contained"
        onClick={() => history.push("/dashboard")}
      >
        Sign in/ Sign up
      </button>
    </div>
  );
};

export default Homepage;
