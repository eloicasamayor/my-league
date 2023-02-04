// Helpers
import {
  parseISO,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns";

export function getFirstMatchDay({ dayOfTheWeek, startingDay }) {
  const startingDayDate = parseISO(startingDay);

  switch (parseInt(dayOfTheWeek)) {
    case 0:
      return isMonday(startingDayDate)
        ? startingDayDate
        : nextMonday(startingDayDate);
    case 1:
      return isTuesday(startingDayDate)
        ? startingDayDate
        : nextTuesday(startingDayDate);
    case 2:
      return isWednesday(startingDayDate)
        ? startingDayDate
        : nextWednesday(startingDayDate);
    case 3:
      return isThursday(startingDayDate)
        ? startingDayDate
        : nextThursday(startingDayDate);
    case 4:
      return isFriday(startingDayDate)
        ? startingDayDate
        : nextFriday(startingDayDate);
    case 5:
      return isSaturday(startingDayDate)
        ? startingDayDate
        : nextSaturday(startingDayDate);
    case 6:
      return isSunday(startingDayDate)
        ? startingDayDate
        : nextSunday(startingDayDate);
  }
}
