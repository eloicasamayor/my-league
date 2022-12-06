// Dependencies
import { useGetTeamsQuery } from "../redux";

export function TeamsList() {
  const teams = useGetTeamsQuery();

  return (
    <section>
      <h2>Teams</h2>
      {teams.isLoading ? (
        <h2>loading teams...</h2>
      ) : (
        <table>
          {teams.data.map(
            (team) =>
              team.league === 1 && (
                <tr key={team.id}>
                  <td>{team.name}</td>
                </tr>
              )
          )}
        </table>
      )}
    </section>
  );
}
