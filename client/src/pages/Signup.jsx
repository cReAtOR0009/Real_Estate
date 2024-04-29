import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styles } from "../styles/styles";
import { logo } from "../assets/imageImporter";
import { useSignupMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmedPasswordRef = useRef();
  const errorRef = useRef();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfiremedPassword] = useState();
  const [signupError, setSignUpError] = useState();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();
  // console.log("isloading...3", isLoading)

  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setSignUpError("");
  }, [email, password]);

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleConfirmedPasswordInput = (e) =>
    setConfiremedPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmedPassword) {
        throw new Error("Passowrds don't match");
      }

      // console.log("isloading1..", isLoading);
      const userData = await signup({
        email,
        password,
        confirmedPassword,
      }).unwrap();
      // console.log("isloading2..", isLoading);
      // console.log('RESPONSE', userData)

      const {
        data: { email: userEmail },
        token,
      } = userData;
      // console.log("token", token, "email", userEmail);
      dispatch(setCredentials({ user: userEmail, accessToken: token }));
      setEmail("");
      setPassword("");
      setConfiremedPassword("");
      navigate("/welcome");
    } catch (err) {
      // console.log(password, confirmedPassword)
      console.log("Error", err);
      if (err.message == "Passowrds don't match") {
        setSignUpError("Passowrds don't match");
        return passwordRef.current.focus();
      }
      if (!err?.data) {
        // isLoading: true until timeout occurs
        // console.log("original status:", err.originalStatus)
        setSignUpError("No Server Response");
      } else if (err.data.status === 400) {
        setSignUpError(err.data.error);
      } else if (err.originalStatus === 401) {
        setSignUpError("Unauthorized");
      } else {
        setSignUpError("Signup Failed");
      }
      errorRef.current.focus();
    }
  };
  // console.log("isloading...4", isLoading)
  return (
    <div className="mt-[100px] sm:mt-[100px] flex min-h-[70vh] justify-center">
      <div className="p-5 mt-[20px] md:flex-1 flex flex-col justify-center md:max-w-[600px] border border-solid border-Purple-65 rounded-[10px]">
        <div className="flex flex-col items-center my-3 py-2 border-b border-b-solid  border-b-Purple-65">
          <img className="text-center" src={logo} alt="company logo" />
        </div>
        <p
          ref={errorRef}
          className={signupError ? "text-[red]" : "hidden"}
          aria-live="assertive"
        >
          {signupError}{isLoading}
        </p>
        <h3 className="my-4 text-[20px]  text-center font-semibold">
          Account Signup
        </h3>
        <form
          action="#"
          onSubmit={handleSignup}
          className="flex flex-col space-y-5"
        >
          <div className="flex flex-col flex-1  gap-[12px] md:gap-[16px]">
            <label htmlFor="email" className="text-sm font-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              value={email}
              onChange={handleEmailInput}
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
              ref={passwordRef}
              value={password}
              onChange={handlePasswordInput}
              className={`${styles.inputFied} text-[18px] py-[5px]`}
            />
          </div>
          <div className="flex flex-col flex-1  gap-[12px] md:gap-[16px]">
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmedpassword"
                className="text-sm font-semibold"
              >
                Confirm Password
              </label>
            </div>
            <input
              type="password"
              id="confirmedpassword"
              ref={confirmedPasswordRef}
              value={confirmedPassword}
              onChange={handleConfirmedPasswordInput}
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
              disabled={isLoading}
              className={`${styles.buttonPadding} disabled:bg-Purple-75 bg-Purple-60 w-full  transition duration-300  shadow  focus:outline-none focus: focus:ring-4`}
            >
            { isLoading?"Loading...":"Sign Up"}
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
