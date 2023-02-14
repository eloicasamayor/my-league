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
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3"></th>
            <th scope="col" class="px-6 py-3">
              name
            </th>
            <th scope="col" class="px-6 py-3">
              description
            </th>
          </tr>
        </thead>
        <tbody>
          {leaguesData.map((league) => (
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={league.id}
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                    svgClassName={
                      "block h-10 w-10 rounded-xl ring-2 ring-white"
                    }
                  />
                )}
              </th>
              <td class="px-6 py-4">
                <Link to={league.urlname}>{league.name}</Link>
              </td>
              <td class="px-6 py-4">{league.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
