// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../supabase";
import { setAuth } from "../redux/auth/slice";
import { useRef } from "react";

import { TextInput, Button, Label } from "flowbite-react";

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
      {authData?.user ? (
        <div className="p-8 text-center flex flex-col items-center gap-9">
          <p>
            {"Loged in as "}
            <span className="font-semibold">{authData.user.email}</span>{" "}
          </p>

          <Button
            className="w-72 "
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              !error && dispatch(setAuth({}));
            }}
          >
            Log out
          </Button>
        </div>
      ) : (
        <div className="w-11/12 mx-auto lg:w-2/4">
          {/* <Button onClick={(e) => signInWithGoogle(e)}>
            Log in with Google
          </Button> */}
          <form
            onSubmit={(e) => login(e)}
            className={"flex flex-col py-10 px-5 gap-2"}
          >
            <Label htmlFor="emailAddress">Email</Label>
            <TextInput
              ref={emailRef}
              id={"emailAddress"}
              type={"email"}
              required
            ></TextInput>
            <Label htmlFor="password">Password</Label>

            <TextInput
              ref={passwordRef}
              id={"password"}
              type={"password"}
              minLength={"6"}
              required
            ></TextInput>
            <div className="flex justify-center gap-2">
              <Button type={"submit"} value={"login"}>
                {"Log in"}
              </Button>

              <Button
                type={"submit"}
                onClick={(e) => signup(e)}
                value={"signup"}
              >
                {"Sign up"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
