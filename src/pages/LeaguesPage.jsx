// Dependencies
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

// Api
import { useGetLeaguesQuery } from "../redux";

//Components
import { LeaguesList, Modal } from "../components";
import { PlusIcon } from "../components/icons";
import { Button, Card } from "flowbite-react";
import { LoginPage } from "./LoginPage";
import IntroAnimation from "../components/IntroAnimation";

function LeaguesPage() {
  const navigate = useNavigate();
  const {
    data: leaguesData,
    isLoading: leaguesIsLoading,
    isFetching: leaguesIsFetching,
  } = useGetLeaguesQuery({});
  const authData = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="px-2 md:px-10 lg:px-20 xl:px-72 2xl:px-96">
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
        <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-end">
          <div className="2xl:min-h-[50%] grow">
            <LeaguesList
              authData={authData}
              leaguesData={leaguesData}
              leaguesIsLoading={leaguesIsLoading}
            />
          </div>

          <div className="lg:w-1/3">
            <IntroAnimation />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onCloseModal={setShowModal} title={"Login to create a league"}>
          {/* <p className="text-center	">
            <Link to={"/login"}>login</Link> to create a league
          </p> */}
          <LoginPage />
        </Modal>
      )}
    </>
  );
}

export { LeaguesPage };
