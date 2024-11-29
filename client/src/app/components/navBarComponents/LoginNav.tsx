import { CgProfile } from "react-icons/cg";
import MobileNavLink from "./MobileNavLink";

interface LoginNavProps {
  showLoginForm: (show: boolean) => void;
  token: string | undefined;
  showRegisterForm: (show: boolean) => void;
}

const LoginNav: React.FC<LoginNavProps> = ({
  showLoginForm,
  token,
  showRegisterForm,
}) => {
  return (
    <div className="navbar-end">
      {token === undefined ? (
        <>
          <button
            className="btn btn-neutral hidden md:flex"
            onClick={() => showLoginForm(true)}
          >
            Login
          </button>
          <button
            onClick={() => showRegisterForm(true)}
            className="btn btn-info hidden lg:flex ml-2 text-white"
          >
            Register
          </button>
        </>
      ) : (
        <div className="items-center btn btn-info text-slate-200 hidden md:flex">
          <CgProfile className="mr-1 text-2xl" />
          <span className="font-semibold text-xl">Profile</span>
        </div>
      )}
      <MobileNavLink
        token={token}
        showLoginForm={showLoginForm}
        showRegisterForm={showRegisterForm}
      />
    </div>
  );
};

export default LoginNav;
