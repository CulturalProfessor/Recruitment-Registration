import React, { useState } from "react";
import "./style.css";

export default function InputField() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState("");
  function handleName(e) {
    setName(e.target.value);
  }
  function handleRoll(e) {
    setRoll(e.target.value);
  }
  function handleYear(e) {
    setYear(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleBranch(e) {
    setBranch(e.target.value);
  }
  function handlePhone(e) {
    setPhone(e.target.value);
  }
  function validateEmail(email) {
    const regex = /^[^\s@]+@akgec\.ac\.in$/;
    return regex.test(email);
  }

  function validatePhoneNumber(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  }

  function handleForm() {
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhoneNumber(phone);
    if (isEmailValid && isPhoneValid) {
      setForm({
        name: name,
        roll: roll,
        year: year,
        email: email,
        branch: branch,
        phone: phone,
      });
      console.log(form);
    } else {
      console.log("Invalid Email or Phone Number");
    }
  }

  return (
    <div className="form">
      <input type="text" placeholder="Name" onChange={(e) => handleName(e)} />
      <input
        type="number"
        placeholder="Roll No."
        onChange={(e) => handleRoll(e)}
      ></input>
      <input type="text" placeholder="Year" onChange={(e) => handleYear(e)} />
      <input
        type="email"
        placeholder="College Email Id"
        onChange={(e) => handleEmail(e)}
      />
      <input
        type="text"
        placeholder="Branch"
        onChange={(e) => handleBranch(e)}
      />
      <input
        type="number"
        placeholder="Phone Number"
        onChange={(e) => handlePhone(e)}
      />
      <button onClick={() => handleForm()}>Submit</button>
    </div>
  );
}
