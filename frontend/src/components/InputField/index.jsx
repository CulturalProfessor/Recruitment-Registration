import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export default function InputField() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState("");
  const [submitted, setSubmitted] = useState(false);
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
      const data = {
        Name: name,
        Roll: roll,
        Year: year,
        Email: email,
        Branch: branch,
        Phone: phone,
      };
      setForm(data);
      console.log(data);
      axios
        .post("/users", data)
        .then((res) => {
          console.log(res);
          setSubmitted(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Invalid Email or Phone Number");
    }
  }

  useEffect(() => {
    if (submitted) {
      alert("Form Submitted Successfully");
    }
  }, [submitted]);

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
