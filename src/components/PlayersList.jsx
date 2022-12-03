// Dependencies
import { useState } from "react";
import { useDeletePlayerMutation } from "../api/players";

// Components
import { NewPlayerForm } from "./NewPlayerForm";
import { EditPlayerForm } from "./EditPlayerForm";

export function PlayersList({
  teamsData,
  teamsIsLoading,
  selectedTeam,
  playersData,
  playersIsLoading,
  playersRefetch,
}) {
  const [editingPlayer, setEditingPlayer] = useState();
  const [deletePlayer] = useDeletePlayerMutation();

  if (selectedTeam) {
    playersData = playersData.filter((player) => player.team === selectedTeam);
  }
  return (
    <section>
      {playersIsLoading || teamsIsLoading ? (
        <h3>loading...</h3>
      ) : playersData.length ? (
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
                  <button
                    onClick={async () => {
                      await deletePlayer({ id: player.id });
                      playersRefetch();
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "no players found for this team"
      )}
      {!selectedTeam && <EditPlayerForm player={editingPlayer} />}
    </section>
  );
}
