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
