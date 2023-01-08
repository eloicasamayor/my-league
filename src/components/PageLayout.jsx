import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function PageLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const authData = useSelector((state) => state.auth);
  debugger;
  return (
    <>
      <section>
        <div style={{ display: "flex" }}>
          {location.pathname !== "/" && (
            <>
              <button onClick={() => navigate(-1)}>◀️</button>
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
