import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function PageLayout() {
  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth);

  return (
    <>
      <section>
        <button onClick={() => navigate(-1)}>◀️</button>
        <button onClick={() => navigate("/")}>🏠</button>

        {authData?.user?.id ? (
          authData.user.email
        ) : (
          <Link to={"/login"}>
            <p>login</p>
          </Link>
        )}
      </section>
      <main>
        <Outlet />
      </main>
    </>
  );
}
