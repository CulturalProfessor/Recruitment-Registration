import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import CryptoJS from "crypto-js";
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const secretKey = import.meta.env.VITE_SECRET_KEY;
const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

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
  const [gender, setGender] = useState("");
  const [domain, setDomain] = useState("");
  const reRecaptcha = useRef();
  const navigate = useNavigate();

  function validateName(name) {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(name)) {
      setName(name);
      return true;
    }
  }

  function validateRoll(roll) {
    const regex = /^[0-9]*$/;
    return regex.test(roll);
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

  async function handleForm() {
    const token = await reRecaptcha.current.executeAsync();
    axios
      .post("/recaptcha", { token })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("Recaptcha Failed , Please Try Again");
          setSubmitted(false);
          reRecaptcha.current.reset();
          return;
        }
        console.log(err);
      });

    if (
      name == "" ||
      roll == "" ||
      email == "" ||
      branch == "" ||
      phone == "" ||
      hostelOrDayScholar == "" ||
      domain == "" ||
      gender == ""
    ) {
      alert("Please fill all the fields");
      return;
    }

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
      let UpperCaseBranch = branch.toUpperCase();
      const data = {
        Name: name,
        Gender: gender,
        Branch: UpperCaseBranch,
        Roll: roll,
        Email: email,
        Hostel: hostelOrDayScholar,
        Domain: domain,
        Phone: phone,
      };
      setForm(data);
      const dataToencrypt = data;
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(dataToencrypt),
        secretKey
      ).toString();

      axios
        .post("/users", { encryptedData })
        .then((res) => {
          setSubmitted(true);
          navigate("/redirect");
        })
        .catch((err) => {
          if (err.response && err.response.status === 429) {
            const reset = err.response.headers["x-ratelimit-reset"];
            setRateLimited(true);
            setResetTime(reset * 1000);
          } else if (err.response && err.response.status === 409) {
            alert("User Already Registered");
            setSubmitted(false);
          } else {
            alert("Please Verify Your Details");
            setSubmitted(false);
            console.log(err.response);
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
      setGender("");
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
        label="Name"
      />
      <select
        className="formField selectField"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      >
        <option
          value=""
          disabled
          className="selectFieldOption"
          label="Gender ?"
        ></option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
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
        className="formField selectField"
        onChange={(e) => setHostelOrDayScholar(e.target.value)}
        value={hostelOrDayScholar}
      >
        <option
          value=""
          disabled
          className="selectFieldOption"
          label="Hostel or Day Scholar ?"
        ></option>
        <option value="Hostel">Hostel</option>
        <option value="Day Scholar">Day Scholar</option>
      </select>
      <select
        className="formField selectField"
        onChange={(e) => setDomain(e.target.value)}
        value={domain}
      >
        <option
          value=""
          disabled
          className="selectFieldOption"
          label="Domain ?"
        ></option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
      </select>
      <input
        type="number"
        placeholder="Phone Number(10 digits)"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className="formField"
      />
      <ReCAPTCHA
        className="recaptcha"
        ref={reRecaptcha}
        size="invisible"
        sitekey={recaptchaSiteKey}
        type="image"
      />
      <button onClick={() => handleForm()} className="registerButton">
        Register
      </button>
    </div>
  );
}
