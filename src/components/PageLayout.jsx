import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function PageLayout() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)}>◀️</button>
      <button onClick={() => navigate("/")}>🏠</button>

      <Outlet />
    </>
  );
}
