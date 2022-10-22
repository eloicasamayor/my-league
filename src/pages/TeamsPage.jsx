// Dependencies
import { Link } from "react-router-dom";

// Api
import { useGetTeamsQuery } from "../api/teams";

export function TeamsPage() {
  const teams = useGetTeamsQuery();
  console.log(teams);
  if (teams.isLoading || teams.isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Teams Page</h1>
      <ul>
        {teams.data.map((team) => (
          <li>
            <Link to={`/${team.urlname}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
