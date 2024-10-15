export function validateNewLeague({ leagueName, teams, matchings, players }) {
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
  } else {
    return {
      isError: false,
      message: "",
    };
  }
}
