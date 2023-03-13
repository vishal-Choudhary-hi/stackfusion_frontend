import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./InputForm.css";
import Allform from "./AllForms";
import baseUrl from "../baseUrl";
const validDob = (dob) => {
  if (dob.length === 0) return false;
  var today = new Date();
  var birthDate = new Date(dob);
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m === 0 && today.getDate() < birthDate.getDate()) {
    age_now--;
  }
  if (age_now >= 18) return true;
  return false;
};
const checkToProceed = (nameError, emailError, dobError) => {
  if (
    nameError.length === 0 &&
    emailError.length === 0 &&
    dobError.length === 0
  ) {
    return true;
  }
  return false;
};
function InpurForm() {
  const firstRenderName = useRef(true);
  const firstRenderEmail = useRef(true);
  const firstRenderDob = useRef(true);
  const [formSuccess, setFormSuccess] = useState(true);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  useEffect(() => {
    if (name.trim() === "" && !firstRenderName.current) {
      setNameError("Please fill a valid name");
    } else {
      setNameError("");
    }
    firstRenderName.current = false;
  }, [name]);
  useEffect(() => {
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validEmail) === null && !firstRenderEmail.current) {
      setEmailError("Please fill a valid email");
    } else {
      setEmailError("");
    }
    firstRenderEmail.current = false;
  }, [email]);
  useEffect(() => {
    if (validDob(dob) === false && !firstRenderDob.current) {
      setDobError("Age should be valid and greater than 18");
    } else {
      setDobError("");
    }
    firstRenderDob.current = false;
  }, [dob]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError("Please enter name");
      return;
    }
    if (dob === "") {
      setDobError("Please enter date of birth");
      return;
    }
    if (email === "") {
      setEmailError("Please enter email");
      return;
    }
    if (checkToProceed(nameError, emailError, dobError) === true) {
      let data = {
        name: name,
        email: email,
        number: number,
        dob: dob,
      };
      let response;
      try {
        response = await axios.post(`${baseUrl}userForm/post`, data);
      } catch (error) {
        console.log(error.message);
      }
      if (response.status === 203) {
        setNumberError("Please fill a valid number");
      } else {
        setFormSuccess(true);
        setDobError("");
        setEmailError("");
        setNameError("");
        setNumberError("");
        setDob("");
        setEmail("");
        setName("");
        setNumber("");
        firstRenderDob.current = true;
        firstRenderName.current = true;
        firstRenderEmail.current = true;
      }
    }
  };
  return (
    <>
      {!formSuccess ? (
        <>
          <div className="errordiv">
            {nameError && <div className="error">{nameError}</div>}
            {dobError && <div className="error">{dobError}</div>}
            {emailError && <div className="error">{emailError}</div>}
            {numberError && <div className="error">{numberError}</div>}
          </div>
          <div className="inputForm">
            <form onSubmit={handleSubmit}>
              <input
                className={nameError ? "errorinput" : "noerrorinput"}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={dobError ? "errorinput" : "noerrorinput"}
                type="date"
                placeholder="Date Of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <input
                className={emailError ? "errorinput" : "noerrorinput"}
                type="text"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={numberError ? "errorinput" : "noerrorinput"}
                type="text"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <button>Submit</button>
            </form>
          </div>
        </>
      ) : (
        <>
          <Allform />
          <p className="back" onClick={() => setFormSuccess(false)}>
            Fill Form Again
          </p>
        </>
      )}
    </>
  );
}

export default InpurForm;
