// Components
import { Select } from "flowbite-react";

export function WeekDaySelect({ options, value, onChange }) {
  return (
    <div id="select">
      <div className="mb-2 block">
        <label className="text-sm" htmlFor="day-of-the-week">
          There will be matches on{" "}
        </label>
      </div>
      <Select
        id="day-of-the-week"
        required={true}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
