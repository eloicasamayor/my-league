// Dependencies
import { Draggable } from "@hello-pangea/dnd";

// Components
import { DragDropIcon } from "./icons";

export function LeagueDay({ teams, jornada, indexJornada }) {
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
            className="bg-slate-700 p-1 relative pr-10 w-full grid gap-1 md:grid-cols-2"
          >
            <div
              className="absolute bottom-2 right-2"
              {...provided.dragHandleProps}
            >
              <DragDropIcon svgClassName=" stroke-0 fill-slate-300" />
            </div>
            {jornada.matches.map((match) => (
              <div
                className="rounded-full bg-zinc-300 py-[0.15rem] px-2"
                key={`${match[0]}vs${match[1]}`}
              >{`${match[0]} - ${match[1]}`}</div>
            ))}
            {!!equiposQueDescansan.length && (
              <div className="inline-block rounded-full bg-zinc-300 py-[0.15rem] px-2">
                {`${equiposQueDescansan} rests`}
              </div>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}
