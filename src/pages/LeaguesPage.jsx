// Dependencies
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

// Api
import { useGetLeaguesQuery } from "../redux";

//Components
import { EditLeagueForm, LeaguesList, NewLeagueForm } from "../components";

function LeaguesPage() {
  const {
    data: leaguesData,
    isLoading: leaguesIsLoading,
    isFetching: leaguesIsFetching,
  } = useGetLeaguesQuery();
  const authData = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Leagues</h1>
      <LeaguesList
        leaguesData={leaguesData}
        leaguesIsLoading={leaguesIsLoading}
      />
      {authData?.user?.id && authData?.session ? (
        <NewLeagueForm />
      ) : (
        <>
          <h2>Create new league</h2>
          <p>{"login to create a league"}</p>
        </>
      )}
    </div>
  );
}

export { LeaguesPage };
