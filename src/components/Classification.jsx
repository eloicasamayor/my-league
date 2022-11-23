// Dependencies
import { useGetTeamsQuery } from "../api/teams";

// Components
import { NewTeamForm } from "./NewTeamForm";

export function Classification() {
  const { data, isLoading, refetch } = useGetTeamsQuery();

  return (
    <section>
      <h2>Classification</h2>
      {isLoading ? (
        <h2>loading ..</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Points</th>
              <th>Played</th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Defeats</th>
              <th>Scored Goals</th>
              <th>Conceded Goals</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (team) =>
                team.league === 1 && (
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{team.points}</td>
                    <td>{team.played_matches}</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.defeats}</td>
                    <td>{team.goals_scored}</td>
                    <td>{team.goals_conceded}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      )}
      <NewTeamForm refetch={refetch} />
    </section>
  );
}
