export function StepsNavigation({
  selectedTab,
  setSelectedTab,
  onSelectMatchings,
}) {
  return (
    <ol className="h-8 flex gap-2 m-2">
      <li
        className={`p-2 btn ${
          selectedTab === 0 ? "border-solid border-2 border-stone-100" : ""
        }`}
        onClick={() => setSelectedTab(0)}
      >
        1. League info
      </li>
      <li
        className={`p-2 btn " + ${
          selectedTab === 1 ? "border-solid border-2 border-stone-100" : ""
        }
          `}
        onClick={() => setSelectedTab(1)}
      >
        2. Teams
      </li>

      <li
        className={`p-2 btn " + ${
          selectedTab === 2 ? "border-solid border-2 border-stone-100" : ""
        }
          `}
        onClick={() => {
          setSelectedTab(2);
          onSelectMatchings();
        }}
      >
        3. Dates
      </li>
      <li
        className={`p-2 btn " + ${
          selectedTab === 3 ? "border-solid border-2 border-stone-100" : ""
        }
          `}
        onClick={() => {
          setSelectedTab(3);
          onSelectMatchings();
        }}
      >
        4. Matchings
      </li>
    </ol>
  );
}
