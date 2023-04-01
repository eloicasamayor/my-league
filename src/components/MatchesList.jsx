import _ from "lodash";
import { useState } from "react";
import { EditMatchForm } from "./forms";
import { PencilIcon } from "./icons/PencilIcon";
import { Modal } from "./modal";
import { format } from "date-fns";
import { Table } from "flowbite-react";

export function MatchesList({
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

  if (selectedTeam) {
    matchesData = matchesData.filter((match) => {
      return (
        match.local_team === selectedTeam.id ||
        match.visitor_team === selectedTeam.id
      );
    });
  }

  return (
    <section>
      {matchesIsLoading ? (
        <h2>loading ...</h2>
      ) : (
        <>
          {matchesData.length ? (
            <Table hoverable={true}>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>local team</Table.HeadCell>
                  <Table.HeadCell></Table.HeadCell>
                  <Table.HeadCell></Table.HeadCell>
                  <Table.HeadCell>visitor team</Table.HeadCell>
                  <Table.HeadCell>date</Table.HeadCell>
                  <Table.HeadCell>match day</Table.HeadCell>
                  <Table.HeadCell>played</Table.HeadCell>
                  {isOwner && !selectedTeam && (
                    <Table.HeadCell></Table.HeadCell>
                  )}
                </Table.Row>
              </Table.Head>
              <tbody>
                {matchesData.map((match, i) => (
                  <Table.Row key={match.date + i}>
                    <Table.Cell>
                      {getTeamNameWithId(match.local_team)}
                    </Table.Cell>
                    <Table.Cell>{match.local_goals}</Table.Cell>
                    <Table.Cell>{match.visitor_goals}</Table.Cell>
                    <Table.Cell>
                      {getTeamNameWithId(match.visitor_team)}
                    </Table.Cell>
                    <Table.Cell>
                      {format(new Date(match.date), "eeee dd MMM yyyy")}
                    </Table.Cell>
                    <Table.Cell>{match.match_day}</Table.Cell>
                    <Table.Cell>{match.played.toString()}</Table.Cell>
                    {isOwner && !selectedTeam && (
                      <Table.Cell>
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
                          <PencilIcon />
                        </Button>
                      </Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </tbody>
            </Table>
          ) : (
            "No matches found for this team"
          )}
          {isOwner && !selectedTeam && !_.isEmpty(matchToEdit) && (
            <Modal title="Edit match" onCloseModal={() => setMatchToEdit(null)}>
              <EditMatchForm
                matchToEdit={matchToEdit}
                playersData={playersData}
                teamsData={teamsData}
              />
            </Modal>
          )}
        </>
      )}
    </section>
  );
}
