import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <h1>Welcome to my-league</h1>
      <nav>
        <ul>
          <li>
            <Link to={"/leagues"}>leagues</Link>
          </li>
          <li>
            <Link to={"/login"}>login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
