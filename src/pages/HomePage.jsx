import { Link } from "react-router-dom";
import { useGetLoggedInUserQuery } from "../redux";
export function HomePage() {
  const { data, isLoading, isFetching, refetch } = useGetLoggedInUserQuery();
  return (
    <>
      <h1>Welcome to my-league</h1>
      {data && <div>{data.toString()}</div>}
      <button
        onClick={() => {
          console.log("refetch");
          refetch();
        }}
      >
        refetch
      </button>
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
