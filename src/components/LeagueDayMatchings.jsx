// Dependencies
import { Draggable } from "@hello-pangea/dnd";

// Components
import { DragDropIcon, UpdateIcon } from "./icons";
import { useWindowDimensions } from "../helpers";

export function LeagueDayMatchings({
  teams,
  jornada,
  indexJornada,
  reverseTeamsInMatch,
}) {
  const { height, width } = useWindowDimensions();
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
            className="bg-slate-700 p-1 relative pr-10 w-full grid gap-1 md:grid-cols-2 rounded-xl"
          >
            <div
              className="absolute bottom-2 right-2"
              {...provided.dragHandleProps}
            >
              <DragDropIcon svgClassName=" stroke-0 fill-slate-300" />
            </div>
            {jornada.matches.map((match, matchIndex) => (
              <div
                className="rounded-full bg-zinc-300 py-[0.15rem] px-2 h-[1.75rem]"
                key={`${match[0]}vs${match[1]}`}
              >
                {`${match[0]} - ${match[1]}`}
                <button
                  className="ml-2 p-1"
                  onClick={() =>
                    reverseTeamsInMatch({ indexJornada, matchIndex })
                  }
                >
                  {<UpdateIcon w="4" h="4" />}
                </button>
              </div>
            ))}
            {equiposQueDescansan.length === 1 && (
              <div className="inline-block rounded-full bg-amber-200 py-[0.15rem] px-2 h-[1.75rem]">
                {`${
                  equiposQueDescansan.length === 1 ? equiposQueDescansan : "all"
                } rests`}
              </div>
            )}
            {equiposQueDescansan.length > 1 && (
              <div
                className="inline-block rounded-xl bg-amber-200 py-[0.15rem] px-2"
                style={{
                  height: `${
                    Math.ceil(teams.length / (width < 768 ? 2 : 4)) * 32 - 4
                  }px`,
                }}
              >
                {`all teams rest`}
              </div>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}
