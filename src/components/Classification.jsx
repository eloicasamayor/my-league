// Dependencies
import { _ } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { EditTeamForm } from "./forms";
import { PencilIcon, TeamIcon, MoreIcon } from "./icons";
import { Table, Button } from "flowbite-react";
import { SortableHeadCell, Alert, Modal } from "../components";

// Helpers
import { truncateString } from "../helpers";

export function Classification({ data, isLoading, isOwner }) {
  const [alertMessage, setAlertMessage] = useState({
    isError: false,
    message: "",
  });

  const [teamToEdit, setTeamToEdit] = useState({});
  const [seeAllStats, setSeeAllStats] = useState(true);
  const [orderBy, setOrderBy] = useState({ param: "name", direction: true });

  const [orderedData, setOrderedData] = useState(data);

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
    if (data.length && typeof data[0][orderBy.param] === "string") {
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

  const navigate = useNavigate();

  if (isLoading) {
    return "loading...";
  }
  if (!data.length && !orderedData.length) {
    return "no teams :(";
  }

  return (
    <section>
      {!!alertMessage.message && (
        <Alert isError={alertMessage.isError} onCloseAlert={setAlertMessage}>
          {alertMessage.message}
        </Alert>
      )}
      <Table hoverable={true} className={"styled-table text-sm md:text-base"}>
        <Table.Head>
          <Table.HeadCell>
            <input
              type="checkbox"
              id="see-all-stats-checkbox"
              name="see all stats"
              checked={seeAllStats}
              onChange={() => setSeeAllStats(!seeAllStats)}
              className={"hidden"}
            />
            <label
              htmlFor="see-all-stats-checkbox"
              className={`cursor-pointer`}
            >
              <MoreIcon
                ClassName={
                  seeAllStats
                    ? "sTable.Headoke-white"
                    : "sTable.Headoke-violet-600"
                }
              />
            </label>
          </Table.HeadCell>
          <SortableHeadCell
            param="name"
            label={"team "}
            orderBy={orderBy}
            clickOrderBy={clickOrderBy}
          />
          <SortableHeadCell
            param="points"
            orderBy={orderBy}
            clickOrderBy={clickOrderBy}
          />
          <SortableHeadCell
            param="played_matches"
            label="played matches"
            orderBy={orderBy}
            clickOrderBy={clickOrderBy}
          />

          {seeAllStats && (
            <>
              <SortableHeadCell
                param="wins"
                orderBy={orderBy}
                clickOrderBy={clickOrderBy}
              />
              <SortableHeadCell
                param="draws"
                orderBy={orderBy}
                clickOrderBy={clickOrderBy}
              />
              <SortableHeadCell
                param="defeats"
                orderBy={orderBy}
                clickOrderBy={clickOrderBy}
              />
              <SortableHeadCell
                param="goals_scored"
                label="scored goals"
                orderBy={orderBy}
                clickOrderBy={clickOrderBy}
              />
              <SortableHeadCell
                param="goals_conceded"
                label="conceded goals"
                orderBy={orderBy}
                clickOrderBy={clickOrderBy}
              />
            </>
          )}
          {isOwner && <Table.HeadCell></Table.HeadCell>}
        </Table.Head>
        <Table.Body>
          {orderedData.map((team, i) => (
            <Table.Row
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
              key={team.id + team.name + i}
              id="teamRow"
              onClick={(e) => {
                navigate("./" + team.urlname);
                e.stopPropagation();
              }}
            >
              <Table.Cell>
                {!team.img ? (
                  <div className="flex items-center justify-center h-9 w-9 rounded-xl ring-2 ring-white bg-violet-100 p-1">
                    <TeamIcon pathClassName={"stroke-violet-400"} />
                  </div>
                ) : (
                  <img
                    src={team.img}
                    className="flex items-center justify-center h-9 w-9 rounded-xl ring-2 ring-white"
                  />
                )}
              </Table.Cell>
              <Table.Cell>
                {truncateString({ text: team.name, desiredLenght: 20 })}
              </Table.Cell>
              <Table.Cell>{team.points}</Table.Cell>
              <Table.Cell>{team.played_matches}</Table.Cell>
              {seeAllStats && (
                <>
                  <Table.Cell>{team.wins}</Table.Cell>
                  <Table.Cell>{team.draws}</Table.Cell>
                  <Table.Cell>{team.defeats}</Table.Cell>
                  <Table.Cell>{team.goals_scored}</Table.Cell>
                  <Table.Cell>{team.goals_conceded}</Table.Cell>
                </>
              )}
              {isOwner && (
                <Table.Cell>
                  <Button
                    id="editingTeam"
                    size={"xs"}
                    color={"light"}
                    onClick={(e) => {
                      setTeamToEdit(team);
                      e.stopPropagation();
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
      {isOwner && !_.isEmpty(teamToEdit) && (
        <Modal onCloseModal={setTeamToEdit} title={"Edit team "}>
          <EditTeamForm
            team={teamToEdit}
            setAlertMessage={setAlertMessage}
            closeModal={setTeamToEdit}
          />
        </Modal>
      )}
    </section>
  );
}
