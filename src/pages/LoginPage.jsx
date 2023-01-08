// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../supabase";
import { setAuth } from "../redux/auth/slice";
import { useRef } from "react";

export function LoginPage() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const emailRef = useRef();
  const passwordRef = useRef();

  async function signInWithGoogle(e) {
    e.preventDefault();
    debugger;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    error ? alert("wrong login data") : dispatch(setAuth(data));
  }

  async function signup(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    error ? alert("wrong login data") : dispatch(setAuth(data));
  }

  async function login(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    error ? alert("wrong login data") : dispatch(setAuth(data));
  }

  return (
    <>
      <h1>Login</h1>
      {authData?.user ? (
        <>
          {authData.user.email}

          <button
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              !error && dispatch(setAuth({}));
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <div>
          {/* <button onClick={(e) => signInWithGoogle(e)}>
            Log in with Google
          </button> */}
          <form onSubmit={(e) => login(e)}>
            <label htmlFor="emailAddress">Email</label>
            <input
              ref={emailRef}
              id={"emailAddress"}
              type={"email"}
              required
            ></input>
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              id={"password"}
              type={"password"}
              minLength={"6"}
              required
            ></input>
            <input type={"submit"} value={"login"} />

            <input
              type={"submit"}
              onClick={(e) => signup(e)}
              value={"signup"}
            />
          </form>
        </div>
      )}
    </>
  );
}
