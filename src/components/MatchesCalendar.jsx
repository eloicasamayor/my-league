import _ from "lodash";
import { useState } from "react";
import { EditMatchForm } from "./EditMatchForm";
import { PencilIcon } from "./icons/PencilIcon";
import { Modal } from "./modal";
import { format } from "date-fns";
import { Table } from "flowbite-react";

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
      <Table.Row class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <Table.Cell className="px-6 py-2 text-right">
          {getTeamNameWithId(match.local_team)}
        </Table.Cell>
        <Table.Cell className={`px-6 py-2 text-center`}>
          {match.played
            ? `${match.local_goals} - ${match.visitor_goals}`
            : format(new Date(match.date), " hh:mm")}
        </Table.Cell>
        <Table.Cell className="px-6 py-2 text-left">
          {getTeamNameWithId(match.visitor_team)}
        </Table.Cell>
      </Table.Row>
    );
  }

  {
    /*isOwner && !selectedTeam && (
          <div>
            <button
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
              <PencilIcon />
            </button>
          </div>
            ) */
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
      {Object.values(groupedMatchesData).map((groupMatches, i) => (
        <>
          <h3>{"Match day" + i + 1}</h3>
          <Table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <Table.Head class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <Table.HeadCell
                scope="row"
                class="text-right px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Local team
              </Table.HeadCell>
              <Table.HeadCell
                scope="row"
                class=" w-7 text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Result / date
              </Table.HeadCell>
              <Table.HeadCell
                scope="row"
                class="text-left px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Visitor team
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {groupMatches.map((match, i) => renderMatch(match, i))}
            </Table.Body>
          </Table>
        </>
      ))}

      {isOwner && !selectedTeam && !_.isEmpty(matchToEdit) && (
        <Modal onCloseModal={() => setMatchToEdit(null)}>
          <EditMatchForm
            matchToEdit={matchToEdit}
            playersData={playersData}
            teamsData={teamsData}
          />
        </Modal>
      )}
    </section>
  );
}
