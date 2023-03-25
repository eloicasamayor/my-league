// Dependencies
import { useState } from "react";

// Components
import { EditPlayerForm } from "./forms";
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
      <Table
        hoverable={true}
        className="styled-table w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <Table.Head className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <Table.HeadCell>{"player name"}</Table.HeadCell>
          <Table.HeadCell>{"team"}</Table.HeadCell>
          <Table.HeadCell>{"scored goals"}</Table.HeadCell>
          <Table.HeadCell>{"scored goals home"}</Table.HeadCell>
          <Table.HeadCell>{"scored goals away"}</Table.HeadCell>
          {isOwner && <Table.HeadCell></Table.HeadCell>}
        </Table.Head>
        <Table.Body>
          {playersData.map((player) => (
            <Table.Row
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={player.id}
            >
              <Table.HeadCell
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {player.name}
              </Table.HeadCell>
              <Table.Cell className="text-base">
                {teamsData.find((team) => team.id === player.team).name ||
                  player.team}
              </Table.Cell>
              <Table.Cell className="text-base">
                {player.scored_goals}
              </Table.Cell>
              <Table.Cell className="text-base">
                {player.scored_goals_home}
              </Table.Cell>
              <Table.Cell className="text-base">
                {player.scored_goals_away}
              </Table.Cell>
              {isOwner && (
                <Table.Cell className="text-base">
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
