"use client";
import LogoNavbar from "./logoNavbar";
import LinkNav from "./LinkNav";
import LoginNav from "./LoginNav";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import LoginForm from "../userSign/loginForm";
import RegisterForm from "../userSign/RegisterForm";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [tokenState, setTokenState] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = getCookie("token") as string | undefined;
    setTokenState(token);
  }, []);

  return (
    <>
      <div className="navbar  bg-LightGray bg-opacity-70  w-full md:w-8/12 lg:w-2/4 absolute left-2/4 -translate-x-2/4 md:top-5 md:rounded-lg z-50">
        <LogoNavbar />
        <LinkNav />
        <LoginNav
          token={tokenState}
          showLoginForm={setShowLogin}
          showRegisterForm={setShowRegister}
        />
      </div>
      <LoginForm
        show={showLogin}
        token={setTokenState}
        showLoginForm={setShowLogin}
        showRegisterForm={setShowRegister}
      />
      <RegisterForm
        show={showRegister}
        showRegisterForm={setShowRegister}
        showLoginForm={setShowLogin}
        token={setTokenState}
      />
    </>
  );
};

export default Navbar;
