// Dependencies
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

// Api
import { useGetLeaguesQuery } from "../redux";

//Components
import { EditLeagueForm, LeaguesList, NewLeagueForm } from "../components";
import { PlusIcon } from "../components/icons/PlusIcon";
import { Modal } from "../components/modal";

function LeaguesPage() {
  const {
    data: leaguesData,
    isLoading: leaguesIsLoading,
    isFetching: leaguesIsFetching,
  } = useGetLeaguesQuery();
  const authData = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <header className="flex justify-between align-middle">
        <h1>Leagues</h1>

        <button
          className=" w-10 h-10 aspect-square rounded-full"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon />
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
              <h2>Create new league</h2>
              <p>
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
