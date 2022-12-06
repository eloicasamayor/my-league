// Dependencies
import { Link } from "react-router-dom";
import { useDeleteTeamMutation } from "../redux";

export function Classification({ data, isLoading, refetch }) {
  const [deleteTeam] = useDeleteTeamMutation();

  if (isLoading) {
    return "loading...";
  }
  if (!data.length) {
    return "no teams :(";
  }
  return (
    <section>
      <h2>Classification</h2>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team) => (
            <tr key={team.id}>
              <td>
                <Link to={"./" + team.urlname}>{team.name}</Link>
              </td>
              <td>{team.points}</td>
              <td>{team.played_matches}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.defeats}</td>
              <td>{team.goals_scored}</td>
              <td>{team.goals_conceded}</td>
              <td>
                <button
                  onClick={async () => {
                    await deleteTeam({ id: team.id });
                    refetch();
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
