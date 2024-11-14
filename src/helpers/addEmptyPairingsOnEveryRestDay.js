import "../types.js";

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
