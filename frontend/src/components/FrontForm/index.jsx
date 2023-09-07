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
      <div className="kidsContainer">
        <img src="../public/kids.svg" alt="" id="kidsImage" />
        <InputField />
      </div>
    </div>
  );
}
