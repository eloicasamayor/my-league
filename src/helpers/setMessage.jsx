import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { nameToUrlName } from "./nameToUrlName";
import { CircleCheckIcon } from "../components/icons";

export function setMessage({
  newLeagueReqResult,
  newTeamReqResult,
  newMatchReqResult,
  newPlayerReqResult,
  leagueName,
}) {
  if (newLeagueReqResult.isError) {
    return (
      <>
        <h2>{`Error creating the league`}</h2>
        <p>{`Error code: ${newLeagueReqResult.error.code}`}</p>
        <p>{`${newLeagueReqResult.error.message}`}</p>
      </>
    );
  }
  if (newTeamReqResult.isError) {
    return (
      <>
        <h2>{`Error creating the teams ${newTeamReqResult.error.code}`}</h2>
        <p>{`${newTeamReqResult.error.message}`}</p>
      </>
    );
  }
  if (newMatchReqResult.isError) {
    return (
      <>
        <h2>{`Error creating the teams ${newMatchReqResult.error.code}`}</h2>
        <p>{`${newMatchReqResult.error.message}`}</p>
      </>
    );
  }
  if (newPlayerReqResult.isError) {
    return (
      <>
        <h2>{`Error creating the players ${newPlayerReqResult.error.code}`}</h2>
        <p>{`${newPlayerReqResult.error.message}`}</p>
      </>
    );
  }
  if (
    !newLeagueReqResult.isError &&
    newLeagueReqResult.isSuccess &&
    !newTeamReqResult.isError &&
    newTeamReqResult.isSuccess &&
    !newMatchReqResult.isError &&
    newMatchReqResult.isSuccess &&
    !newPlayerReqResult.isError &&
    newPlayerReqResult.isSuccess
  )
    return (
      <>
        <h2>{`Created league ${leagueName}`}</h2>
        <p>
          <CircleCheckIcon svgClassName={"inline"} /> Teams
        </p>
        <p>
          <CircleCheckIcon svgClassName={"inline"} /> Matches
        </p>
        <p className="mb-5">
          <CircleCheckIcon svgClassName={"inline"} /> Players
        </p>

        <Link to={nameToUrlName(`../${leagueName}`)}>
          <Button>{"Go to the league page"}</Button>
        </Link>
      </>
    );
}
