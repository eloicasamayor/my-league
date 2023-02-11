// Helpers
import { addDays, format } from "date-fns";
import { ArrowDownDoble } from "./icons/ArrowDownDoble";

export function LeagueDay({
  teams,
  jornada,
  indexJornada,
  matchings,
  setMatchings,
}) {
  function skipThisWeek(indexJornada) {
    let matchingsCopy = [];
    matchingsCopy = matchings.map((m, i) => {
      if (i < indexJornada) {
        return m;
      }
      return { ...m, date: addDays(m.date, 7) };
    });

    setMatchings(matchingsCopy);
  }
  const equiposQueJuegan = [];
  jornada.matches.forEach((e) => equiposQueJuegan.push(...e));
  const equiposQueDescansan = teams.filter(
    (t) => !equiposQueJuegan.find((e) => e === t)
  );
  return (
    <li className="w-full rounded-md bg-zinc-700/75 block p-1">
      <div className="flex justify-between">
        <p>{format(jornada.date, "EEEE dd MMM yyyy")}</p>
        <button onClick={() => skipThisWeek(indexJornada)}>
          <ArrowDownDoble />
          skip week
        </button>
      </div>

      {jornada.matches.map((match) => (
        <div
          className="inline-block rounded-full bg-zinc-900 py-1 px-2 mr-2"
          key={`${match[0]}vs${match[1]}`}
        >{`${match[0]} - ${match[1]}`}</div>
      ))}
      {!!equiposQueDescansan.length && (
        <div className="inline-block rounded-full bg-zinc-900 py-1 px-2 mr-2">
          {`${equiposQueDescansan} rests`}
        </div>
      )}
    </li>
  );
}
