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
}) {
  const insertLeagueReqRes = await insertLeague({
    name: leagueName,
    urlname: nameToUrlName(leagueName),
    description: leagueDescription,
    owner: ownerId,
  });

  if (insertLeagueReqRes.error) {
    console.log(
      `Error ${insertLeagueReqRes.error.code} : ${insertLeagueReqRes.error.message}`
    );
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
    console.log(
      `Error ${insertTeamsReqRes.error.code} : ${insertTeamsReqRes.error.message}`
    );
    return;
  }

  const insertedTeams = insertTeamsReqRes.data;

  const matchesReq = [];
  matchings.forEach((jornada) => {
    jornada.matches.forEach((match) => {
      matchesReq.push({
        date: jornada.date,
        local_team: insertedTeams.find((team) => team.name === match[0]).id,
        visitor_team: insertedTeams.find((team) => team.name === match[1]).id,
        league: leagueId,
      });
    });
  });
  const insertMatchesReqRes = await insertMatch(matchesReq);
  if (insertMatchesReqRes.error) {
    console.log(
      `Error ${insertMatchesReqRes.error.code} : ${insertMatchesReqRes.error.message}`
    );
    return;
  }
}
