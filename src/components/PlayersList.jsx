// Dependencies
import { useState } from "react";
import { useGetPlayersQuery } from "../api/players";
import { useGetTeamsQuery } from "../api/teams";

// Components
import { NewPlayerForm } from "./NewPlayerForm";

export function PlayersList() {
  const players = useGetPlayersQuery();
  const teams = useGetTeamsQuery();
  const [editingPlayer, setEditingPlayer] = useState();
  return (
    <section>
      <h2>Players</h2>
      {players.isLoading || teams.isLoading ? (
        <h3>loading...</h3>
      ) : (
        <table>
          <tr>
            <th>{"player name"}</th>
            <th>{"team"}</th>
            <th>{"scored goals"}</th>
            <th>{"scored goals home"}</th>
            <th>{"scored goals away"}</th>
            <th>{"actions"}</th>
          </tr>
          {players.data.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>
                {teams.data.find((team) => team.id === player.team).name ||
                  player.team}
              </td>
              <td>{player.scored_goals}</td>
              <td>{player.scored_goals_home}</td>
              <td>
                <button
                  onClick={() => {
                    console.log("joder");
                    setEditingPlayer(player);
                  }}
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}
      <NewPlayerForm player={editingPlayer} />
    </section>
  );
}
