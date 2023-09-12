import React from "react";
import InputField from "../InputField";
import "./style.css";

export default function FrontForm() {
  return (
    <div class="formbody">
      <div className="formHeading">
        <img src="../osslogo.png" className="logo" alt="logo" />
        <h1 className="formHeadingElement">Team OSS </h1>
      </div>
      <h2 className="formHeadingElement">Presents</h2>
      <h1 className="formHeadingElement tracking-in-expand ">Recruitment'23</h1>
      <div className="eventDetailsContainer">
        <div className="eventDetails">
          <li>
            <h2>20th September</h2>
          </li>
          <li>
            <h2>4:00 PM - 7:00 PM</h2>
          </li>
        </div>
        <li>
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
        <div className="kidsContainer">
          <img src="/kids.svg" alt="" id="kidsImage" />
          <InputField />
        </div>
      </div>
    </div>
  );
}
