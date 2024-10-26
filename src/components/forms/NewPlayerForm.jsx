// Dependencies
import { useInsertPlayerMutation } from "../../redux";
import { useRef, useState } from "react";

// Components
import { Button } from "flowbite-react";

export function NewPlayerForm({ teamsData, teamsIsLoading, closeModal }) {
  const [insertPlayer, requestResult] = useInsertPlayerMutation();
  const nameRef = useRef();
  const teamRef = useRef();
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    isError: false,
  });

  if (teamsIsLoading) {
    return <p>{"loading..."}</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const insertPlayerReqRes = await insertPlayer({
      name: nameRef.current.value,
      team: teamRef.current.value,
      league: teamsData[0].league,
    });

    if (insertPlayerReqRes.error) {
      setAlertMessage({
        message:
          "There was an error creating the player: " +
          insertPlayerReqRes.error.message,
        isError: true,
      });
    } else {
      closeModal();
    }
  };

  return (
    <>
      {alertMessage.message && <Alert>{alertMessage.message}</Alert>}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor={"name"}>Name:</label>
        <input type={"text"} id={"name"} name={"name"} ref={nameRef} required />
        <label htmlFor={"team"}>Team:</label>
        <select name="team" id="team" ref={teamRef} required>
          {teamsData &&
            teamsData.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </select>
        <Button type="submit">submit</Button>
        <span>{requestResult.error?.data?.message || ""}</span>
      </form>
    </>
  );
}
