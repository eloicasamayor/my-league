import _ from "lodash";
import { useState } from "react";
import { EditMatchForm } from "./EditMatchForm";
import { PencilIcon } from "./icons/PencilIcon";
import { Modal } from "./modal";
import { format } from "date-fns";

export function MatchesList({
  teams,
  selectedTeam,
  matchesData,
  matchesIsLoading,
  playersData,
  teamsData,
  isOwner,
}) {
  const [matchToEdit, setMatchToEdit] = useState({});

  if (matchesIsLoading) {
    return "loading...";
  }
  if (!matchesData.length) {
    return "no matches :(";
  }
  function getTeamNameWithId(id) {
    if (teams) {
      return teams.find((team) => team.id === id).name;
    } else {
      return id;
    }
  }

  if (selectedTeam) {
    matchesData = matchesData.filter((match) => {
      return (
        match.local_team === selectedTeam.id ||
        match.visitor_team === selectedTeam.id
      );
    });
  }

  return (
    <section>
      {matchesIsLoading ? (
        <h2>loading ...</h2>
      ) : (
        <>
          {matchesData.length ? (
            <table>
              <thead>
                <tr>
                  <th>local team</th>
                  <th></th>
                  <th></th>
                  <th>visitor team</th>
                  <th>date</th>
                  <th>played</th>
                  {isOwner && !selectedTeam && <th></th>}
                </tr>
              </thead>
              <tbody>
                {matchesData.map((match, i) => (
                  <tr key={match.date + i}>
                    <td>{getTeamNameWithId(match.local_team)}</td>
                    <td>{match.local_goals}</td>
                    <td>{match.visitor_goals}</td>
                    <td>{getTeamNameWithId(match.visitor_team)}</td>
                    <td>{format(new Date(match.date), "eeee dd MMM yyyy")}</td>
                    <td>{match.played.toString()}</td>
                    {isOwner && !selectedTeam && (
                      <td>
                        <button
                          onClick={() =>
                            setMatchToEdit({
                              id: match.id,
                              localTeam: match.local_team,
                              visitorTeam: match.visitor_team,
                              played: match.played,
                              localGoals: match.local_goals,
                              visitorGoals: match.visitor_goals,
                              localScorers: match.local_scorers,
                              visitorScorers: match.visitor_scorers,
                            })
                          }
                        >
                          <PencilIcon />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No matches found for this team"
          )}
          {isOwner && !selectedTeam && !_.isEmpty(matchToEdit) && (
            <Modal onCloseModal={() => setMatchToEdit(null)}>
              <EditMatchForm
                matchToEdit={matchToEdit}
                playersData={playersData}
                teamsData={teamsData}
              />
            </Modal>
          )}
        </>
      )}
    </section>
  );
}
