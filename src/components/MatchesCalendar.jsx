import _ from "lodash";
import { useState } from "react";
import { EditMatchForm } from "./forms";
import { PencilIcon } from "./icons/PencilIcon";
import { Modal } from "./modal";
import { format } from "date-fns";
import { Table, Button } from "flowbite-react";
import { Alert } from "./Alert";

export function MatchesCalendar({
  teams,
  selectedTeam,
  matchesData,
  matchesIsLoading,
  playersData,
  teamsData,
  isOwner,
}) {
  const [matchToEdit, setMatchToEdit] = useState({});
  const [alertMessage, setAlertMessage] = useState("");

  if (matchesIsLoading) {
    return "loading...";
  }
  if (!matchesData.length) {
    return "no matches :(";
  }
  function getTeamNameWithId(id) {
    if (teams) {
      return teams.find((team) => team.id === id).name;
    } else {
      return id;
    }
  }

  function renderMatch(match, i) {
    return (
      <Table.Row
        key={`${i}_${match.id}`}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <Table.Cell className=" text-right text-base">
          {getTeamNameWithId(match.local_team)}
        </Table.Cell>
        <Table.Cell className={` text-center text-base`}>
          {match.played
            ? `${match.local_goals} - ${match.visitor_goals}`
            : format(new Date(match.date), " hh:mm")}
        </Table.Cell>
        <Table.Cell className=" text-left text-base">
          {getTeamNameWithId(match.visitor_team)}
        </Table.Cell>
        {isOwner && (
          <Table.Cell>
            <Button
              onClick={() =>
                setMatchToEdit({
                  id: match.id,
                  localTeam: match.local_team,
                  visitorTeam: match.visitor_team,
                  played: match.played,
                  localGoals: match.local_goals,
                  visitorGoals: match.visitor_goals,
                  localScorers: match.local_scorers,
                  visitorScorers: match.visitor_scorers,
                })
              }
            >
              <PencilIcon svgClassName={"h-4 w-4"} />
            </Button>
          </Table.Cell>
        )}
      </Table.Row>
    );
  }

  if (selectedTeam) {
    matchesData = matchesData.filter((match) => {
      return (
        match.local_team === selectedTeam.id ||
        match.visitor_team === selectedTeam.id
      );
    });
  }
  if (matchesIsLoading) {
    return (
      <section>
        <h2>...loading</h2>
      </section>
    );
  }
  if (!matchesData.length) {
    return;
  }
  const groupedMatchesData = _.groupBy(matchesData, (match) => match.match_day);

  return (
    <section>
      {alertMessage && (
        <Alert onCloseAlert={setAlertMessage}>{alertMessage}</Alert>
      )}
      {Object.values(groupedMatchesData).map((groupMatches, i) => (
        <>
          <h3>{`Match day ${i + 1}`}</h3>
          <Table
            hoverable={true}
            className="styled-table w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <Table.Head className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <Table.HeadCell className="px-6 py-2 text-right">
                Local team
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-2  w-7 text-center">
                Result / date
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-2 text-left">
                Visitor team
              </Table.HeadCell>
              {isOwner && (
                <Table.HeadCell className="px-6 py-2 text-left">
                  actions
                </Table.HeadCell>
              )}
            </Table.Head>
            <Table.Body>
              {groupMatches.map((match, i) => renderMatch(match, i))}
            </Table.Body>
          </Table>
        </>
      ))}

      {isOwner && !selectedTeam && !_.isEmpty(matchToEdit) && (
        <Modal title="Edit Match" onCloseModal={() => setMatchToEdit(null)}>
          <EditMatchForm
            matchToEdit={matchToEdit}
            playersData={playersData}
            teamsData={teamsData}
            setAlertMessage={setAlertMessage}
            closeModal={() => setMatchToEdit(null)}
          />
        </Modal>
      )}
    </section>
  );
}
