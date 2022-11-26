// Dependencies
import { useState } from "react";
import { useGetPlayersQuery, useDeletePlayerMutation } from "../api/players";
import { useGetTeamsQuery } from "../api/teams";

// Components
import { NewPlayerForm } from "./NewPlayerForm";
import { EditPlayerForm } from "./EditPlayerForm";

export function PlayersList() {
  const players = useGetPlayersQuery();
  const { data, isLoading, refetch } = useGetTeamsQuery();
  const [editingPlayer, setEditingPlayer] = useState();
  const [deletePlayer] = useDeletePlayerMutation();
  return (
    <section>
      <h2>Players</h2>
      {players.isLoading || isLoading ? (
        <h3>loading...</h3>
      ) : (
        <table>
          <tr>
            <th>{"player name"}</th>
            <th>{"team"}</th>
            <th>{"scored goals"}</th>
            <th>{"scored goals home"}</th>
            <th>{"scored goals away"}</th>
            <th>{"actionss"}</th>
          </tr>
          {players.data.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>
                {data.find((team) => team.id === player.team).name ||
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
                    refetch();
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}
      <NewPlayerForm />
      <EditPlayerForm player={editingPlayer} />
    </section>
  );
}
