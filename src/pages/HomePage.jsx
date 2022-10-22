import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      {" "}
      <h1>Home page</h1>
      <ul>
        <li>
          <Link to={"/leagues"}>Leagues Page</Link>
        </li>
        <li>
          <Link to={"/teams"}>Teams Page</Link>
        </li>
        <li>
          <Link to={"/players"}>Players Page</Link>
        </li>
      </ul>
    </>
  );
}
