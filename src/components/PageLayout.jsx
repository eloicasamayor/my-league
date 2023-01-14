// dependencies
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "../redux/auth/slice";
import { supabase } from "../supabase";
import { ArrowLeft } from "./icons/ArrowLeft";
import { HomeIcon } from "./icons/HomeIcon";
import { UserIcon } from "./icons/UserIcon";

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
      <section>
        <div className={"w-full flex justify-between"}>
          {location.pathname !== "/" && (
            <div>
              <button onClick={() => navigate(-1)}>
                <ArrowLeft />
              </button>
              <button onClick={() => navigate("/")}>
                <HomeIcon />
              </button>
            </div>
          )}
          <Link to={"/login"} className={"flex self-end"}>
            <button className="flex">
              <UserIcon />
              {authData?.user?.email ?? "login"}
              {authData?.user?.id &&
                !authData?.session &&
                "(pending email verification)"}
            </button>
          </Link>
        </div>
      </section>
      <main>
        <Outlet />
      </main>
    </>
  );
}
