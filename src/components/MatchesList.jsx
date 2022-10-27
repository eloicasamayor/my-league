import { useState } from "react";
import { useGetMatchesQuery } from "../api/matches";
import { useGetTeamsQuery } from "../api/teams";
import { EditMatchForm } from "./EditMatchForm";
import { NewMatchForm } from "./NewMatchForm";

export function MatchesList() {
    const matches = useGetMatchesQuery();
    const teams = useGetTeamsQuery();
    const [matchToEdit, setMatchToEdit] = useState({})
    function getTeamNameWithId(id) {
        if(teams.data) {return teams.data.find((team) => team.id === id).name;}
        else{ return id}
      }
    
      function editMatch(id){}

    return <section>
    <h2>Matches</h2>
    {matches.isLoading ? (
      <h2>loading matches...</h2>
    ) : (
      <>
        <table><thead>
          <tr>
            <th>local team</th>
            <th></th>
            <th></th>
            <th>visitor team</th>
            <th>date</th>
            <th>Actions</th>
          </tr></thead>
          <tbody>
          {matches.data.map((match) => (
            <tr key={match.date}>
              <td>{getTeamNameWithId(match.local_team)}</td>
              <td>{match.local_goals}</td>
              <td>{match.visitor_goals}</td>
              <td>{getTeamNameWithId(match.visitor_team)}</td>
              <td>{match.date}</td>
              <td><button onClick={() => setMatchToEdit(
                {id: match.id,
                localTeam: getTeamNameWithId(match.local_team),
                visitorTeam: getTeamNameWithId(match.visitor_team)
                })}>Edit</button></td>
            </tr>
          ))}
        </tbody>
        </table>
        <NewMatchForm/>
        <EditMatchForm {...matchToEdit}/>
      </>
    )}
  </section>
}