import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function PageLayout() {
  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth);

  return (
    <>
      <section>
        <button onClick={() => navigate(-1)}>◀️</button>
        <button onClick={() => navigate("/")}>🏠</button>
        {authData && (
          <div style={{ float: "right" }}>
            <img
              height="30px"
              src={authData.user?.user_metadata?.picture}
            ></img>
            {authData.user?.user_metadata?.full_name}
            {` (${authData.user?.id})`}
          </div>
        )}
      </section>
      <main>
        <Outlet />
      </main>
    </>
  );
}
