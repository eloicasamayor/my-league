import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { setCredentials, useLoginMutation } from "../redux";

import { useDispatch } from "react-redux";

export function LoginPage() {
  const userRef = useRef();
  const passwordRef = useRef();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  async function handleSubmit({ email, password }) {
    try {
      debugger;
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      Navigate("/welcome");
    } catch (error) {
      console.log("there was en error: ");
      console.log(error);
    }
  }
  if (isLoading) {
    return "loading...";
  }
  return (
    <div>
      email: <input ref={userRef} type="email"></input>
      <br />
      password: <input ref={passwordRef} type={"password"}></input>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit({
            email: userRef.current.value,
            password: passwordRef.current.value,
          });
        }}
      >
        Login
      </button>
      <button
        onClick={() =>
          registerUser({
            email: userRef.current.value,
            password: passwordRef.current.value,
          })
        }
      >
        Sign up
      </button>
    </div>
  );
}
