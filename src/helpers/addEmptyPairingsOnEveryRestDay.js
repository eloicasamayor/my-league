/**
 * @typedef {Object} LeagueDatesAndPairingsT
 * @property {string[][]} matches
 * @property {Date} date
 */

/**
 * @param {LeagueDatesAndPairingsT[]} leagueDatesAndPairings
 * @param {string[][]} leaguePairingsArr
 * @returns {LeagueDatesAndPairingsT[]}
 */
export function addEmptyPairingsOnEveryRestDay(
  leagueDatesAndPairings,
  leaguePairingsArr
) {
  const leaguePairings = [...leaguePairingsArr];
  leagueDatesAndPairings.forEach((m, i) => {
    // si en aquesta jornada no hi ha partits, en la mateixa posició de teamsCopy hi afegeixo un array buit.
    if (!m.matches.length) {
      leaguePairings.splice(i, 0, []);
    }
  });

  return leagueDatesAndPairings.map((m, i) => ({
    ...m,
    matches: leaguePairings[i],
  }));
}

/**
 * @typedef {Object} Matchings
 * @property {string[][]} matches
 * @property {Date} date
 */

/**
 * @param {Matchings[]} matchings
 * @param {string[][]} teamsCopy
 * @returns {Matchings[]}
 */
export function shuffleMatchings(matchings, teamsCopy) {
  let ei = matchings.hola;
  matchings.map((m, i) => {
    // si en aquesta jornada no hi ha partits, en la mateixa posició de teamsCopy hi afegeixo un array buit.
    if (!m.matches.length) {
      teamsCopy.splice(i, 0, []);
    }
  });

  return matchings.map((m, i) => ({ ...m, matches: teamsCopy[i] }));
}
