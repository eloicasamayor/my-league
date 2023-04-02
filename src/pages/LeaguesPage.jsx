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
import { Button } from "flowbite-react";
{
}
import { Modal } from "../components/modal";
import { LoginPage } from "./LoginPage";

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
        <Button
          pill={true}
          className="rounded-full"
          onClick={() =>
            authData?.user?.id && authData?.session
              ? navigate("/new-league")
              : setShowModal(true)
          }
        >
          <PlusIcon />
          Create league
        </Button>
      </header>

      <LeaguesList
        authData={authData}
        leaguesData={leaguesData}
        leaguesIsLoading={leaguesIsLoading}
      />
      {showModal && (
        <Modal onCloseModal={setShowModal} title={"Login to create a league"}>
          {/* <p className="text-center	">
            <Link to={"/login"}>login</Link> to create a league
          </p> */}
          <LoginPage />
        </Modal>
      )}
    </div>
  );
}

export { LeaguesPage };
