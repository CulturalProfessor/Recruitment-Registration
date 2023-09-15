import React from "react";
import InputField from "../InputField";
import "./style.css";

export default function FrontForm() {
  return (
    <div className="formbody">
      <div className="formHeading">
        <img src="../osslogo.png" className="logo" alt="logo" />
        <h1 className="formHeadingElement">Team OSS </h1>
      </div>
      <h2 className="formHeadingElement">Presents</h2>
      <h1 className="formHeadingElement tracking-in-expand ">Recruitment'23</h1>
      <div className="eventDetailsContainer">
        <div className="eventDetails">
          <li className="list">
            <h2>20th September</h2>
          </li>
          <li className="list">
            <h2>4:00 PM - 7:00 PM</h2>
          </li>
        </div>
        <li className="list">
          <h2>4th Floor CS/IT Block</h2>
        </li>
        <div className="softwareImages">
          <img
            src="/linux.png"
            className="softwareImageElement scale-in-center"
          />
          <img
            src="/docker.png"
            className="softwareImageElement scale-in-center"
          />
          <img
            src="/github.png"
            className="softwareImageElement scale-in-center"
          />
          <img
            src="/kubernetes.png"
            className="softwareImageElement  scale-in-center"
          />
          <img
            src="/chromium.png"
            className="softwareImageElement scale-in-center"
          />
          <img
            src="/postgresql.png"
            className="softwareImageElement scale-in-center "
          />
          <img
            src="/flutter.png"
            className="softwareImageElement scale-in-center"
          />
        </div>
        <h3 className="notice">Please register yourself on HackerRank & Unstop with College Mail ID before test</h3>

        <div className="kidsContainer">
          <img src="/kids.svg" alt="" id="kidsImage" />
          <InputField />
        </div>
      </div>
    </div>
  );
}
