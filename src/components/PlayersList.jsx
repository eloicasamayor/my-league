// Dependencies
import { useState } from "react";

// Components
import { EditPlayerForm } from "./EditPlayerForm";
import { PencilIcon } from "./icons/PencilIcon";
import { Modal } from "./modal";

export function PlayersList({
  teamsData,
  teamsIsLoading,
  selectedTeam,
  playersData,
  playersIsLoading,
  isOwner,
}) {
  const [editingPlayer, setEditingPlayer] = useState();

  if (playersIsLoading || teamsIsLoading) {
    return "loading...";
  }

  if (!playersData.length) {
    return "no players :(";
  }

  if (selectedTeam) {
    playersData = playersData.filter(
      (player) => player.team === selectedTeam.id
    );
  }

  return (
    <section>
      <table>
        <tbody>
          <tr>
            <th>{"player name"}</th>
            <th>{"team"}</th>
            <th>{"scored goals"}</th>
            <th>{"scored goals home"}</th>
            <th>{"scored goals away"}</th>
            {isOwner && <th></th>}
          </tr>
          {playersData.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>
                {teamsData.find((team) => team.id === player.team).name ||
                  player.team}
              </td>
              <td>{player.scored_goals}</td>
              <td>{player.scored_goals_home}</td>
              <td>{player.scored_goals_away}</td>
              {isOwner && (
                <td>
                  <button
                    onClick={() => {
                      setEditingPlayer(player);
                    }}
                  >
                    <PencilIcon />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isOwner && editingPlayer && (
        <Modal onCloseModal={() => setEditingPlayer(null)}>
          <EditPlayerForm player={editingPlayer} teamsData={teamsData} />
        </Modal>
      )}
    </section>
  );
}
