import React from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

interface MobileNavLinkProps {
  token: string | undefined;
  showLoginForm: (show: boolean) => void;
  showRegisterForm: (show: boolean) => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  token,
  showLoginForm,
  showRegisterForm,
}) => {
  return (
    <details className="dropdown dropdown-end flex md:hidden">
      <summary className="btn m-1">
        {" "}
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/search">Search</Link>
        </li>
        <li>
          <Link href="/request">Request</Link>
        </li>
        <div className="flex justify-between mt-1 border-t-2 border-t-black p-1">
          {token == undefined ? (
            <>
              <button
                className="btn btn-neutral"
                onClick={() => showLoginForm(true)}
              >
                Login
              </button>
              <button
                onClick={() => {
                  showRegisterForm(true);
                }}
                className="btn btn-outline btn-error "
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center btn btn-info text-slate-200 w-full  ">
              <CgProfile className="mr-1 text-2xl" />
              <span className="font-semibold text-xl">Profile</span>
            </div>
          )}
        </div>
      </ul>
    </details>
  );
};

export default MobileNavLink;
