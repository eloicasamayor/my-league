// Dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteLeagueMutation } from "../redux";

// Components
import { EditLeagueForm } from "./EditLeagueForm";
export function LeaguesList({ leaguesData, leaguesIsLoading }) {
  const [leagueToEdit, setLeagueToEdit] = useState();

  const [deleteLeague] = useDeleteLeagueMutation();

  if (leaguesIsLoading) {
    return "loading...";
  }
  if (!leaguesData) {
    return "no data :/";
  }

  return (
    <>
      <table>
        <tr>
          <th>name</th>
          <th>description</th>
          <th>owner</th>
          <th>actions</th>
        </tr>
        {leaguesData.map((league) => (
          <tr key={league.id}>
            <td>
              <Link to={league.urlname}>{league.name}</Link>
            </td>
            <td>{league.description}</td>
            <td>{league.owner}</td>
            <td>
              <button
                onClick={() => {
                  setLeagueToEdit(league);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteLeague(league)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
      <EditLeagueForm leagueToEdit={leagueToEdit ?? {}} />
    </>
  );
}
