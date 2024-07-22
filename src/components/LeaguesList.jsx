// Dependencies
import { Table, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

// Components
import { PhotoIcon } from "./icons/PhotoIcon";
import { useEffect, useState } from "react";

export function LeaguesList({ authData, leaguesData, leaguesIsLoading }) {
  const navigate = useNavigate();
  const [filteredLeaguesData, setFilteredLeaguesData] = useState(
    () => leaguesData?.length && leaguesData
  );
  const [isMyLeagues, setIsMyLeagues] = useState(true);

  useEffect(() => {
    const filteredLeagues =
      authData?.user?.id && isMyLeagues && leaguesData?.length
        ? leaguesData.filter((league) => league.owner === authData?.user?.id)
        : leaguesData;
    setFilteredLeaguesData(filteredLeagues);
  }, [isMyLeagues, JSON.stringify(authData), JSON.stringify(leaguesData)]);

  if (leaguesIsLoading) {
    return <p>{"loading..."}</p>;
  }
  if (!leaguesData || !filteredLeaguesData?.length) {
    return <p>{"no data"}</p>;
  }

  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell className="text-base"></Table.HeadCell>
        <Table.HeadCell className="text-base flex justify-between items-center">
          name
          {authData?.user?.id && (
            <Button.Group>
              <Button
                color={isMyLeagues ? "gray" : "info"}
                onClick={() => setIsMyLeagues(false)}
              >
                All
              </Button>
              <Button
                color={!isMyLeagues ? "gray" : "info"}
                onClick={() => setIsMyLeagues(true)}
              >
                My leagues
              </Button>
            </Button.Group>
          )}
        </Table.HeadCell>
        <Table.HeadCell className="text-base">Description</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {filteredLeaguesData?.map((league) => (
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
