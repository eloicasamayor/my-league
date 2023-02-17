// Dependencies
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";

// Components
import { PhotoIcon } from "./icons/PhotoIcon";

export function LeaguesList({ leaguesData, leaguesIsLoading }) {
  if (leaguesIsLoading) {
    return "loading...";
  }
  if (!leaguesData) {
    return "no data :/";
  }

  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell className="px-6 py-3"></Table.HeadCell>
        <Table.HeadCell className="px-6 py-3">name</Table.HeadCell>
        <Table.HeadCell className="px-6 py-3">description</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {leaguesData.map((league) => (
          <Table.Row
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={league.id}
          >
            <Table.Cell
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {league.img ? (
                <img
                  src={league.img}
                  className={
                    "inline-block h-10 w-10 rounded-xl ring-2 ring-white"
                  }
                ></img>
              ) : (
                <PhotoIcon
                  svgClassName={"block h-10 w-10 rounded-xl ring-2 ring-white"}
                />
              )}
            </Table.Cell>
            <Table.Cell className="px-6 py-4">
              <Link to={league.urlname}>{league.name}</Link>
            </Table.Cell>
            <Table.Cell className="px-6 py-4">{league.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
