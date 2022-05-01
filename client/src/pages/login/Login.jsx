import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  // const { isFetching, dispatch } = useContext(AuthContext);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   loginCall(
  //     { email: email.current.value, password: password.current.value },
  //     dispatch
  //   );
  // };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">This is OurSpace</h3>
          <span className="loginDesc">
            <p>The world is a playground and we have to be together.</p>
            <p>We can think whatever we want to think.</p>
            <p>We can see whatever we want to see.</p>
            <p>We can hear whatever we want to hear.</p>
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <LoadingButton
              variant="contained"
              className="loginButton"
              sx={{
                fontFamily: "Montserrat",
                textTransform: "capitalize",
              }}
              loading={isFetching}
              type="submit"
              disabled={isFetching}
            >
              Log In
            </LoadingButton>
            <span className="loginForgot">Forgot Password?</span>
            <Link to={`/register`} style={{ textDecoration: "none" }}>
              <LoadingButton
                variant="contained"
                className="loginRegisterButton"
                sx={{
                  width: "60%",
                  fontFamily: "Montserrat",
                  alignSelf: "center",
                  backgroundColor: "#42b72a",
                  textTransform: "capitalize",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                loading={isFetching}
                type="submit"
                disabled={isFetching}
              >
                Create New Account
              </LoadingButton>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
