import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { WeekDaySelect } from "../src/components/WeekDaySelect";

describe("WeekDaySelect", () => {
  test("renders", () => {
    const onChangeWeekDaySelect = vi.fn();
    const select = render(
      <WeekDaySelect value={1} onChange={onChangeWeekDaySelect} />
    );
    expect(select).toBeDefined();
  });

  test("call onChange function on select", () => {
    const onChangeWeekDaySelect = vi.fn();
    const elementoSelect = render(
      <WeekDaySelect value={1} onChange={onChangeWeekDaySelect} />
    ).getByRole("combobox");
    fireEvent.change(elementoSelect, { target: { value: "1" } });
    expect(onChangeWeekDaySelect).toHaveBeenCalled();
  });
});
