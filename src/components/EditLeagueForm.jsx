// Dependencies
import { useRef } from "react";
import { supabase } from "../supabase";

// Api
import { useUpdateLeagueMutation } from "../redux";
import { useDeleteLeagueMutation } from "../redux";

import { nameToUrlName } from "../helpers/nameToUrlName";
import { useState } from "react";
import { Modal } from "./modal";
import { TrashIcon } from "./icons/TrashIcon";

export function EditLeagueForm({ leagueToEdit, setLeagueToEdit }) {
  const [updateLeague, requestResult] = useUpdateLeagueMutation();
  const [deleteLeague] = useDeleteLeagueMutation();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef();

  if (!leagueToEdit.id) {
    return "";
  }

  return (
    <>
      <h2>Edit League</h2>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-50 h-50 border-2 border-zinc-50 border-dashed p-5 rounded-full ">
          {leagueToEdit.img ? (
            <div>
              <img src={leagueToEdit.img} width={300}></img>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const { data, error } = await supabase.storage
                    .from("leagues-img")
                    .remove([`${id + ".jpg"}`]);
                  if (!error) {
                    updateLeague({
                      id: id,
                      img: "",
                    });
                    setLeagueDetails({ ...leagueToEdit, img: "" });
                  }
                }}
                className={"mt-"}
              >
                Remove
              </button>
            </div>
          ) : (
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const file = event.target[0].files[0];
                const { data, error } = await supabase.storage
                  .from("leagues-img")
                  .upload(`${id + ".jpg"}`, file, {
                    cacheControl: "3600",
                    upsert: false,
                  });
                if (data) {
                  const { data: response } = await supabase.storage
                    .from("leagues-img")
                    .getPublicUrl(`${id + ".jpg"}`);
                  console.log(response);
                  updateLeague({
                    id: id,
                    img: response.publicUrl,
                  });
                  setLeagueDetails({
                    ...leagueToEdit,
                    img: response.publicUrl,
                  });
                }
              }}
            >
              <p>League logo</p>
              <input ref={fileRef} type={"file"}></input>
              <input type={"submit"}></input>
            </form>
          )}
        </div>
        <form
          className="flex flex-col w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            updateLeague({
              id,
              name: nameRef.current.value,
              description: descriptionRef.current.value,
              urlname: nameToUrlName(nameRef.current.value),
            });
          }}
        >
          <input
            className="hidden"
            type={"text"}
            id={"id"}
            name={"id"}
            value={leagueToEdit.id}
            disabled
          />

          <label htmlFor={"name"}>Name:</label>
          <input
            type={"text"}
            id={"name"}
            name={"name"}
            ref={nameRef}
            defaultValue={leagueToEdit.name}
          />

          <label htmlFor={"description"}>description:</label>
          <input
            type={"text"}
            id={"description"}
            name={"description"}
            ref={descriptionRef}
            defaultValue={leagueToEdit.description}
          />

          <input type={"submit"}></input>
        </form>
        <div>
          <button onClick={deleteLeague}>
            <TrashIcon />
            Delete league
          </button>
        </div>
      </div>
    </>
  );
}
