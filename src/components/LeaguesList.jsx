// Dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteLeagueMutation } from "../redux";
import { useSelector } from "react-redux";

// Components
import { EditLeagueForm } from "./EditLeagueForm";
import { TrashIcon } from "./icons/TrashIcon";
import { PencilIcon } from "./icons/PencilIcon";

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
                      <TrashIcon />
                    </button>

                    <button onClick={() => deleteLeague(league)}>
                      <PencilIcon />
                    </button>
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
