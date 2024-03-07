import React from "react";
import { styles } from "../styles/styles";
import { logo } from "../assets/imageImporter";
const Login = () => {
  return (
    <div className="mt-[100px] sm:mt-[100px] flex flex-col">
      <div className="flex items-center min-h-screen p-4  lg:justify-center">
        <div className="flex flex-col overflow-hidden  border border-solid border-Grey-50 rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white md:w-[50%]  border-r-[0px] md:border-r-[2px] border-Purple-65">
            <div className="flex flex-col items-center my-3 text-4xl font-bold tracking-wider text-center">
              <img className="text-center" src={logo} alt="company logo" />
            </div>
            <p className={`${styles.paragraph} mt-6  text-center md:mt-0`}>
              you now have the power to check your real estate properties of
              your choice at the comfort of your house, with Estatein, you get
              all the details you need to know about Properties you are buying
              right at the comfort of your House!
            </p>
            <p
              className={`${styles.paragraph} flex flex-col items-center justify-center mt-10 text-center`}
            >
              <span className={`${styles.paragraph}`}>
                Don't have an account?
              </span>
              <a href="#" className="underline text-Purple-60">
                Get Started!
              </a>
            </p>
            <p className="mt-6  text-center">
              Read our{" "}
              <a href="#" className="underline text-Purple-60">
                terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline text-Purple-60">
                conditions
              </a>
            </p>
          </div>
          <div className="p-5 md:flex-1 border border-solid border-Purple-65">
            <h3 className="my-4 text-[20px]  text-center font-semibold">
              Account Login
            </h3>
            <form action="#" className="flex flex-col space-y-5">
              <div className="flex flex-col flex-1  gap-[12px] md:gap-[16px]">
                <label for="email" className="text-sm font-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  autofocus
                  className={`${styles.inputFied}`}
                />
              </div>
              <div className="flex flex-col flex-1  gap-[12px] md:gap-[16px]">
                <div className="flex items-center justify-between">
                  <label for="password" className="text-sm font-semibold">
                    Password
                  </label>
                  <a href="#" className="underline text-Purple-60">
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  className={`${styles.inputFied}`}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label for="remember" className="text-sm font-semibold">
                  Remember me
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className={`${styles.buttonPadding} bg-Purple-60 w-full  transition duration-300  shadow  focus:outline-none focus: focus:ring-4`}
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
