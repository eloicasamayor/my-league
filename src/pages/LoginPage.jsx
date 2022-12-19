import { useEffect } from "react";
import { supabase } from "../supabase";

export function LoginPage() {
  let userData;
  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(data);
  }
  debugger;
  return (
    <>
      <button onClick={signInWithGoogle}>Log in with Google</button>
      {userData && JSON.stringify(userData)}
    </>
  );
}
