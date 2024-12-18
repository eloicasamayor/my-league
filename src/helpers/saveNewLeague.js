// Helper
import { nameToUrlName } from "./nameToUrlName";
import { supabase } from "../supabase";

export async function saveNewLeague({
  leagueName,
  leagueDescription,
  image,
  ownerId,
  teams,
  matchings,
  players,
  insertLeague,
  updateLeague,
  insertTeam,
  insertMatch,
  insertPlayer,
}) {
  let message = "League created correctly";
  let isError = false;

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

  if (image) {
    const formData = new FormData();
    formData.append("files[]", image);

    const { data, error } = await supabase.storage
      .from("leagues-img")
      .upload(`${leagueId + ".jpg"}`, formData, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      const { data: response } = await supabase.storage
        .from("leagues-img")
        .getPublicUrl(`${leagueId + ".jpg"}`);
      updateLeague({
        id: leagueId,
        img: response.publicUrl,
      });
    }
  }

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
