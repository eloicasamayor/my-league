// Dependencies
import { Draggable } from "@hello-pangea/dnd";

// Components
import { Button } from "flowbite-react";
import { DragDropIcon } from "./icons";

// Helpers
import { addDays, format } from "date-fns";
import { ArrowDownDoble } from "./icons";

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
    <Draggable draggableId={jornada.date.toString()} index={indexJornada}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="w-full rounded-md  block p-1 border-2 bg-white	g"
          >
            <div className="flex justify-between">
              <p>{format(jornada.date, "EEEE dd MMM yyyy")}</p>
              <Button color="light" onClick={() => skipThisWeek(indexJornada)}>
                <ArrowDownDoble />
                skip week
              </Button>
              <div {...provided.dragHandleProps}>
                <DragDropIcon svgClassName=" stroke-0 fill-slate-300" />
              </div>
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
          </div>
        );
      }}
    </Draggable>
  );
}
