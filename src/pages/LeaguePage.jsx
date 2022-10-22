// Dependencies
import { useParams } from "react-router-dom";
import { useGetMatchesQuery } from "../api/matches";
import { useGetTeamsQuery } from "../api/teams";
import { useGetPlayersQuery } from "../api/players";

export function LeaguePage() {
  const { urlname } = useParams();
  const teams = useGetTeamsQuery();
  const matches = useGetMatchesQuery();
  const players = useGetPlayersQuery();
  function getTeamNameWithId(id) {
    return teams.data.find((team) => team.id === id).name;
  }
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
                (team) => team.league === 1 && <li>{team.name}</li>
              )}
            </ul>
          </>
        )}
      </section>
      <hr></hr>
      <section>
        <h2>Matches</h2>
        {matches.isLoading ? (
          <h2>loading matches...</h2>
        ) : (
          <>
            <ul>
              {matches.data.map((match) => (
                <li>
                  <p>
                    {getTeamNameWithId(match.local_team) +
                      " vs " +
                      getTeamNameWithId(match.visitor_team) +
                      " at "}
                    <date>{match.date}</date>

                    {match.played && (
                      <>
                      <b>
                        {"  " +
                          match.local_goals +
                          " - " +
                          match.visitor_goals}
                      </b>
                      <span>result: {match.result}</span></>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
      <hr></hr>
      <section>
        <h2>Players</h2>
        {players.isLoading ? (
          <h3>loading players...</h3>
        ) : (
          players.data.map((player) => <li>{player.name}</li>)
        )}
      </section>
    </div>
  );
}
