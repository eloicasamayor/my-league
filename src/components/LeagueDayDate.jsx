import { format } from "date-fns";

export function LeagueDayDate({
  jornada,
  indexJornada,
  heightJornada,
  skipThisWeek,
  playThisWeek,
  teams,
}) {
  const equiposQueJuegan = [];
  jornada.matches.forEach((e) => equiposQueJuegan.push(...e));
  const equiposQueDescansan = teams.filter(
    (t) => !equiposQueJuegan.find((e) => e === t)
  );
  return (
    <div
      style={{
        height: `${heightJornada}px`,
      }}
    >
      <div
        className={`w-[calc(100%-1rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-6rem)]  xl:w-[calc(100%-23rem)] bg-slate-300 absolute rounded-xl justify-between h-full pt-2 pl-2`}
        style={{
          height: `${heightJornada}px`,
        }}
      >
        <div className="w-[80px]">
          <p>{format(jornada.date, "dd MMM")}</p>
          {equiposQueDescansan.length > 1 ? (
            <a
              className="text-sm block"
              onClick={() => playThisWeek(indexJornada)}
            >
              play
            </a>
          ) : (
            <a
              className="text-sm block"
              onClick={() => skipThisWeek(indexJornada)}
            >
              rest
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
