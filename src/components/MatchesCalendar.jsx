import _ from "lodash";
import { useState } from "react";
import { EditMatchForm } from "./forms";
import { PencilIcon } from "./icons/PencilIcon";
import { Modal } from "./modal";
import { format } from "date-fns";
import { Table, Button } from "flowbite-react";
import { Alert } from "./Alert";
import { TeamIcon } from "./icons";

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

  function getTeamImgWithId(id) {
    if (teams) {
      return teams.find((team) => team.id === id).img;
    } else {
      return id;
    }
  }

  function renderMatch(match, i) {
    debugger;
    const resultTextClasses = match.played ? "text-base font-bold" : "text-xs";
    const localTeamImg = getTeamImgWithId(match.local_team) ? (
      <img
        className="w-5 inline"
        src={getTeamImgWithId(match.local_team)}
      ></img>
    ) : (
      <TeamIcon svgClassName={"inline w-5"} />
    );
    const visitorTeamImg = getTeamImgWithId(match.visitor_team) ? (
      <img
        className="w-5 inline"
        src={getTeamImgWithId(match.visitor_team)}
      ></img>
    ) : (
      <TeamIcon svgClassName={"inline w-5"} />
    );
    return (
      <Table.Row
        key={`${i}_${match.id}`}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <Table.Cell className=" text-right text-base">
          <span className="px-2">{getTeamNameWithId(match.local_team)}</span>
          {localTeamImg}
        </Table.Cell>
        <Table.Cell className={`w-32 px-0 text-center ${resultTextClasses}`}>
          {match.played ? (
            <span className="bg-gray-300 px-5 py-2">
              {`${match.local_goals}-${match.visitor_goals}`}
            </span>
          ) : (
            `${format(new Date(match.date), "dd/MM hh:mm")}`
          )}
        </Table.Cell>
        <Table.Cell className=" text-left text-base">
          {visitorTeamImg}
          <span className="px-2">{getTeamNameWithId(match.visitor_team)}</span>
        </Table.Cell>
        {isOwner && (
          <Table.Cell className="w-20">
            <Button
              id="editingTeam"
              size={"xs"}
              color={"light"}
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
  debugger;
  return (
    <section>
      {alertMessage && (
        <Alert onCloseAlert={setAlertMessage}>{alertMessage}</Alert>
      )}
      {Object.values(groupedMatchesData).map((groupMatches, i) => (
        <>
          <Table
            hoverable={true}
            className="styled-table mb-6 w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <Table.Head className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <Table.HeadCell colspan="4" className="px-6 py-2">
                {`Match day ${i + 1}`}
              </Table.HeadCell>
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
