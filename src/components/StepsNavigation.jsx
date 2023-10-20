export function StepsNavigation({ selectedTab, setSelectedTab, steps }) {
  return (
    <ol
      className="h-10 flex my-2
 gap-1 justify-center sm:gap-6 lg:gap-20 border-b"
    >
      {steps.map((step, index) => (
        <li
          key={`${index}_${step}`}
          className={`flex p-0 px-1 text-md cursor-pointer sm:text-2xl " + ${
            selectedTab === index
              ? "text-violet-500 border-b-2 border-violet-500"
              : "text-zinc-500"
          }
          `}
          onClick={() => {
            setSelectedTab(index);
          }}
        >
          {step}
        </li>
      ))}
    </ol>
  );
}
