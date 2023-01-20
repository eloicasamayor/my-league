// Dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteLeagueMutation } from "../redux";
import { useSelector } from "react-redux";

// Components
import { EditLeagueForm } from "./EditLeagueForm";
import { TrashIcon } from "./icons/TrashIcon";
import { PencilIcon } from "./icons/PencilIcon";
import { PhotoIcon } from "./icons/PhotoIcon";

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
          <tr></tr>
          <th>name</th>
          <th>description</th>
          {authData.user?.id && <th>actions</th>}
        </tr>
        {leaguesData.map((league) => (
          <tr key={league.id}>
            <tr>
              {league.img ? (
                <img src={league.img} width={30} height={30}></img>
              ) : (
                <PhotoIcon />
              )}
            </tr>
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
                      <PencilIcon />
                    </button>

                    <button onClick={() => deleteLeague(league)}>
                      <TrashIcon />
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
      <EditLeagueForm
        leagueToEdit={leagueToEdit ?? {}}
        setLeagueToEdit={setLeagueToEdit}
      />
    </>
  );
}
