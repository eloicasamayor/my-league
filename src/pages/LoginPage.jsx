// Dependencies
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { setUser } from "../redux/auth/slice";

export function LoginPage() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

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

  return (
    <>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          getUserData();
          dispatch(setUser({}));
        }}
      >
        Log out
      </button>
      {userData ? (
        <>
          <img height="80px" src={userData.user_metadata.picture}></img>
          {userData.user_metadata.full_name}

          <button
            onClick={() => {
              dispatch(setUser(userData));
              setCount(count + 1);
            }}
          >
            {" "}
            get user data
          </button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Log in with Google</button>
      )}
    </>
  );
}
