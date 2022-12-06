import { useRef } from "react";
import { useLoginUserMutation } from "../redux";

export function LoginPage() {
  const userRef = useRef();
  const passwordRef = useRef();

  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  function onSubmitHandler(values) {
    // ? Executing the loginUser Mutation
    loginUser(values);
  }
  return (
    <div>
      user: <input ref={userRef} type="text"></input>
      <br />
      password: <input ref={passwordRef} type={"password"}></input>
      <br />
      <button
        onClick={() =>
          loginUser({
            user: userRef.current.value,
            password: passwordRef.current.value,
          })
        }
      >
        Login
      </button>
    </div>
  );
}
