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
        <ul>
          {matches.data.map((match) => (
            <li key={match.date}>
              <p>
                {getTeamNameWithId(match.local_team) +
                  " vs " +
                  getTeamNameWithId(match.visitor_team) +
                  " at "}
                <span>{match.date}</span>

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
}