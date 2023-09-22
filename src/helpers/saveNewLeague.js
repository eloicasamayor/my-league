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
}) {
  let message = "League created correctly";
  let isError = false;
  if (!leagueName) {
    return {
      message: "Missing league name",
      isError: true,
    };
  }

  if (teams.length < 2) {
    return {
      message: "Need more teams to create the league",
      isError: true,
    };
  }
  if (players.some((team) => team.length < 1)) {
    return {
      message: "There is at least a team with no players",
      isError: true,
    };
  }
  if (!matchings.length) {
    return {
      message: "Access the matchings tab to generate them",
      isError: true,
    };
  }

  const insertLeagueReqRes = await insertLeague({
    name: leagueName,
    urlname: nameToUrlName(leagueName),
    description: leagueDescription,
    owner: ownerId,
  });

  if (insertLeagueReqRes.error) {
    return {
      isError: true,
      message: insertLeagueReqRes.error.message,
    };
  }
  const leagueId = insertLeagueReqRes.data[0].id;
  const teamsReq = teams.map((team) => ({
    name: team,
    urlname: nameToUrlName(team),
    league: leagueId,
  }));

  const insertTeamsReqRes = await insertTeam(teamsReq);
  if (insertTeamsReqRes.error) {
    return {
      isError: true,
      message: insertTeamsReqRes.error.message,
    };
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
    return {
      isError: true,
      message: insertMatchesReqRes.error.message,
    };
  }

  // insert players
  const playersReq = [];
  let teamIndex = 0;
  players.forEach((teamPlayers) => {
    teamPlayers.forEach((player) => {
      playersReq.push({
        name: player,
        team: insertedTeams[teamIndex].id,
        league: leagueId,
      });
    });
    teamIndex = teamIndex + 1;
  });

  const insertPlayersReqRes = await insertPlayer(playersReq);
  if (insertMatchesReqRes.error) {
    return {
      isError: true,
      message: insertPlayersReqRes.error.message,
    };
  }
  return { isError, message };
}
