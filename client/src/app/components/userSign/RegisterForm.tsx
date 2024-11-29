/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { useEffect } from "react";
interface RegisterFormProps {
  show: boolean;
  showRegisterForm: (show: boolean) => void;
  showLoginForm: (show: boolean) => void;
  token: (data: any) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  show,
  showRegisterForm,
  showLoginForm,
  token,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const fetchLogin = async () => {
    const res = await axios.post(`${process.env.local}/users`, {
      name,
      email,
      phone,
      password,
      access: false,
      image_profile: "",
    });
    console.log(res.data.data.token);
    setData(res.data.data);
    showRegisterForm(false);
    showLoginForm(true);
  };
  useEffect(() => {
    token(data);
  }, [data, token]);
  return (
    <>
      <div
        className={`absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-70 z-40 flex justify-center items-center ${
          show ? "block" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg p-5 w-11/12 md:w-2/4">
          <div className="flex w-full justify-between items-center">
            <span className="italic text-info font-semibold text-3xl">
              Register
            </span>
            <IoMdCloseCircleOutline
              className="text-3xl text-error cursor-pointer"
              onClick={() => showRegisterForm(false)}
            />
          </div>
          <div className="max-w-sm mx-auto">
            <label className="input input-bordered flex items-center gap-2 mb-5">
              Name
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="grow"
                placeholder="Daisy"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                className="grow"
                placeholder="daisy@site.com"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-5">
              <svg
                aria-hidden="true"
                focusable="false"
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="1em"
                height="1em"
              >
                <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="text-white btn btn-info bg-font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dar"
              onClick={fetchLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
