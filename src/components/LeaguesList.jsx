// Dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteLeagueMutation } from "../redux";
import { useSelector } from "react-redux";

// Components
import { EditLeagueForm } from "./EditLeagueForm";

export function LeaguesList({ leaguesData, leaguesIsLoading }) {
  const [leagueToEdit, setLeagueToEdit] = useState();

  const [deleteLeague] = useDeleteLeagueMutation();
  const authData = useSelector((state) => state.auth);

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
          {authData.user?.id && <th>actions</th>}
        </tr>
        {leaguesData.map((league) => (
          <tr key={league.id}>
            <td>
              <Link to={league.urlname}>{league.name}</Link>
            </td>
            <td>{league.description}</td>
            {authData.user?.id && (
              <td>
                {authData?.user?.id === league.owner ? (
                  <>
                    <button
                      onClick={() => {
                        setLeagueToEdit(league);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteLeague(league)}>Delete</button>
                  </>
                ) : (
                  "-"
                )}
              </td>
            )}
          </tr>
        ))}
      </table>
      <EditLeagueForm leagueToEdit={leagueToEdit ?? {}} />
    </>
  );
}
