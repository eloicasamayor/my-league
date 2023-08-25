// Components
import { Button } from "flowbite-react";

// Helpers
import { addDays, format } from "date-fns";
import { ArrowDownDoble } from "./icons";
import { Card } from "flowbite-react";

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
    <Card className="w-full rounded-md  block p-1">
      <div className="flex justify-between">
        <p>{format(jornada.date, "EEEE dd MMM yyyy")}</p>
        <Button color="light" onClick={() => skipThisWeek(indexJornada)}>
          <ArrowDownDoble />
          skip week
        </Button>
      </div>

      {jornada.matches.map((match) => (
        <div
          className="inline-block rounded-full bg-zinc-300 py-1 px-2 mr-2"
          key={`${match[0]}vs${match[1]}`}
        >{`${match[0]} - ${match[1]}`}</div>
      ))}
      {!!equiposQueDescansan.length && (
        <div className="inline-block rounded-full bg-zinc-300 py-1 px-2 mr-2">
          {`${equiposQueDescansan} rests`}
        </div>
      )}
    </Card>
  );
}
