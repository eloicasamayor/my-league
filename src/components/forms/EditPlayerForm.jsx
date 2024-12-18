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

/**
 *
 * @param {{player: {name, team, id}, teamsData, setAlertMessage, onCloseModal}} param0
 * @returns
 */
export function EditPlayerForm({
  player,
  teamsData,
  setAlertMessage,
  onCloseModal,
}) {
  const [editPlayer, requestResult] = useUpdatePlayerMutation();
  /**
   * @type {React.MutableRefObject<HTMLInputElement | null>}
   */
  const nameRef = useRef(null);
  /**
   * @type {React.MutableRefObject<HTMLSelectElement | null>}
   */
  const teamRef = useRef(null);
  const teams = useGetTeamsQuery({});
  const [deletePlayer] = useDeletePlayerMutation();

  if (teams.isLoading) {
    return <p>"loading..."</p>;
  }
  return (
    <>
      <form
        className="flex flex-col gap-2"
        onSubmit={async (e) => {
          if (!nameRef.current || !teamRef.current) {
            setAlertMessage({
              isError: true,
              message: "There was an error updating the player",
            });
            return;
          }
          e.preventDefault();
          const editPlayerReq = await editPlayer({
            id: player.id,
            name: nameRef.current.value,
            team: teamRef.current.value,
          });
          setAlertMessage({
            isError: "error" in editPlayerReq,
            message:
              "error" in editPlayerReq
                ? "There was an error updating the player"
                : "Player updated correctly",
          });
          !("error" in editPlayerReq) && onCloseModal();
        }}
      >
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
          disabled
        >
          {teamsData &&
            teamsData.map((teamData) => (
              <option key={teamData.id} value={teamData.id}>
                {teamData.name}
              </option>
            ))}
        </Select>
        <Button type="submit">submit</Button>
      </form>
      <Button
        color="failure"
        onClick={() => deletePlayer({ id: player.id })}
        disabled
      >
        <TrashIcon />
        Delete player
      </Button>
    </>
  );
}
