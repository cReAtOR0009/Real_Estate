import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles/styles";
import { logo } from "../assets/imageImporter";

const Signup = () => {
  return (
    <div className="mt-[100px] sm:mt-[100px] flex min-h-[70vh] justify-center">
      <div className="p-5 mt-[20px] md:flex-1 flex flex-col justify-center md:max-w-[600px] border border-solid border-Purple-65 rounded-[10px]">
        <div className="flex flex-col items-center my-3 py-2 border-b border-b-solid  border-b-Purple-65">
          <img className="text-center" src={logo} alt="company logo" />
        </div>
        <h3 className="my-4 text-[20px]  text-center font-semibold">
          Account Signup
        </h3>
        <form action="#" className="flex flex-col space-y-5">
          <div className="flex flex-col flex-1  gap-[12px] md:gap-[16px]">
            <label htmlFor="email" className="text-sm font-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              autofocus
              className={`${styles.inputFied} text-[18px] py-[5px]`}
            />
          </div>
          <div className="flex flex-col flex-1  gap-[12px] md:gap-[16px]">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              className={`${styles.inputFied} text-[18px] py-[5px]`}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-[10px]">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label htmlFor="remember" className="text-sm font-semibold">
                Remember me
              </label>
            </div>
            <div>
              <span>already have an Account?</span>
              <Link to="/login" className="underline text-Purple-60 ml-[10px]">
                Login
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`${styles.buttonPadding} bg-Purple-60 w-full  transition duration-300  shadow  focus:outline-none focus: focus:ring-4`}
            >
              Sign Up
            </button>
          </div>
          <p className="mt-6  text-center">
            Read our{" "}
            <Link to="#" className="underline text-Purple-60">
              terms
            </Link>{" "}
            and{" "}
            <Link to="#" className="underline text-Purple-60">
              conditions
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
