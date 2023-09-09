import React from "react";
import "./style.css";

export default function Redirect() {
  return (
    <div className="redirectContainer">
      <h1>You have successfully registered</h1>
      <h1>Welcome Aboard</h1>
      <img src="../public/success.svg" id="redirectImage" />
    </div>
  );
}
