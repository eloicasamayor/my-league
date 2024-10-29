// Dependencies
import { useGetTeamsQuery } from "../redux";

export function TeamsList() {
  const teams = useGetTeamsQuery({});

  if (teams.isLoading) {
    return (
      <>
        <h2>Teams</h2>
        <p>Loading...</p>
      </>
    );
  }

  if ("error" in teams) {
    return (
      <>
        <h2>Teams</h2>
        <p>Sorry, there was an error loading the teams.</p>
      </>
    );
  }

  return (
    <section>
      <h2>Teams</h2>
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
    </section>
  );
}
