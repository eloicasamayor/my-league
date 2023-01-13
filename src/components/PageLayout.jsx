// dependencies
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "../redux/auth/slice";
import { supabase } from "../supabase";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

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
        <div style={{ display: "flex" }}>
          {location.pathname !== "/" && (
            <>
              <button onClick={() => navigate(-1)}>
                <ArrowLeftIcon className="stroke-1" />
              </button>
              <button onClick={() => navigate("/")}>🏠</button>
            </>
          )}
          <Link to={"/login"}>
            {authData?.user?.email ?? "login"}{" "}
            {authData?.user?.id &&
              !authData?.session &&
              "(pending email verification)"}
          </Link>
        </div>
      </section>
      <main>
        <Outlet />
      </main>
    </>
  );
}
