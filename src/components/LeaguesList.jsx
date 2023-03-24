// Dependencies
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

// Components
import { PhotoIcon } from "./icons/PhotoIcon";

export function LeaguesList({ leaguesData, leaguesIsLoading }) {
  const navigate = useNavigate();
  if (leaguesIsLoading) {
    return "loading...";
  }
  if (!leaguesData) {
    return "no data :/";
  }

  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell className="px-6 py-3 text-base"></Table.HeadCell>
        <Table.HeadCell className="px-6 py-3 text-base">name</Table.HeadCell>
        <Table.HeadCell className="px-6 py-3 text-base">
          description
        </Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {leaguesData.map((league) => (
          <Table.Row
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
            key={league.id}
            onClick={() => navigate(league.urlname)}
          >
            <Table.Cell className="px-1 md:px-6 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {league.img ? (
                <img
                  src={league.img}
                  className={
                    "inline-block h-10 w-10 rounded-xl ring-2 ring-white"
                  }
                ></img>
              ) : (
                <div className="inline-block h-10 w-10 rounded-xl ring-2 ring-white bg-violet-100 p-1">
                  <PhotoIcon
                    svgClassName={"stroke-violeta-600"}
                    pathClassName={"stroke-violet-400"}
                  />
                </div>
              )}
            </Table.Cell>
            <Table.Cell className="px-1 md:px-6 py-2 md:py-4 text-base">
              {league.name}
            </Table.Cell>
            <Table.Cell className="px-1 md:px-6 py-2 md:py-4 text-base">
              {league.description}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
