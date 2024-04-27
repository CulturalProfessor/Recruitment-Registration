import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import CryptoJS from "crypto-js";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";
import ReCAPTCHA from "react-google-recaptcha";
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const secretKey = "6Lf1Ur0pAAAAAF9gQw61G-mip8z0vp4q0Gh80S_e"
const baseURL = "http://localhost:5000";
const origin = import.meta.env.VITE_ORIGIN;
axios.defaults.baseURL = baseURL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/fontawesome-free-solid";

export default function InputForm() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // const [rateLimited, setRateLimited] = useState(false);
  const [interest, setInterest] = useState([]);
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
    const token = "6Lf1Ur0pAAAAAF9gQw61G-mip8z0vp4q0Gh80S_e";

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
        Interest: interest,
      };
      setForm(data);
      console.log(data.Interest)
      // console.log(secretKey);
      const dataToencrypt = data;
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(dataToencrypt),
        secretKey
      ).toString();
      
      axios
      .post("/users", { encryptedData })
      .then((res) => {
          setSubmitted(true);
          console.log("post successful")
          // reRecaptcha.current.reset();
          navigate("/redirect");
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
            alert(err.response.data.message);
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
      setInterest("");
      setSubmitted(false);
    }
  }, [submitted]);

  const handlecheck = (e) => {
    const flag = e.target.checked;
    const value = e.target.value;
    if (flag) {
      setInterest([...interest, value]);
    }else{
      setInterest([...interest.filter(tech => tech!==value)])
    }
  };

  return (
    <section className="main">
      <h1 className="title">Enter the realm of Open Source</h1>
      <form action="#">
        {/* <div> */}
        <div>
          <div className="main-box">
            <div className="input-box">
              <span className="text">Full Name</span>
              <input
                type="text"
                placeholder="Please enter your name"
                onChange={(e) => validateName(e.target.value)}
                value={name}
                label="Name"
              />
            </div>

            <div className="input-box">
              <span className="text">Student Number</span>
              <input
                type="number"
                placeholder="Student Number"
                onChange={(e) => {
                  setRoll(e.target.value);
                }}
                value={roll}
              />
            </div>

            <div className="input-box">
              <span className="text">Branch</span>
              <input
                type="text"
                placeholder="Branch"
                onChange={(e) => validateBranch(e.target.value)}
                value={branch}
              />
            </div>

            <div className="input-box select-box">
              <span className="text">Year</span>

              <select
                onChange={(e) => setYear(e.target.value)}
                value={year}
                // id="select-box"
              >
                <option value="" disabled label="Year ?"></option>
                <option value="second">I</option>
                <option value="third">II</option>
              </select>
            </div>

            <div className="input-box">
              <span className="text">Email</span>
              <input
                type="email"
                placeholder="College Email Id"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="input-box">
              <span className="text">Phone Number</span>
              <input
                type="number"
                placeholder="Phone Number(10 digits)"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>

            <div className="input-box select-box">
              <span className="text">Hosteller or Day-Scholar</span>

              <select
                // id="select-box"
                onChange={(e) => setHostelOrDayScholar(e.target.value)}
                value={hostelOrDayScholar}
              >
                <option
                  value=""
                  disabled
                  label="Hostel or Day Scholar ?"
                ></option>
                <option value="Hostel">Hostel</option>
                <option value="Day Scholar">Day Scholar</option>
              </select>
            </div>

            <div className="input-box select-box">
              <span className="text">Gender</span>

              <select
                // id="select-box"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value="" disabled label="Gender ?"></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* </div> */}
          <div className="container">
            <input
              type="checkbox"
              name="gender"
              id="circle-1"
              value="HTML&CSS"
              onChange={handlecheck}
            />
            <input
              type="checkbox"
              name="gender"
              id="circle-2"
              value="Javascript"
              onChange={handlecheck}
            />
            <input
              type="checkbox"
              name="gender"
              id="circle-3"
              value="C/C++"
              onChange={handlecheck}
            />
            <input
              type="checkbox"
              name="gender"
              id="circle-4"
              value="Python"
              onChange={handlecheck}
            />
            <input
              type="checkbox"
              name="gender"
              id="circle-5"
              value="Flutter"
              onChange={handlecheck}
            />
            <input
              type="checkbox"
              name="gender"
              id="circle-6"
              value="React.js"
              onChange={handlecheck}
            />
            <input
              type="checkbox"
              name="gender"
              id="circle-7"
              value="Node.js"
              onChange={handlecheck}
            />
            <span className="gender">Tech stack you are familiar with</span>
            <div className="category">
              <div className="tech">
                <label htmlFor="circle-1">
                  <span className="circle one"></span>
                  <span className="male">HTML,CSS&Javascript</span>
                </label>
              </div>
              <div className="tech">
                <label htmlFor="circle-3">
                  <span className="circle three"></span>
                  <span className="male">C/C++</span>
                </label>
              </div>
              <div className="tech">
                <label htmlFor="circle-4">
                  <span className="circle four"></span>
                  <span className="male">Python</span>
                </label>
              </div>
              <div className="tech">
                <label htmlFor="circle-5">
                  <span className="circle five"></span>
                  <span className="male">Flutter</span>
                </label>
              </div>
              <div className="tech">
                <label htmlFor="circle-6">
                  <span className="circle six"></span>
                  <span className="male">React.js</span>
                </label>
              </div>
              <div className="tech">
                <label htmlFor="circle-7">
                  <span className="circle seven"></span>
                  <span className="male">Node.js</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="btn">
          <input type="submit" value="Register" onClick={() => handleForm()} />
        </div>
      </form>
    </section>
  );
}
