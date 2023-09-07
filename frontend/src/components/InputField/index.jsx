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
  const [rateLimited, setRateLimited] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(5);
  const [resetTime, setResetTime] = useState(Date.now());

  function validateName(name) {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(name)) {
      setName(name);
      return true;
    }
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
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhoneNumber(phone);

    if (isEmailValid && isPhoneValid && isNameValid) {
      const data = {
        Name: name,
        Roll: roll,
        Year: year,
        Email: email,
        Branch: branch,
        Phone: phone,
      };
      setForm(data);
      axios
        .post("/users", data)
        .then((res) => {
          console.log(res);
          setSubmitted(true);
        })
        .catch((err) => {
          if (err.response && err.response.status === 429) {
            const reset = err.response.headers["x-ratelimit-reset"];
            setRateLimited(true);
            setResetTime(reset * 1000);
          } else {
            alert("Registration Failed");
            setSubmitted(false);
            console.log(err);
          }
        });
    } else {
      if (!isNameValid) {
        console.log("Invalid Name");
      }
      if (!isEmailValid) {
        console.log("Invalid Email");
      }
      if (!isPhoneValid) {
        console.log("Invalid Phone Number");
      }
    }
  }

  useEffect(() => {
    let intervalId;
    if (rateLimited) {
      intervalId = setInterval(() => {
        if (Date.now() >= resetTime) {
          setRemainingRequests(5);
          setRateLimited(false);
        } else {
          const remainingTime = Math.ceil((resetTime - Date.now()) / 1000);
          setRemainingRequests(0);
          setTimeout(() => {
            setRemainingRequests(5);
            setRateLimited(false);
          }, remainingTime * 1000);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [rateLimited, resetTime]);

  useEffect(() => {
    if (submitted) {
      alert("Form Submitted Successfully");
      setName("");
      setRoll("");
      setYear("");
      setEmail("");
      setBranch("");
      setPhone("");
      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <div className="formFieldContainer">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="formField"
      />
      <input
        type="text"
        placeholder="Roll No."
        onChange={(e) => setRoll(e.target.value)}
        value={roll}
        className="formField"
      ></input>
      <input
        type="text"
        placeholder="Year"
        onChange={(e) => setYear(e.target.value)}
        value={year}
        className="formField"
      />
      <input
        type="email"
        placeholder="College Email Id"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="formField"
      />
      <input
        type="text"
        placeholder="Branch"
        onChange={(e) => setBranch(e.target.value)}
        value={branch}
        className="formField"
      />
      <input
        type="number"
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className="formField"
      />
      <button onClick={() => handleForm()} className="registerButton">Register</button>
    </div>
  );
}
