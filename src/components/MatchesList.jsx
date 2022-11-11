import { useState } from "react";
import { useGetMatchesQuery,  useDeleteMatchMutation } from "../api/matches";
import { useGetTeamsQuery } from "../api/teams";
import { EditMatchForm } from "./EditMatchForm";
import { NewMatchForm } from "./NewMatchForm";

export function MatchesList() {
    const matches = useGetMatchesQuery();
    const [deleteMatch] = useDeleteMatchMutation();
    const teams = useGetTeamsQuery();
    const [matchToEdit, setMatchToEdit] = useState({})
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
        <table><thead>
          <tr>
            <th>local team</th>
            <th></th>
            <th></th>
            <th>visitor team</th>
            <th>date</th>
            <th>played</th>
            <th>Actions</th>
          </tr></thead>
          <tbody>
          {matches.data.map((match, i) => (
            <tr key={match.date + i}>
              <td>{getTeamNameWithId(match.local_team)}</td>
              <td>{match.local_goals}</td>
              <td>{match.visitor_goals}</td>
              <td>{getTeamNameWithId(match.visitor_team)}</td>
              <td>{match.date}</td>
              <td>{match.played.toString()}</td>
              <td><button onClick={() => setMatchToEdit(
                {id: match.id,
                localTeam: getTeamNameWithId(match.local_team),
                visitorTeam: getTeamNameWithId(match.visitor_team),
                played: match.played,
                localGoals: match.local_goals,
                visitorGoals: match.visitor_goals,
                localScorers: match.local_scorers,
                visitorScorers: match.visitor_scorers
                })}>Edit</button>
                <button onClick={() => deleteMatch(
                  {id: match.id,
                  })}>Delete</button></td>
            </tr>
          ))}
        </tbody>
        </table>
        <NewMatchForm teams={teams}/>
        <EditMatchForm {...matchToEdit}/>
      </>
    )}
  </section>
}