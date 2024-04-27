import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import CryptoJS from "crypto-js";
import Select from "react-select"
import {MultiSelect} from "react-multi-select-component";
import ReCAPTCHA from "react-google-recaptcha";
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const secretKey = "6Lf1Ur0pAAAAAF9gQw61G-mip8z0vp4q0Gh80S_e";
const baseURL = "http://localhost:5000"
const origin = import.meta.env.VITE_ORIGIN;
axios.defaults.baseURL = baseURL;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// console.log(recaptchaSiteKey)
// console.log(baseURL)


export default function InputField() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // const [rateLimited, setRateLimited] = useState(false);
  const [interest,setInterest] = useState("")
  const [remainingRequests, setRemainingRequests] = useState(5);
  const [resetTime, setResetTime] = useState(Date.now());
  const [hostelOrDayScholar, setHostelOrDayScholar] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const reRecaptcha = useRef();
  const navigate = useNavigate();

  function validateName(name) {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(name)) {
      setName(name);
      return true;
    }
    return false;
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
    const regex = /^[a-zA-Z0-9\s()-]+$/;
    if (regex.test(branch)) {
      setBranch(branch);
      return true;
    }
    return false;
  }

  async function handleForm() {
    const token = "6Lf1Ur0pAAAAAF9gQw61G-mip8z0vp4q0Gh80S_e"
    // console.log(token)

    if (
      name === "" ||
      roll === "" ||
      email === "" ||
      branch === "" ||
      phone === "" ||
      hostelOrDayScholar === "" ||
      year === "" ||
      gender === ""
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
        Year: year,
        Phone: phone,
        Token: token,
      };
      setForm(data);
      console.log(data)
      console.log(secretKey)
      const dataToencrypt = data;
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(dataToencrypt),
        secretKey
      ).toString();

      axios
        .post("/users", { encryptedData })
        .then((res) => {
          setSubmitted(true);
          // reRecaptcha.current.reset();
          // navigate("/redirect");
        })
        .catch((err) => {
          if (err.response && err.response.status === 429) {
            const reset = err.response.headers["x-ratelimit-reset"];
            setSubmitted(false);
            alert("Too many requests; please wait a minute");
            reRecaptcha.current.reset();
            setRateLimited(true);
            setResetTime(reset * 1000);
          } else {
            // alert(err.response.data.message);
            setSubmitted(false);
            // reRecaptcha.current.reset();
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

  // useEffect(() => {
  //   let intervalId;
  //   // if (rateLimited) {
  //   //   intervalId = setInterval(() => {
  //   //     if (Date.now() >= resetTime) {
  //   //       setRemainingRequests(5);
  //   //       setRateLimited(false);
  //   //     } else {
  //   //       const remainingTime = Math.ceil((resetTime - Date.now()) / 1000);
  //   //       setRemainingRequests(0);
  //   //       setTimeout(() => {
  //   //         setRemainingRequests(5);
  //   //         setRateLimited(false);
  //   //       }, remainingTime * 1000);
  //   //     }
  //   //   }, 1000);
  //   // }

  //   return () => clearInterval(intervalId);
  // }, [rateLimited, resetTime]);

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

  const options = [
    {value:"Html,Css", label:"HTML & CSS"},
    {value:"javascript", label:"Javascript"},
    {value:"python", label:"Python"},
    {value:"c/c++", label:"C/C++"},
    {value:"flutter", label:"Flutter"},
    {value:"nodejs", label:"Node.js"},
    {value:"reactjs", label:"React.js"}
  ]

  const colorStyles ={
    control: (styles) =>({...styles,
      width: "150%"
    })
  }

  return (
    <div className="formFieldContainer">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => validateName(e.target.value)}
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
      {/* <FontAwesomeIcon icon="fa-duotone fa-user" /> */}
      <input
        type="text"
        placeholder="Branch"
        onChange={(e) => validateBranch(e.target.value)}
        value={branch}
        className="formField"
      />

      {/* <MultiSelect 
        options={options}
        value={interest}
        onChange={setInterest}
      /> */}

      <div className="checkbox">
      <div>
      Tech stack you are familiar with:
        <p>
      <input type="checkbox" />HTML & CSS
        </p>
        <p>
      <input type="checkbox" />Javascript
        </p>
        <p>
      <input type="checkbox" />C/C++
        </p>
        <p>
      <input type="checkbox" />Python
        </p>
        <p>
      <input type="checkbox" />Flutter
        </p>
        <p>
      <input type="checkbox" />React.js
        </p>
        <p>
      <input type="checkbox" />Node.js
        </p>
      </div>
      </div>

      {/* <Select
        // className="formFields selectFields"
        styles = { colorStyles }
        options={options}
        defaultValue={interest}
        placeholder="Familiar tech stack"
        isMulti
        onChange={setInterest}
        autosize={false}
      /> */}
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
        onChange={(e) => setYear(e.target.value)}
        value={year}
      >
        <option
          value=""
          disabled
          className="selectFieldOption"
          label="Year ?"
        ></option>
        <option value="second">II</option>
        <option value="third">III</option>
        <option value="fourth">IV</option>
      </select>
      <input
        type="number"
        placeholder="Phone Number(10 digits)"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className="formField"
      />
      {/* <ReCAPTCHA
        className="recaptcha"
        ref={reRecaptcha}
        size="invisible"
        sitekey={recaptchaSiteKey}
        type="image"
      /> */}
      <button onClick={() => handleForm()} className="registerButton">
        Register
      </button>
    </div>
  );
}
