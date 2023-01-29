// Helpers
import { format } from "date-fns";

export function LeagueDay({ teams, jornada, indexJornada }) {
  const equiposQueJuegan = [];
  jornada.matches.forEach((e) => equiposQueJuegan.push(...e));
  const equiposQueDescansan = teams.filter(
    (t) => !equiposQueJuegan.find((e) => e === t)
  );
  return (
    <li className="w-full rounded-md bg-zinc-700/75 block p-1">
      <p>{format(jornada.date, "EEEE dd MMM yyyy")}</p>
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
