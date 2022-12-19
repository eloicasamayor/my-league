// Dependencies
import { useState } from "react";
import { useDeletePlayerMutation } from "../redux";

// Components
import { EditPlayerForm } from "./EditPlayerForm";

export function PlayersList({
  teamsData,
  teamsIsLoading,
  selectedTeam,
  playersData,
  playersIsLoading,
}) {
  const [editingPlayer, setEditingPlayer] = useState();
  const [deletePlayer] = useDeletePlayerMutation();

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
            <th>{"actionss"}</th>
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
              <td>
                <button
                  onClick={() => {
                    setEditingPlayer(player);
                  }}
                >
                  edit
                </button>
                <button onClick={() => deletePlayer({ id: player.id })}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!selectedTeam && (
        <EditPlayerForm player={editingPlayer} teamsData={teamsData} />
      )}
    </section>
  );
}
