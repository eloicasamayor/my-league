// dependencies
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "../redux/auth/slice";
import { supabase } from "../supabase";

// Components
import { Header } from "./Header";
import { Footer } from "./Footer";

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
    <div className="min-h-screen flex flex-col">
      <Header location={location} authData={authData} navigate={navigate} />
      <main className={"grow flex flex-col"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
