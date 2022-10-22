// Dependencies
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

// Api
import { useGetLeaguesQuery, useInsertLeagueMutation } from "../api/leagues";

//Components
import { EditLeagueForm } from "../components/EditLeagueForm";

function LeaguesPage() {
  const nameRef = useRef();
  const urlNameRef = useRef();

  const { data, refetch, isLoading, isFetching } = useGetLeaguesQuery();
  const [insertLeague, requestResult] = useInsertLeagueMutation();
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
            <li>
              <>
                <Link to={`/${league.urlname}`}>{league.name}</Link>
              </>
              {isEditing && <EditLeagueForm {...league} />}
            </li>
          ))}
        </ul>
      ) : (
        <p> {"...Loading"}</p>
      )}
      <h2>Create new league</h2>
      <form>
        <label htmlFor={"name"}>League name:</label>
        <input type={"text"} id={"name"} name={"name"} ref={nameRef} />
        <br />
        <label htmlFor={"urlname"}>Url name:</label>
        <input type={"text"} id={"urlname"} name={"urlname"} ref={urlNameRef} />
        <br />
        <button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            insertLeague({
              name: nameRef.current.value,
              urlname: urlNameRef.current.value,
            });
            refetch();
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
}

export { LeaguesPage };
