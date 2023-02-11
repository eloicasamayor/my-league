// Helper
import { nameToUrlName } from "./nameToUrlName";

export async function saveNewLeague({
  leagueName,
  leagueDescription,
  ownerId,
  teams,
  matchings,
  insertLeague,
  insertTeam,
  insertMatch,
  setAlertMessage,
}) {
  if (!leagueName) {
    setAlertMessage("Missing league name");
    return;
  }

  debugger;
  if (teams.length < 2) {
    setAlertMessage("Need more teams to create the league");
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
  return { success: true, message: "League created correctly" };
}
