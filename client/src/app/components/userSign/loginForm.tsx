/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface LoginFormProps {
  show: boolean;
  showLoginForm: (show: boolean) => void;
  showRegisterForm: (show: boolean) => void;
  token: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  show,
  showLoginForm,
  showRegisterForm,
  token,
}) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  // Function to handle login
  const fetchLogin = async () => {
    try {
      const res = await axios.post(`${process.env.local}/users/auth`, {
        phone,
        password,
      });
      setCookie("token", res.data.data.token);
      setData(res.data.data);
      showLoginForm(false);
      window.location.reload();
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  // Pass the token to the parent component when data changes
  useEffect(() => {
    token(data);
  }, [data, token]);

  // Check if URL contains ?login=yes and show the login form
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("login") === "yes") {
      showLoginForm(true);
    }
  }, [showLoginForm]);

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
              Login
            </span>
            <IoMdCloseCircleOutline
              className="text-3xl text-error cursor-pointer"
              onClick={() => showLoginForm(false)}
            />
          </div>
          <div className="max-w-sm mx-auto mt-5">
            {error && (
              <div className="label">
                <span className="label-text-alt text-error text-base">
                  {error}
                </span>
              </div>
            )}
            <label className="input input-bordered flex items-center gap-2 mb-5">
              <input
                type="text"
                className="grow"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="label">
              <span
                className="label-text-alt text-xl cursor-pointer btn p-0"
                onClick={() => {
                  showRegisterForm(true);
                  showLoginForm(false);
                }}
              >
                Register
              </span>
            </div>
            <button
              type="submit"
              className="text-white btn btn-info rounded-lg text-sm w-full px-5 py-2.5"
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

export default LoginForm;
