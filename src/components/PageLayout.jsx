// dependencies
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "../redux/auth/slice";
import { supabase } from "../supabase";
import { ArrowLeft, HomeIcon, UserIcon, Logo } from "./icons";

// Components
import { Flowbite, DarkThemeToggle } from "flowbite-react";
import { GithubIcon, EmailIcon } from "./icons";

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
                "w-10 h-10 rounded-full bg-transparent flex justify-center items-center hover:bg-violet-400 stroke-violet-50"
              }
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
            </button>
            {location.pathname === "/new-league" ? (
              <h1 className="text-lg">{"Creating new league"}</h1>
            ) : (
              <button
                className={
                  "w-10 h-10 rounded-full bg-transparent flex justify-center items-center hover:bg-violet-400"
                }
                onClick={() => navigate("/")}
              >
                <HomeIcon />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4 ml-2">
            <Logo
              svgClassName={"stroke-violet-50"}
              pathClassName={"stroke-violet-50"}
            />
            <h1 className={"text-white font-light text-xl"}>My League</h1>
          </div>
        )}
        {location.pathname !== "/account" && (
          <button
            className={`w-10 h-10 rounded-full bg-transparent flex justify-center items-center hover:bg-violet-400 ${
              authData?.user?.email ? "bg-violet-900" : ""
            }`}
            onClick={() => navigate("/account")}
          >
            <UserIcon
              pathClassName={authData?.user?.email ? "stroke-slate-50" : ""}
            />
            {(false && authData?.user?.email) ?? "login"}
            {false &&
              authData?.user?.id &&
              !authData?.session &&
              "(pending verification)"}
          </button>
        )}
      </header>
      <main className={"pb-12"}>
        <Outlet />
      </main>
      <footer className="flex justify-between absolute bottom-0 p h-14 w-full px-4 py-2 border-b border-violet-300 bg-gradient-to-r from-violet-600 to bg-violet-400 gap-2">
        <span style={{ display: "flex", textDecoration: "none", gap: "5px" }}>
          <Logo svgClassName="fill-black" />
          {"MyLeague (beta)"}
        </span>
        <a
          style={{ display: "flex", textDecoration: "none", gap: "5px" }}
          href={"https://github.com/eloicasamayor/my-league-rtk-query"}
          target="_blank"
        >
          <GithubIcon />
          Source code
        </a>
        <a
          style={{ display: "flex", textDecoration: "none", gap: "5px" }}
          href="mailto:eloi.casamayor@gmail.com"
          target="_blank"
        >
          <EmailIcon className={"fill-black	"} />
          Contact me
        </a>

        <Flowbite>
          <DarkThemeToggle />
        </Flowbite>
      </footer>
    </>
  );
}
