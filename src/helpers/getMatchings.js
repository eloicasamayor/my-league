/**
 *
 * @param {string[]} teams
 * @returns {string[][][]}
 */
export function getMatchings(teams) {
  /**
   * @type {string[][][]}
   */
  if (!teams.length) {
    return [];
  }

  let schedule = [];
  // .slice per fer una còpia del array teams.
  // Si fes let league = teams, qualsevol canvi a teams afectaria també a league.
  let teamsList = teams.slice();

  // Si el num d'equips és senar afegim l'equip "None", així tenim un número parell.
  if (teamsList.length % 2) {
    teamsList.push("None");
  }

  let numTeams = teamsList.length;

  // el número de jornades serà (teamsList.length - 1) * 2
  for (let j = 0; j < (numTeams - 1) * 2; j++) {
    schedule[j] = [];
    for (let i = 0; i < numTeams / 2; i++) {
      // De la llista teamsList, s'emparella el primer amb l'últim, el segon amb el penúltim, etc.
      const teamA = teamsList[i];
      const teamB = teamsList[numTeams - 1 - i];
      // Si un dels dos equips que s'haurien d'emparellar es "None", no s'afegeixen al calendari.
      if (teamA !== "None" && teamB !== "None") {
        // girem l'emparellament depenent de la ronda
        schedule[j].push(j % 2 === 1 ? [teamA, teamB] : [teamB, teamA]);
      }
    }

    // Posem l'últim equip a la segona posició. Així cada ronda de partits serà diferent de l'anterior.
    const lastTeam = teamsList.pop();
    teamsList.splice(1, 0, lastTeam);
  }

  return schedule;
}
