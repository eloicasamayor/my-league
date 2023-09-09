// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../supabase";
import { setAuth } from "../redux/auth/slice";
import { useRef, useState } from "react";

// Components
import { TextInput, Button, Label } from "flowbite-react";
import { Alert } from "../components";

export function LoginPage() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    isError: false,
  });
  const [signUpPage, setSignUpPage] = useState(false);

  async function signInWithGoogle(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    error ? alert("wrong login data") : dispatch(setAuth(data));
  }
  /**
   * Funció per a crear un compte
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
   *  @param {String} email
   */
  async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://my-league.netlify.app/update-password",
    });
    setAlertMessage({
      isError: !!error,
      message: error ? error.message : `link sended to ${email}`,
    });
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
      {authData?.user ? (
        <div className="px-8 py-28 text-center flex flex-col items-center gap-9">
          <p>
            {"Loged in as "}
            <span className="font-semibold">{authData.user.email}</span>{" "}
          </p>
          {!authData.user.email_confirmed_at && (
            <p>
              Confirm your email to start creating a league. An email was sent
              to <address>{authData.user.email}</address>
            </p>
          )}

          <Button
            className="w-72 "
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (!error) {
                dispatch(setAuth({}));
                setAlertMessage({ message: "logged out", isError: false });
              }
            }}
          >
            Log out
          </Button>
          <a
            href="#"
            className="leading-10 text-sm"
            onClick={() => resetPassword(emailRef.current.value)}
          >
            {`Reset Password`}
          </a>
        </div>
      ) : (
        <div className="w-11/12 mx-auto lg:w-2/4">
          {/* <Button onClick={(e) => signInWithGoogle(e)}>
            Log in with Google
          </Button> */}
          <h1 className="text-center pt-12">
            {signUpPage ? "Create a myLeague account" : "Log in into myLeague"}
          </h1>
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
            <div className="flex justify-center gap-2 pt-5">
              {signUpPage ? (
                <>
                  <Button
                    type={"submit"}
                    onClick={(e) => signup(e)}
                    value={"signup"}
                  >
                    {"Sign up"}
                  </Button>
                  <a
                    className="leading-10 text-sm"
                    href="#"
                    onClick={() => setSignUpPage(false)}
                  >
                    {"Do you have an ccount? Sign in"}
                  </a>
                </>
              ) : (
                <>
                  <Button type={"submit"} value={"login"}>
                    {"Log in"}
                  </Button>{" "}
                  <a
                    href="#"
                    className="leading-10 text-sm"
                    onClick={() => setSignUpPage(true)}
                  >
                    {`Don't have an account? Create One`}
                  </a>
                  <a
                    href="#"
                    className="leading-10 text-sm"
                    onClick={() => resetPassword(emailRef.current.value)}
                  >
                    {`Reset Password`}
                  </a>
                </>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
