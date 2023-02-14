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
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              {"player name"}
            </th>
            <th scope="col" class="px-6 py-3">
              {"team"}
            </th>
            <th scope="col" class="px-6 py-3">
              {"scored goals"}
            </th>
            <th scope="col" class="px-6 py-3">
              {"scored goals home"}
            </th>
            <th scope="col" class="px-6 py-3">
              {"scored goals away"}
            </th>
            {isOwner && <th scope="col" class="px-6 py-3"></th>}
          </tr>
        </thead>
        <tbody>
          {playersData.map((player) => (
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={player.id}
            >
              <th
                scope="row"
                class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {player.name}
              </th>
              <td class="px-6 py-2">
                {teamsData.find((team) => team.id === player.team).name ||
                  player.team}
              </td>
              <td class="px-6 py-2">{player.scored_goals}</td>
              <td class="px-6 py-2">{player.scored_goals_home}</td>
              <td class="px-6 py-2">{player.scored_goals_away}</td>
              {isOwner && (
                <td class="px-6 py-2">
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
