// Dependencies
import { Link } from "react-router-dom";

// Api
import { useGetPlayersQuery } from "../api/players";

export function PlayersPage() {
  const players = useGetPlayersQuery();
  console.log(players);
  if (players.isLoading || players.isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Teams Page</h1>
      <ul>
        {players.data.map((player) => (
          <li>
            <Link to={`/${player.urlname}`}>{player.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
