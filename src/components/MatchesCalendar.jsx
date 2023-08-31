// Dependencies
import _ from "lodash";
import { useState } from "react";
import { Button } from "flowbite-react";
import { format } from "date-fns";

// Components
import { EditMatchForm } from "./forms";
import { Modal } from "./modal";
import { Alert } from "./Alert";
import { TeamIcon, PencilIcon } from "./icons";

// Helpers
import { truncateString } from "../helpers";

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
    const resultTextClasses = match.played ? "text-base font-bold" : "text-xs";
    const localTeamImg = getTeamImgWithId(match.local_team) ? (
      <img
        className="w-5 sm:w-8 inline"
        src={getTeamImgWithId(match.local_team)}
      ></img>
    ) : (
      <TeamIcon svgClassName={"inline w-5 sm:w-8"} />
    );
    const visitorTeamImg = getTeamImgWithId(match.visitor_team) ? (
      <img
        className="w-5 sm:w-8 inline"
        src={getTeamImgWithId(match.visitor_team)}
      ></img>
    ) : (
      <TeamIcon svgClassName={"inline w-5 sm:w-8"} />
    );
    return (
      <div
        key={`${i}_${match.id}`}
        className="bg-white hover:bg-gray-50 dark:hover:bg-gray-600 border-b dark:bg-gray-800 dark:border-gray-700 grid grid-cols-[3fr_1fr_3fr_0.5fr] p-2 items-center"
        onClick={() => {
          // matchRef.current.checked = !matchRef.current.checked;
        }}
      >
        <div className=" text-right text-base">
          <span
            className={`px-1 sm:px-2 ${
              selectedTeam &&
              match.local_team === selectedTeam.id &&
              "font-bold"
            }`}
          >
            {truncateString({
              text: getTeamNameWithId(match.local_team),
              desiredLenght: 20,
            })}
          </span>
          {localTeamImg}
        </div>
        <div className={`px-0 text-center ${resultTextClasses}`}>
          {match.played ? (
            <span className="bg-gray-300 px-2 sm:px-5 py-1 sm:py-2">
              {`${match.local_goals}-${match.visitor_goals}`}
            </span>
          ) : (
            `${format(new Date(match.date), "dd/MM hh:mm")}`
          )}
        </div>
        <div className=" text-left text-base">
          {visitorTeamImg}
          <span
            className={`px-1 sm:px-2 ${
              selectedTeam &&
              match.visitor_team === selectedTeam.id &&
              "font-bold"
            }`}
          >
            {truncateString({
              text: getTeamNameWithId(match.visitor_team),
              desiredLenght: 20,
            })}
          </span>
        </div>
        {isOwner && (
          <div className="flex justify-center">
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
          </div>
        )}
        <input type="checkbox" className="hiddden peer"></input>
        <div className="hidden peer-checked:inline">
          {!!match.local_scorers?.length && (
            <p>local scorers: {match.local_scorers}</p>
          )}
          {!!match.visitor_scorers?.length && (
            <p>visitor scorers:{match.visitor_scorers}</p>
          )}
        </div>
      </div>
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
        <div
          key={i}
          hoverable={true}
          className="styled-table mb-6 w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <div className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <div colSpan="4" className="px-6 py-2">
              {`Match day ${i + 1}`}
            </div>
          </div>

          <div>{groupMatches.map((match, i) => renderMatch(match, i))}</div>
        </div>
      ))}

      {isOwner && !_.isEmpty(matchToEdit) && (
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
