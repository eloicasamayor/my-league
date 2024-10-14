// Components
import { HomeIcon, ArrowLeft, Logo, UserIcon } from "./icons";

/**
 * @param {{location: {pathname: string}, authData: {user: {email: string, id: string}, session: boolean}, navigate: any}} param0
 * @returns {React.ReactNode}
 */
export function Header({ location, authData, navigate }) {
  return (
    <header className="h-14 w-full flex justify-between items-center px-4 py-2 border-b border-violet-300 bg-gradient-to-r from-violet-600 to bg-violet-400 gap-2">
      {location.pathname !== "/" ? (
        <div className="flex">
          <button
            data-testid="go-back-btn"
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
              data-testid="go-home-btn"
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
          <h1
            data-testid="main-title"
            className={"text-white font-light text-xl"}
          >
            My League
          </h1>
        </div>
      )}
      {location.pathname !== "/account" && (
        <button
          data-testid="account-btn"
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
  );
}
