// Dependencies
import { Link } from "react-router-dom";
import { useState } from "react";

// Api
import { useGetLeaguesQuery } from "../api";

//Components
import { EditLeagueForm, LeaguesList, NewLeagueForm } from "../components";

function LeaguesPage() {
  const {
    data: leaguesData,
    refetch: leaguesRefetch,
    isLoading: leaguesIsLoading,
    isFetching: leaguesIsFetching,
  } = useGetLeaguesQuery();

  return (
    <div>
      <h1>Leagues</h1>
      <LeaguesList
        leaguesData={leaguesData}
        leaguesIsLoading={leaguesIsLoading}
        leaguesRefetch={leaguesRefetch}
      />
      <NewLeagueForm leaguesRefetch={leaguesRefetch} />
    </div>
  );
}

export { LeaguesPage };
