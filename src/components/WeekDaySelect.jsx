import { Select, Label } from "flowbite-react";
export function WeekDaySelect({ options, value, onChange }) {
  /* return (
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
  ); */
  return (
    <div id="select">
      <div className="mb-2 block">
        <Label htmlFor="countries" value="Select your country" />
      </div>
      <Select
        id="countries"
        required={true}
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
      </Select>
    </div>
  );
}
