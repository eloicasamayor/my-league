import { useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { setCredentials, useLoginMutation } from "../redux";
import { useDispatch } from "react-redux";

export function LoginPage() {
  const userRef = useRef();
  const passwordRef = useRef();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    loadGApi();
  }, []);

  function loadGApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      gapi.load("client", () => {
        gapi.client
          .init({
            apiKey: "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",
            clientId:
              "598619732828-kvrhfbe32v57ijou787cdlseb6nkqgi0.apps.googleusercontent.com",
            scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            ],
          })
          .then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(updateSigninStatus);
          });
      });
    };

    document.body.appendChild(script);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    debugger;
    // try {
    debugger;
    const userData = await login({
      email: userRef.current.value,
      password: passwordRef.current.value,
    }).unwrap();
    debugger;
    dispatch(setCredentials({ ...userData, user }));
    Navigate("/welcome");
    /* } catch (error) {
      console.log("there was en error: ");
      console.log(error);
    } */
  }
  if (isLoading) {
    return "loading...";
  }
  return (
    <form>
      email: <input ref={userRef} type="email"></input>
      <br />
      password: <input ref={passwordRef} type={"password"}></input>
      <br />
      <button onClick={(e) => handleSubmit(e)}>Login</button>
      {/* <button
        onClick={() =>
          registerUser({
            email: userRef.current.value,
            password: passwordRef.current.value,
          })
        }
      >
        Sign up
      </button> */}
      <button onClick={() => GoogleAuth.signIn()}>Log in with Google</button>
    </form>
  );
}
