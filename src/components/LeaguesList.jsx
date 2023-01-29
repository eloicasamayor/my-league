// Dependencies
import { Link } from "react-router-dom";

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
    <>
      <table>
        <tr>
          <th></th>
          <th>name</th>
          <th>description</th>
        </tr>
        {leaguesData.map((league) => (
          <tr key={league.id}>
            <td>
              {league.img ? (
                <img
                  src={league.img}
                  className={
                    "inline-block h-10 w-10 rounded-xl ring-2 ring-white"
                  }
                ></img>
              ) : (
                <PhotoIcon
                  svgClassName={
                    "p-2 inline-block h-10 w-10 rounded-xl ring-2 ring-white"
                  }
                />
              )}
            </td>
            <td>
              <Link to={league.urlname}>{league.name}</Link>
            </td>
            <td>{league.description}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
