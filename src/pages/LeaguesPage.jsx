// Dependencies
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

// Api
import { useGetLeaguesQuery, useInsertLeagueMutation } from "../api/leagues";

//Components
import { EditLeagueForm } from "../components/EditLeagueForm";
import { NewLeagueForm } from "../components/NewLeagueForm";

function LeaguesPage() {
  const { data, refetch, isLoading, isFetching } = useGetLeaguesQuery();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <h1>Leagues</h1>
      <button onClick={() => setIsEditing((prevState) => !prevState)}>
        Edit
      </button>
      {!(isLoading || isFetching) ? (
        <ul>
          {data.map((league) => (
            <li key={league.name}>
              <Link to={`/${league.urlname}`}>{league.name}</Link>
              {isEditing && <EditLeagueForm {...league} />}
            </li>
          ))}
        </ul>
      ) : (
        <p> {"...Loading"}</p>
      )}
      <NewLeagueForm refetch={refetch} />
    </div>
  );
}

export { LeaguesPage };
