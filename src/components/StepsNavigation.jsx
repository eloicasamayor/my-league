import { ArrowRight } from "./icons/ArrowRight";
export function StepsNavigation({
  selectedTab,
  setSelectedTab,
  onSelectMatchings,
}) {
  return (
    <ol className="h-8 flex mx-2 my-2 items-center gap-1 justify-center">
      <li
        className={`flex items-center p-2 text-2xl cursor-pointer " + ${
          selectedTab === 0 ? "text-violet-200" : "text-zinc-500"
        }
          `}
        onClick={() => setSelectedTab(0)}
      >
        {"Teams"}
        <ArrowRight
          svgClassName={
            selectedTab === 0 ? "stroke-violet-200" : "stroke-zinc-500"
          }
        />
      </li>
      <li
        className={`flex items-center gap-2 p-2 text-2xl cursor-pointer " + ${
          selectedTab === 1 ? "text-violet-200" : "text-zinc-500"
        }
          `}
        onClick={() => setSelectedTab(1)}
      >
        Players
        <ArrowRight
          svgClassName={
            selectedTab === 1 ? "stroke-violet-200" : "stroke-zinc-500"
          }
        />
      </li>

      <li
        className={`flex items-center gap-2 p-2 text-2xl cursor-pointer font-medium " + ${
          selectedTab === 2 ? "" : "text-zinc-500"
        }
          `}
        onClick={() => {
          setSelectedTab(2);
          onSelectMatchings();
        }}
      >
        Dates
        <ArrowRight
          svgClassName={
            selectedTab === 2 ? "stroke-violet-200" : "stroke-zinc-500"
          }
        />
      </li>
      <li
        className={`flex items-center gap-2 p-2 text-2xl cursor-pointer " + ${
          selectedTab === 3 ? "" : "text-zinc-500"
        }
          `}
        onClick={() => {
          setSelectedTab(3);
          onSelectMatchings();
        }}
      >
        Matchings
        <ArrowRight
          svgClassName={
            selectedTab === 3 ? "stroke-violet-200" : "stroke-zinc-500"
          }
        />
      </li>
    </ol>
  );
}
