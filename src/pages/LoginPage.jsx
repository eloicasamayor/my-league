// Dependencies
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { setUser } from "../redux/auth/slice";
import { useRef } from "react";

export function LoginPage() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    getUserData();
    // dispatch(setUser(userData));
  }, [count]);

  async function getUserData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserData(user);
    return user;
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    getUserData();
  }

  async function signup(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    console.log("data = ", data);
    console.log("error = ", error);
  }
  async function login(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    console.log("data = ", data);
    console.log("error = ", error);
  }

  return (
    <>
      {userData ? (
        <>
          {userData.email}
          <button
            onClick={() => {
              dispatch(setUser(userData));
              setCount(count + 1);
            }}
          >
            {" "}
            get user data
          </button>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              getUserData();
              dispatch(setUser({}));
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <div>
          <button onClick={signInWithGoogle}>Log in with Google</button>
          <form>
            <label htmlFor="emailAddress">Email</label>
            <input ref={emailRef} id={"emailAddress"} type={"email"}></input>
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} id={"password"} type={"password"}></input>
            <button onClick={(e) => login(e)}>login</button>
            <button onClick={(e) => signup(e)}>signup</button>
          </form>
        </div>
      )}
    </>
  );
}
