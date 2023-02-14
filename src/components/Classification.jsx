// Dependencies
import { Link } from "react-router-dom";
import { useState } from "react";
import { _ } from "lodash";
// Components
import { EditTeamForm } from "./EditTeamForm";
import { Modal } from "./modal";
import { PencilIcon } from "./icons/PencilIcon";
import { MoreIcon } from "./icons/MoreIcon";

export function Classification({ data, isLoading, isOwner }) {
  const [teamToEdit, setTeamToEdit] = useState({});
  const [seeAllStats, setSeeAllStats] = useState(true);

  if (isLoading) {
    return "loading...";
  }
  if (!data.length) {
    return "no teams :(";
  }
  return (
    <section>
      <h2>Classification</h2>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
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
                    pathClassName={
                      seeAllStats ? "stroke-white" : "stroke-violet-600"
                    }
                  />
                </label>
              </th>
              <th scope="col" class="px-6 py-3"></th>
              <th scope="col" class="px-6 py-3">
                Points
              </th>
              <th scope="col" class="px-6 py-3">
                Played
              </th>
              {seeAllStats && (
                <>
                  <th scope="col" class="px-6 py-3">
                    Wins
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Draws
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Defeats
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Scored Goals
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Conceded Goals
                  </th>
                </>
              )}
              {isOwner && <th scope="col" class="px-6 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {data.map((team) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={team.id}
              >
                <td class="px-6 py-2">
                  <img src={team.img} className={"w-4"} />
                </td>
                <td class="px-6 py-2">
                  <Link to={"./" + team.urlname}>{team.name}</Link>
                </td>
                <td class="px-6 py-2">{team.points}</td>
                <td class="px-6 py-2">{team.played_matches}</td>
                {seeAllStats && (
                  <>
                    <td class="px-6 py-2">{team.wins}</td>
                    <td class="px-6 py-2">{team.draws}</td>
                    <td class="px-6 py-2">{team.defeats}</td>
                    <td class="px-6 py-2">{team.goals_scored}</td>
                    <td class="px-6 py-2">{team.goals_conceded}</td>
                  </>
                )}
                {isOwner && (
                  <td class="px-6 py-2">
                    <button onClick={() => setTeamToEdit(team)}>
                      <PencilIcon />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOwner && !_.isEmpty(teamToEdit) && (
        <Modal onCloseModal={setTeamToEdit}>
          <EditTeamForm team={teamToEdit} />
        </Modal>
      )}
    </section>
  );
}
