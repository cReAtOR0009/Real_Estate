import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

import { styles } from "../styles/styles";
import { logo } from "../assets/imageImporter";
import { Link } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  // console.log("login: ", login, "isloading: ", isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("email: ", email, "password", password);
      const userData = await login({ email, password }).unwrap();
      // console.log("userdata:", userData);
      const {
        data: { email: userEmail },
        token,
      } = userData;
      // console.log("token", token, "email", userEmail);
      dispatch(setCredentials({ user: userEmail, accessToken: token }));
      setEmail("");
      setPassword("");
      navigate("/welcome");
    } catch (err) {
      console.log("error: ", err);
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="mt-[100px] sm:mt-[100px] flex flex-col">
      <div className="flex items-center min-h-screen p-4  lg:justify-center">
        <div className="flex flex-col overflow-hidden  border border-solid border-Grey-50 rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white md:w-[50%]  border-r-[0px] md:border-r-[2px] border-Purple-65">
            <div className="flex flex-col items-center my-3 py-2 border-b border-b-solid  border-b-Purple-65">
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
              <Link to="/signup" className="underline text-Purple-60">
                {" "}
                Get Started
              </Link>
            </p>
            <p className="mt-6  text-center">
              Read our{" "}
              <Link to="#" className="underline text-Purple-60">
                terms
              </Link>
              <span className="mx-[5px]">and</span>
              <Link to="#" className="underline text-Purple-60">
                conditions
              </Link>
            </p>
          </div>
          <div className="p-5 md:flex-1 border border-solid border-Purple-65">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h3 className="my-4 text-[20px]  text-center font-semibold">
              Account Login
            </h3>
            <form
              onSubmit={handleSubmit}
              action="#"
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
                  onChange={handleUserInput}
                  autoComplete="off"
                  required
                  autoFocus
                  className={`${styles.inputFied} text-[18px] py-[5px]`}
                />
              </div>
              <div className="flex flex-col flex-1  gap-[12px] md:gap-[16px]">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold">
                    Password
                  </label>
                  <Link to="#" className="underline text-Purple-60">
                    {" "}
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  onChange={handlePasswordInput}
                  value={password}
                  required
                  className={`${styles.inputFied} text-[18px] py-[5px]`}
                />
              </div>
              <div className="flex items-center space-x-2">
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
