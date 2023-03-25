// Helper
import { nameToUrlName } from "./nameToUrlName";

export async function saveNewLeague({
  leagueName,
  leagueDescription,
  ownerId,
  teams,
  matchings,
  players,
  insertLeague,
  insertTeam,
  insertMatch,
  insertPlayer,
  setAlertMessage,
}) {
  if (!leagueName) {
    setAlertMessage({ message: "Missing league name", isError: true });
    return;
  }

  if (teams.length < 2) {
    setAlertMessage({
      message: "Need more teams to create the league",
      isError: true,
    });
    return;
  }
  if (players.some((team) => team.length < 1)) {
    setAlertMessage({
      message: "There is a team with no players",
      isError: true,
    });
    return;
  }
  const insertLeagueReqRes = await insertLeague({
    name: leagueName,
    urlname: nameToUrlName(leagueName),
    description: leagueDescription,
    owner: ownerId,
  });

  if (insertLeagueReqRes.error) {
    return;
  }
  const leagueId = insertLeagueReqRes.data[0].id;
  const teamsReq = teams.map((team) => ({
    name: team,
    urlname: nameToUrlName(team),
    league: leagueId,
  }));

  const insertTeamsReqRes = await insertTeam(teamsReq);
  if (insertTeamsReqRes.error) {
    return;
  }

  const insertedTeams = insertTeamsReqRes.data;

  const matchesReq = [];
  matchings.forEach((jornada, numJornada) => {
    jornada.matches.forEach((match) => {
      matchesReq.push({
        date: jornada.date,
        local_team: insertedTeams.find((team) => team.name === match[0]).id,
        visitor_team: insertedTeams.find((team) => team.name === match[1]).id,
        league: leagueId,
        match_day: numJornada + 1,
      });
    });
  });
  const insertMatchesReqRes = await insertMatch(matchesReq);
  if (insertMatchesReqRes.error) {
    return;
  }

  // insert players
  const playersReq = [];
  let teamIndex = 0;
  players.forEach((teamPlayers) => {
    teamPlayers.forEach((player) => {
      playersReq.push({ name: player, team: insertedTeams[teamIndex].id });
    });
    teamIndex = teamIndex + 1;
  });

  const insertPlayersReqRes = await insertPlayer(playersReq);
  if (insertMatchesReqRes.error) {
    return;
  }
  return { success: true, message: "League created correctly" };
}
