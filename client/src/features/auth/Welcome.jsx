import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  return (
    <section className="mt-[150px]">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>
      </p>
    </section>
  );
};

export default Welcome;
