// Dependencies
import { addDays } from "date-fns";

// helpers
import { getFirstMatchDay } from "./getFirstMatchDay";

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
export function shuffleMatchings(matchings, teamsCopy) {
  return matchings.map((m, i) => ({ ...m, matches: teamsCopy[i] }));
}
