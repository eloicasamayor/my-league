// Dependencies
import _ from "lodash";
import { useState, useRef } from "react";
import { Button } from "flowbite-react";
import { format } from "date-fns";

// Components
import { EditMatchForm } from "./forms";
import { Modal } from "./Modal";
import { TeamIcon, PencilIcon } from "./icons";

// Helpers
import { truncateString } from "../helpers";

/**
 * @param {object} params
 * @param {{id: number, name: string, img: string}[]} params.teams
 * @param {{id: number} | null} params.selectedTeam
 * @param {{local_team: object, visitor_team: object}[]} params.matchesData
 * @param {boolean} params.matchesIsLoading
 * @param {object} params.playersData
 * @param {object} params.teamsData
 * @param {boolean} params.isOwner
 * @param {function} params.setAlertMessage
 * @returns
 */
export function MatchesCalendar({
  teams,
  selectedTeam = null,
  matchesData,
  matchesIsLoading,
  playersData,
  teamsData,
  isOwner,
  setAlertMessage,
}) {
  const [matchToEdit, setMatchToEdit] = useState({});
  const [seeMatchDetails, setSeeMatchDetails] = useState([]);
  let matchIndex = 0;

  if (matchesIsLoading) {
    return <p>{"loading..."}</p>;
  }
  if (!matchesData.length) {
    return <p>{"no matches :("}</p>;
  }
  function getTeamNameWithId(id) {
    const teamFound = teams.find((team) => team.id === id);
    if (teamFound) {
      teamFound.name;
    } else {
      return id;
    }
  }

  function getTeamImgWithId(id) {
    const teamFound = teams.find((team) => team.id === id);
    if (teamFound) {
      return teamFound.img;
    } else {
      return id;
    }
  }

  function getPlayerNameWithId(id) {
    const playerFound = playersData.find((player) => player.id === id);
    if (playerFound) {
      return playerFound.name;
    } else {
      return id;
    }
  }

  function renderMatch(match, i) {
    matchIndex++;
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
        className={`bg-white hover:bg-gray-50 dark:hover:bg-gray-600 border-b dark:bg-gray-800 dark:border-gray-700 grid ${
          isOwner ? "grid-cols-[3fr_1fr_3fr_0.5fr]" : "grid-cols-[3fr_1fr_3fr]"
        } p-2 items-center`}
        data-matchindex={matchIndex}
        onClick={(e) => {
          let index = e.currentTarget.dataset.matchindex;
          setSeeMatchDetails((old) => {
            const newArray = [...old];
            newArray[index] = !old[index];
            return newArray;
          });
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
        <ul
          className={`text-right pt-2 ${
            seeMatchDetails[matchIndex] ? "inline" : "hidden"
          }`}
        >
          {match.local_scorers?.length
            ? match.local_scorers.map((id) => (
                <li>{getPlayerNameWithId(id)}</li>
              ))
            : ""}
        </ul>
        <p
          className={`text-center pt-2 ${
            seeMatchDetails[matchIndex] ? "inline" : "hidden"
          }`}
        >
          scorers
        </p>
        <ul
          className={`text-left pt-2 ${
            seeMatchDetails[matchIndex] ? "inline" : "hidden"
          }`}
        >
          {match.visitor_scorers?.length
            ? match.visitor_scorers.map((id) => (
                <li>{getPlayerNameWithId(id)}</li>
              ))
            : ""}
        </ul>
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
    return <p>No matches</p>;
  }
  const groupedMatchesData = _.groupBy(matchesData, (match) => match.match_day);
  return (
    <section>
      {Object.values(groupedMatchesData).map((groupMatches, i) => (
        <div
          key={i}
          className="styled-table mb-6 w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <div className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <div className="px-6 py-2">{`Match day ${i + 1}`}</div>
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
