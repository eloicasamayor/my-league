// Helpers
import { addDays, format } from "date-fns";

export function LeagueDay({
  teams,
  jornada,
  indexJornada,
  matchings,
  setMatchings,
}) {
  debugger;
  function skipThisWeek(indexJornada, isSkip) {
    let matchingsCopy = [];
    if (isSkip) {
      matchingsCopy = matchings.map((m, i) => {
        if (i < indexJornada) {
          return m;
        }
        if (i === indexJornada) {
          return { date: m.date, matches: [] };
        }
        return { date: addDays(m.date, 7), matches: matchings[i - 1].matches };
      });
      matchingsCopy.push({
        date: matchings[matchings.length - 1].date,
        matches: matchings[matchings.length - 1].matches,
      });
    } else {
      matchingsCopy = matchings.map((m, i) => {
        if (i < indexJornada) {
          return m;
        }
        if (i >= indexJornada && i < matchings.length - 1) {
          return { date: m.date, matches: matchings[i + 1].matches };
        }
      });
      matchingsCopy.pop();
    }
    setMatchings(matchingsCopy);
  }
  const equiposQueJuegan = [];
  jornada.matches.forEach((e) => equiposQueJuegan.push(...e));
  const equiposQueDescansan = teams.filter(
    (t) => !equiposQueJuegan.find((e) => e === t)
  );
  return (
    <li className="w-full rounded-md bg-zinc-700/75 block p-1">
      <p>{format(jornada.date, "EEEE dd MMM yyyy")}</p>
      <p>
        skip this week{" "}
        <input
          type={"checkbox"}
          onChange={(e) => skipThisWeek(indexJornada, e.target.checked)}
        />
      </p>
      {jornada.matches.map((match) => (
        <div className="inline-block rounded-full bg-zinc-900 py-1 px-2 mr-2">{`${match[0]} - ${match[1]}`}</div>
      ))}
      {!!equiposQueDescansan.length && (
        <div className="inline-block rounded-full bg-zinc-900 py-1 px-2 mr-2">
          {`${equiposQueDescansan} rests`}
        </div>
      )}
    </li>
  );
}
