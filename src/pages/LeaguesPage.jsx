// Dependencies
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

// Api
import { useGetLeaguesQuery } from "../redux";

//Components
import { EditLeagueForm, LeaguesList, NewLeagueForm } from "../components";
import { PlusIcon } from "../components/icons/PlusIcon";
import { MoreIcon } from "../components/icons/MoreIcon";

import { Modal } from "../components/modal";

function LeaguesPage() {
  const navigate = useNavigate();
  const {
    data: leaguesData,
    isLoading: leaguesIsLoading,
    isFetching: leaguesIsFetching,
  } = useGetLeaguesQuery();
  const authData = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <header className="flex justify-between align-middle py-2">
        <h1>Leagues</h1>

        <button
          className="aspect-square rounded-full"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon />
        </button>
        <button
          className="rounded-full"
          onClick={() => navigate("/new-league")}
        >
          Create league
        </button>
      </header>

      <LeaguesList
        leaguesData={leaguesData}
        leaguesIsLoading={leaguesIsLoading}
      />
      {showModal && (
        <Modal onCloseModal={setShowModal}>
          {authData?.user?.id && authData?.session ? (
            <NewLeagueForm />
          ) : (
            <>
              <p className="text-center	">
                <Link to={"/login"}>login</Link> to create a league
              </p>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

export { LeaguesPage };
