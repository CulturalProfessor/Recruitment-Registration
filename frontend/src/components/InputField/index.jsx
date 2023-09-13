import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";

axios.defaults.baseURL = "https://recruitment-registration-backend.onrender.com";

export default function InputField() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(5);
  const [resetTime, setResetTime] = useState(Date.now());
  const [hostelOrDayScholar, setHostelOrDayScholar] = useState("");
  const navigate = useNavigate();

  function validateName(name) {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(name)) {
      setName(name);
      return true;
    }
  }

  function validateRoll(roll) {
    const regex = /^[0-9]{1,10}$/;
    if (regex.test(roll)) {
      setRoll(roll);
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
  function validateBranch(branch) {
    const regex = /^[a-zA-Z0-9\s-]+$/;
    if (regex.test(branch)) {
      setBranch(branch);
      return true;
    }
  }

  function handleForm() {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhoneNumber(phone);
    const isRollValid = validateRoll(roll);
    const isBranchValid = validateBranch(branch);

    if (
      isEmailValid &&
      isPhoneValid &&
      isNameValid &&
      isRollValid &&
      isBranchValid
    ) {
      const data = {
        Name: name,
        Branch: branch,
        Roll: roll,
        Email: email,
        Hostel: hostelOrDayScholar,
        Phone: phone,
      };
      setForm(data);
      axios
        .post("/users", data)
        .then((res) => {
          setSubmitted(true);
          navigate("/redirect");
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
        alert("Invalid Name");
      } else if (!isRollValid) {
        console.log("Invalid Roll", isRollValid);
        alert("Invalid Student Number");
      } else if (!isEmailValid) {
        console.log("Invalid Email");
        alert("Invalid Email");
      } else if (!isBranchValid) {
        console.log("Invalid Branch");
        alert("Invalid Branch");
      } else if (!isPhoneValid) {
        console.log("Invalid Phone Number");
        alert("Invalid Phone Number");
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
      setName("");
      setRoll("");
      setEmail("");
      setBranch("");
      setPhone("");
      setHostelOrDayScholar("");
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
        type="number"
        placeholder="Student Number"
        onChange={(e) => {
          setRoll(e.target.value);
        }}
        value={roll}
        className="formField"
      ></input>
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
      <select
        className="formField hostelOrDayScholar"
        onChange={(e) => setHostelOrDayScholar(e.target.value)}
        value={hostelOrDayScholar}
      >
        <option
          value=""
          disabled
          selected
          className="hostelOption"
          label="Hostel or Day Scholar"
        ></option>
        <option value="Hostel">Hostel</option>
        <option value="Day Scholar">Day Scholar</option>
      </select>
      <input
        type="number"
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className="formField"
      />
      <button onClick={() => handleForm()} className="registerButton">
        Register
      </button>
    </div>
  );
}
