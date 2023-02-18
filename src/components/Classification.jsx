// Dependencies
import { Link } from "react-router-dom";
import { useState } from "react";
import { _ } from "lodash";
import { useNavigate } from "react-router-dom";

// Components
import { EditTeamForm } from "./EditTeamForm";
import { Modal } from "./modal";
import { PencilIcon } from "./icons/PencilIcon";
import { MoreIcon } from "./icons/MoreIcon";
import { Table, Button } from "flowbite-react";

export function Classification({ data, isLoading, isOwner }) {
  const [teamToEdit, setTeamToEdit] = useState({});
  const [seeAllStats, setSeeAllStats] = useState(Table.Headue);

  const navigate = useNavigate();

  if (isLoading) {
    return "loading...";
  }
  if (!data.length) {
    return "no teams :(";
  }
  return (
    <section>
      <Table hoverable={true} className={"text-sm md:text-base"}>
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
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Points</Table.HeadCell>
          <Table.HeadCell>Played</Table.HeadCell>
          {seeAllStats && (
            <>
              <Table.HeadCell>Wins</Table.HeadCell>
              <Table.HeadCell>Draws</Table.HeadCell>
              <Table.HeadCell>Defeats</Table.HeadCell>
              <Table.HeadCell>Scored Goals</Table.HeadCell>
              <Table.HeadCell>Conceded Goals</Table.HeadCell>
            </>
          )}
          {isOwner && <Table.HeadCell></Table.HeadCell>}
        </Table.Head>
        <Table.Body>
          {data.map((team) => (
            <Table.Row
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
              key={team.id}
              onClick={() => navigate("./" + team.urlname)}
            >
              <Table.Cell className="px-2">
                <img src={team.img} className={"w-4"} />
              </Table.Cell>
              <Table.Cell>{team.name}</Table.Cell>
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
                    size={"xs"}
                    color={"light"}
                    onClick={() => setTeamToEdit(team)}
                  >
                    <PencilIcon />
                  </Button>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {isOwner && !_.isEmpty(teamToEdit) && (
        <Modal onCloseModal={setTeamToEdit}>
          <EditTeamForm team={teamToEdit} />
        </Modal>
      )}
    </section>
  );
}
