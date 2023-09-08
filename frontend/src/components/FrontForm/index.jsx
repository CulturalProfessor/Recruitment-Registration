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
            <h2>15th September</h2>
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
            src="../public/linux.png"
            className="softwareImageElement scale-in-center"
          />
          <img
            src="../public/docker.png"
            className="softwareImageElement scale-in-center"
          />
          <img
            src="../public/github.png"
            className="softwareImageElement scale-in-center"
          />
          <img
            src="../public/kubernetes.png"
            className="softwareImageElement  scale-in-center"
          />
          <img
            src="../public/chromium.png"
            className="softwareImageElement scale-in-center"
          />
          <img
            src="../public/postgresql.png"
            className="softwareImageElement scale-in-center "
          />
          <img
            src="../public/flutter.png"
            className="softwareImageElement scale-in-center"
          />
        </div>
        <div className="kidsContainer">
          <img src="../public/kids.svg" alt="" id="kidsImage" />
          <InputField />
        </div>
      </div>
    </div>
  );
}
