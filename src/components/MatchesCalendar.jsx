import _ from "lodash";
import { useState } from "react";
import { EditMatchForm } from "./EditMatchForm";
import { PencilIcon } from "./icons/PencilIcon";
import { Modal } from "./modal";
import { format } from "date-fns";

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
      <div
        key={match.date + i}
        className="grid  grid-cols-[minmax(50px,_1fr)_80px_minmax(50px,_1fr)] h-8 items-center bg-zinc-600 p-2"
      >
        <span className="text-right">
          {getTeamNameWithId(match.local_team)}
        </span>
        <span className={`text-center ${match.played ? "text-xl" : "text-sm"}`}>
          {match.played
            ? `${match.local_goals} - ${match.visitor_goals}`
            : format(new Date(match.date), " hh:mm")}
        </span>
        <span className="text-left">
          {getTeamNameWithId(match.visitor_team)}
        </span>
      </div>
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
          {groupMatches.map((match, i) => renderMatch(match, i))}
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
