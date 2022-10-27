// Dependencies
import { useGetTeamsQuery } from "../api/teams";

export function TeamsList(){
    const teams = useGetTeamsQuery();

    return (<section>
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
  </section>)}