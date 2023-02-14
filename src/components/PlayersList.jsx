// Dependencies
import { useState } from "react";

// Components
import { EditPlayerForm } from "./EditPlayerForm";
import { PencilIcon } from "./icons/PencilIcon";
import { Modal } from "./modal";
import { Table } from "flowbite-react";

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
      <Table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <Table.Head class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <Table.Row>
            <Table.HeadCell>{"player name"}</Table.HeadCell>
            <Table.HeadCell>{"team"}</Table.HeadCell>
            <Table.HeadCell>{"scored goals"}</Table.HeadCell>
            <Table.HeadCell>{"scored goals home"}</Table.HeadCell>
            <Table.HeadCell>{"scored goals away"}</Table.HeadCell>
            {isOwner && <Table.HeadCell></Table.HeadCell>}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {playersData.map((player) => (
            <Table.Row
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={player.id}
            >
              <Table.HeadCell
                scope="row"
                class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {player.name}
              </Table.HeadCell>
              <Table.Cell>
                {teamsData.find((team) => team.id === player.team).name ||
                  player.team}
              </Table.Cell>
              <Table.Cell>{player.scored_goals}</Table.Cell>
              <Table.Cell>{player.scored_goals_home}</Table.Cell>
              <Table.Cell>{player.scored_goals_away}</Table.Cell>
              {isOwner && (
                <Table.Cell>
                  <button
                    onClick={() => {
                      setEditingPlayer(player);
                    }}
                  >
                    <PencilIcon />
                  </button>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {isOwner && editingPlayer && (
        <Modal onCloseModal={() => setEditingPlayer(null)}>
          <EditPlayerForm player={editingPlayer} teamsData={teamsData} />
        </Modal>
      )}
    </section>
  );
}
