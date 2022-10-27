// Dependencies
import { useParams } from "react-router-dom";
import { useGetTeamsQuery } from "../api/teams";
import { useGetPlayersQuery } from "../api/players";

// Components
import { MatchesList } from "../components/MatchesList"
import { NewMatchForm } from "../components/NewMatchForm";
import { TeamsList } from "../components/TeamsList";
import { Classification } from "../components/Classification";
export function LeaguePage() {
  const { urlname } = useParams();
  const teams = useGetTeamsQuery();
  const players = useGetPlayersQuery();
  
  return (
    <div>
      <h1>{urlname}</h1>
      <TeamsList/>
      <hr></hr>
      <Classification/>
      <hr></hr>
      <MatchesList/>
      <NewMatchForm/>
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
