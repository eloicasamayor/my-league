// Dependencies
import { useState, useEffect } from "react";

// Components
import { EditPlayerForm } from "./forms";
import { PencilIcon } from "./icons/PencilIcon";
import { Modal, SortableHeadCell } from "../components";
import { Table, Button } from "flowbite-react";

export function PlayersList({
  teamsData,
  teamsIsLoading,
  selectedTeam,
  playersData,
  playersIsLoading,
  isOwner,
}) {
  const [editingPlayer, setEditingPlayer] = useState();

  const [orderBy, setOrderBy] = useState({ param: "name", direction: true });
  const [orderedData, setOrderedData] = useState(playersData);

  function clickOrderBy(param) {
    if (param === orderBy.param) {
      setOrderBy((oldOrderBy) => ({
        param: oldOrderBy.param,
        direction: !oldOrderBy.direction,
      }));
    } else {
      setOrderBy({ param: param, direction: true });
    }
  }

  useEffect(() => {
    if (typeof playersData[0][orderBy.param] === "string") {
      setOrderedData((old) => [
        ...old.sort((a, b) => {
          return orderBy.direction
            ? a[orderBy.param].localeCompare(b[orderBy.param])
            : b[orderBy.param].localeCompare(a[orderBy.param]);
        }),
      ]);
    } else {
      setOrderedData((old) => [
        ...old.sort(function (a, b) {
          return orderBy.direction
            ? b[orderBy.param] - a[orderBy.param]
            : a[orderBy.param] - b[orderBy.param];
        }),
      ]);
    }
  }, [orderBy.param, orderBy.direction]);

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
          <SortableHeadCell
            param={"name"}
            orderBy={orderBy}
            clickOrderBy={clickOrderBy}
          />
          <Table.HeadCell>{"team"}</Table.HeadCell>
          <SortableHeadCell
            param={"scored_goals"}
            orderBy={orderBy}
            clickOrderBy={clickOrderBy}
          />
          <SortableHeadCell
            param={"scored_goals_home"}
            orderBy={orderBy}
            clickOrderBy={clickOrderBy}
          />
          <SortableHeadCell
            param={"scored_goals_away"}
            orderBy={orderBy}
            clickOrderBy={clickOrderBy}
          />
          {isOwner && <Table.HeadCell></Table.HeadCell>}
        </Table.Head>
        <Table.Body>
          {orderedData.map((player) => (
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
                  <Button
                    id="editingTeam"
                    size={"xs"}
                    color={"light"}
                    onClick={(e) => {
                      setEditingPlayer(player);
                    }}
                  >
                    <PencilIcon svgClassName={"w-4 h-4"} />
                  </Button>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {isOwner && editingPlayer && (
        <Modal title="Edit player" onCloseModal={() => setEditingPlayer(null)}>
          <EditPlayerForm player={editingPlayer} teamsData={teamsData} />
        </Modal>
      )}
    </section>
  );
}
