// Dependencies
import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../supabase";
import { setAuth } from "../redux/auth/slice";
import { useRef, useState } from "react";

// Components
import { TextInput, Button, Label } from "flowbite-react";
import { Alert } from "../components";

export function UpdatePassword() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    isError: false,
  });

  async function signInWithGoogle(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    error ? alert("wrong login data") : dispatch(setAuth(data));
  }
  /**
   * Funció per a crear un compte
   * @param {SyntheticEvent} e
   */
  async function signup(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    setAlertMessage({
      message: error
        ? `An error occurred: ${error.message}`
        : `created account for ${data.user.email}`,
      isError: !!error,
    });
    dispatch(setAuth(data));
  }

  /**
   * Funció per entrar al compte
   * @param {SyntheticEvent} e
   */
  async function login(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    dispatch(setAuth(data));
    setAlertMessage({
      message: error ? `${error.message}` : `logged in as ${data.user.email}`,
      isError: !!error,
    });
  }

  /**
   * Funció per restarurar la contrassenya
   *  @param {String} password
   */
  async function resetPassword(password) {
    const { data, error } = await supabase.auth.updateUser({ password });
    setAlertMessage({
      isError: !!error,
      message: error ? error.message : "password was reseted",
    });
  }

  if (!authData?.user) {
    return "sorry, something went wrong :/";
  }

  return (
    <>
      {alertMessage.message && (
        <Alert
          isError={alertMessage.isError}
          onCloseAlert={() => setAlertMessage({ message: "" })}
        >
          {alertMessage.message}
        </Alert>
      )}
      <div className="w-11/12 mx-auto lg:w-2/4">
        <h1 className="text-center pt-12"> Reset password</h1>
        <form
          onSubmit={(e) => login(e)}
          className={"flex flex-col py-10 px-5 gap-2"}
        >
          <Label htmlFor="emailAddress">Email</Label>
          <TextInput
            ref={emailRef}
            id={"emailAddress"}
            type={"email"}
            value={authData.user.email}
            disabled
            required
          ></TextInput>
          <Label htmlFor="password">New password</Label>

          <TextInput
            ref={passwordRef}
            id={"password"}
            type={"password"}
            minLength={"6"}
            required
          ></TextInput>
          <div className="flex justify-center gap-2 pt-5">
            <Button
              type={"submit"}
              onClick={(e) => resetPassword(passwordRef.current.value)}
              value={"reset"}
            >
              {"Reset Password"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
