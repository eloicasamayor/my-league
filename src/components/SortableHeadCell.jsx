// Components
import { Table } from "flowbite-react";
import { ArrowUpDown } from "./icons";

export function SortableHeadCell({ param, orderBy, clickOrderBy }) {
  return (
    <Table.HeadCell
      onClick={() => clickOrderBy(param)}
      className={`cursor-pointer px-4 ${
        orderBy.param === param ? "text-violet-500" : ""
      }`}
    >
      <div className={`flex ${orderBy.param !== param && "pr-4"}`}>
        {param}
        {orderBy.param === param && (
          <ArrowUpDown isUp={!orderBy.direction} svgClassName="w-4 inline" />
        )}
      </div>
    </Table.HeadCell>
  );
}
