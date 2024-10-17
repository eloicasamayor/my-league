// Dependencies
import { addDays } from "date-fns";

// helpers
import { getFirstMatchDay } from "./getFirstMatchDay";

/**
 * @param {{matchings: string[][][], weekDayValue: number, startingDateValue: string}} param
 */
export function addDatesToMatchings({
  matchings,
  weekDayValue,
  startingDateValue,
}) {
  let firstDay = getFirstMatchDay({
    dayOfTheWeek: weekDayValue,
    startingDay: startingDateValue,
  });
  let day = firstDay;

  const matchingsWithDates = matchings.map((matchs, i) => {
    if (i !== 0) {
      day = addDays(day, 7);
    }
    return {
      matches: matchs,
      date: day,
    };
  });
  return matchingsWithDates;
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
