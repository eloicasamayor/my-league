// Dependencies
import { useParams } from "react-router-dom";
import { useGetTeamsQuery } from "../api/teams";
import { useGetPlayersQuery } from "../api/players";

// Components
import { MatchesList } from "../components/MatchesList"
export function LeaguePage() {
  const { urlname } = useParams();
  const teams = useGetTeamsQuery();
  const players = useGetPlayersQuery();
  
  return (
    <div>
      <h1>{urlname}</h1>
      <section>
        <h2>Teams</h2>
        {teams.isLoading ? (
          <h2>loading teams...</h2>
        ) : (
          <>
            <ul>
              {teams.data.map(
                (team) => team.league === 1 && <li key={team.id}>{team.name}</li>
              )}
            </ul>
          </>
        )}
      </section>
      <hr></hr>
      <MatchesList/>
      <hr></hr>
      <section>
        <h2>Players</h2>
        {players.isLoading ? (
          <h3>loading players...</h3>
        ) : (
          players.data.map((player) => <li key={player.id}>{player.name}</li>)
        )}
      </section>
    </div>
  );
}
