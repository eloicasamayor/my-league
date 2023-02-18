// dependencies
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "../redux/auth/slice";
import { supabase } from "../supabase";
import { ArrowLeft } from "./icons/ArrowLeft";
import { HomeIcon } from "./icons/HomeIcon";
import { UserIcon } from "./icons/UserIcon";

// Components
import { Button } from "flowbite-react";
import { Flowbite, DarkThemeToggle } from "flowbite-react";

export function PageLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getAuth = async () => {
    const { data: user } = await supabase.auth.getUser();
    const { data: session } = await supabase.auth.getSession();
    if (user) {
      dispatch(setAuth({ ...user, ...session }));
    }
  };

  useEffect(() => {
    if (
      authData &&
      Object.keys(authData).length === 0 &&
      Object.getPrototypeOf(authData) === Object.prototype
    ) {
      getAuth();
    }
  }, []);

  return (
    <>
      <header className="h-14 w-full flex justify-between items-center px-4 py-2 border-b border-violet-300 bg-gradient-to-r from-violet-600 to bg-violet-400 gap-2">
        {location.pathname !== "/" ? (
          <div className="flex">
            <button
              className={
                "w-10 h-10 rounded-full bg-transparent flex justify-center items-center hover:bg-violet-400"
              }
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
            </button>
            <button
              className={
                "w-10 h-10 rounded-full bg-transparent flex justify-center items-center hover:bg-violet-400"
              }
              onClick={() => navigate("/")}
            >
              <HomeIcon />
            </button>
          </div>
        ) : (
          <div></div>
        )}
        {location.pathname !== "/login" && (
          <button
            className={
              "w-10 h-10 rounded-full bg-transparent flex justify-center items-center hover:bg-violet-400"
            }
            onClick={() => navigate("/login")}
          >
            <UserIcon />
            {(false && authData?.user?.email) ?? "login"}
            {false &&
              authData?.user?.id &&
              !authData?.session &&
              "(pending verification)"}
          </button>
        )}
        <Flowbite>
          <DarkThemeToggle />
        </Flowbite>
      </header>
      <main className={"pb-12"}>
        <Outlet />
      </main>
      <footer className="absolute bottom-0 p h-14 w-full px-4 py-2 border-b border-violet-300 bg-gradient-to-r from-violet-600 to bg-violet-400 gap-2">
        <span>{"© Eloi Productions 2023"}</span>
      </footer>
    </>
  );
}
