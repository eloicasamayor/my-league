// Components
import { Select } from "flowbite-react";
import { WEEK_DAYS } from "./constants/dates";

export function WeekDaySelect({ value, onChange }) {
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
        {WEEK_DAYS.map((weekday, i) => (
          <option key={i} value={i}>
            {weekday}
          </option>
        ))}
      </Select>
    </div>
  );
}
