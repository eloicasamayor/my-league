export function WeekDaySelect({ options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => {
        debugger;
        onChange(e.target.value);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
