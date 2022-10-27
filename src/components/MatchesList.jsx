import { useGetMatchesQuery } from "../api/matches";
import { useGetTeamsQuery } from "../api/teams";

export function MatchesList() {
    const matches = useGetMatchesQuery();
    const teams = useGetTeamsQuery();
    function getTeamNameWithId(id) {
        if(teams.data) {return teams.data.find((team) => team.id === id).name;}
        else{ return id}
      }

    return <section>
    <h2>Matches</h2>
    {matches.isLoading ? (
      <h2>loading matches...</h2>
    ) : (
      <>
        <table><th>local team</th><th></th><th></th><th>visitor team</th><th>date</th>
          {matches.data.map((match) => (
            <tr key={match.date}>
              <td>{getTeamNameWithId(match.local_team)}</td>
              <td>{match.local_goals}</td>
              <td>{match.visitor_goals}</td>
              <td>{getTeamNameWithId(match.visitor_team)}</td>
              <td>{match.date}</td>
            </tr>
          ))}
        </table>
      </>
    )}
  </section>
}