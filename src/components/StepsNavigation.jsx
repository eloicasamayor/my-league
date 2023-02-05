export function StepsNavigation({
  selectedTab,
  setSelectedTab,
  onSelectMatchings,
}) {
  return (
    <ol className="h-8 flex gap-6 mx-2 my-2 items-center justify-center">
      <li
        className={`p-2 text-2xl cursor-pointer " + ${
          selectedTab === 0 ? "text-violet-200" : "text-zinc-500"
        }
          `}
        onClick={() => setSelectedTab(0)}
      >
        Teams
      </li>

      <li
        className={`p-2 text-2xl cursor-pointer font-medium " + ${
          selectedTab === 1 ? "" : "text-zinc-500"
        }
          `}
        onClick={() => {
          setSelectedTab(1);
          onSelectMatchings();
        }}
      >
        Dates
      </li>
      <li
        className={`p-2 text-2xl cursor-pointer " + ${
          selectedTab === 2 ? "" : "text-zinc-500"
        }
          `}
        onClick={() => {
          setSelectedTab(2);
          onSelectMatchings();
        }}
      >
        Matchings
      </li>
    </ol>
  );
}
