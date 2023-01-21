// Dependencies
import { Link } from "react-router-dom";
import { useState } from "react";
import { _ } from "lodash";
// Components
import { EditTeamForm } from "./EditTeamForm";
import { Modal } from "./modal";
import { PencilIcon } from "./icons/PencilIcon";

export function Classification({ data, isLoading, isOwner }) {
  const [teamToEdit, setTeamToEdit] = useState({});

  if (isLoading) {
    return "loading...";
  }
  if (!data.length) {
    return "no teams :(";
  }
  return (
    <section>
      <h2>Classification</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Points</th>
            <th>Played</th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Defeats</th>
            <th>Scored Goals</th>
            <th>Conceded Goals</th>
            {isOwner && <th></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((team) => (
            <tr key={team.id}>
              <td>
                <Link to={"./" + team.urlname}>{team.name}</Link>
              </td>
              <td>{team.points}</td>
              <td>{team.played_matches}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.defeats}</td>
              <td>{team.goals_scored}</td>
              <td>{team.goals_conceded}</td>
              {isOwner && (
                <td>
                  <button
                    onClick={() =>
                      setTeamToEdit({ id: team.id, name: team.name })
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
      {isOwner && !_.isEmpty(teamToEdit) && (
        <Modal onCloseModal={setTeamToEdit}>
          <EditTeamForm team={teamToEdit} />
        </Modal>
      )}
    </section>
  );
}
