import { useRef, useEffect } from "react";
import { setCredentials, useLoginMutation } from "../redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const userRef = useRef();
  const passwordRef = useRef();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleCredentialResponse(response) {
    console.log("JWTtoken: " + response.credential);
    console.log("clientId: " + response.clientId);
    await dispatch(
      setCredentials({
        user: response.clientId,
        token: response.credential,
      })
    );
    window.location.href =
      "https://xabtfstsrkphffptblep.supabase.co/auth/v1/authorize?provider=google";
    // navigate("/welcome");
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "598619732828-kvrhfbe32v57ijou787cdlseb6nkqgi0.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

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
    navigate("/welcome");
    /* } catch (error) {
      console.log("there was en error: ");
      console.log(error);
    } */
  }
  if (isLoading) {
    return "loading...";
  }
  return (
    <>
      <form>
        {/* email: <input ref={userRef} type="email"></input>
        <br />
        password: <input ref={passwordRef} type={"password"}></input>
        <br />
        <button onClick={(e) => handleSubmit(e)}>Login</button>
        <button
        onClick={() =>
          registerUser({
            email: userRef.current.value,
            password: passwordRef.current.value,
          })
        }
      >
        Sign up
      </button> */}
        <div id="buttonDiv"></div>
      </form>
    </>
  );
}
