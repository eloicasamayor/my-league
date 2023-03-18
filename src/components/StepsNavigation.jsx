import { ArrowRight } from "./icons/ArrowRight";
export function StepsNavigation({
  selectedTab,
  setSelectedTab,
  onSelectMatchings,
}) {
  return (
    <ol className="h-8 flex my-2 items-center gap-1 justify-center sm:gap-6 lg:gap-20">
      <li
        className={`flex items-center p-0 text-2xl cursor-pointer " + ${
          selectedTab === 0 ? "text-violet-500" : "text-zinc-500"
        }
          `}
        onClick={() => setSelectedTab(0)}
      >
        {"Teams"}
      </li>
      <li
        className={`flex items-center p-0 text-2xl cursor-pointer " + ${
          selectedTab === 1 ? "text-violet-500" : "text-zinc-500"
        }
          `}
        onClick={() => setSelectedTab(1)}
      >
        Players
      </li>

      <li
        className={`flex items-center p-0 text-2xl cursor-pointer " + ${
          selectedTab === 2 ? "text-violet-500" : "text-zinc-500"
        }
          `}
        onClick={() => {
          setSelectedTab(2);
          onSelectMatchings();
        }}
      >
        Dates
      </li>
      <li
        className={`flex items-center p-0 text-2xl cursor-pointer " + ${
          selectedTab === 3 ? "text-violet-500" : "text-zinc-500"
        }
          `}
        onClick={() => {
          setSelectedTab(3);
          onSelectMatchings();
        }}
      >
        Matchings
      </li>
    </ol>
  );
}
