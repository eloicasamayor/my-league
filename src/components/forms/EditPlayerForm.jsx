// Dependencies
import { useRef } from "react";

// Api
import {
  useUpdatePlayerMutation,
  useGetTeamsQuery,
  useDeletePlayerMutation,
} from "../../redux";

// Components
import { TrashIcon } from "../icons";
import { Button, TextInput, Select } from "flowbite-react";

export function EditPlayerForm({
  player = {},
  teamsData,
  setAlertMessage,
  onCloseModal,
}) {
  const [editPlayer, requestResult] = useUpdatePlayerMutation();
  const nameRef = useRef();
  const teamRef = useRef();
  const teams = useGetTeamsQuery();
  const [deletePlayer] = useDeletePlayerMutation();

  if (teams.isLoading) {
    return <p>"loading..."</p>;
  }
  return (
    <>
      <form className="flex flex-col gap-2">
        <label htmlFor={"name"}>Name:</label>
        <TextInput
          id={"name"}
          name={"name"}
          ref={nameRef}
          defaultValue={player.name}
          required
        />
        <label htmlFor={"team"}>Team:</label>
        <Select
          name="team"
          id="team"
          ref={teamRef}
          value={player.team}
          required
        >
          {teamsData &&
            teamsData.map((teamData) => (
              <option key={teamData.id} value={teamData.id}>
                {teamData.name}
              </option>
            ))}
        </Select>
        <Button
          onClick={async (e) => {
            e.preventDefault();
            const editPlayerReq = await editPlayer({
              id: player.id,
              name: nameRef.current.value,
              team: teamRef.current.value,
            });
            setAlertMessage({
              isError: !!editPlayerReq.error,
              message: editPlayerReq.error
                ? "There was an error updating the player"
                : "Player updated correctly",
            });
            !editPlayerReq.error && onCloseModal();
          }}
        >
          submit
        </Button>
      </form>
      <Button color="failure" onClick={() => deletePlayer({ id: player.id })}>
        <TrashIcon />
        Delete player
      </Button>
    </>
  );
}
