// Dependencies
import { useRef } from "react";
import { supabase } from "../supabase";

// Api
import { useUpdateLeagueMutation } from "../redux";
import { nameToUrlName } from "../helpers/nameToUrlName";
import { useState } from "react";

export function EditLeagueForm({ leagueToEdit, setLeagueToEdit }) {
  const [updateLeague, requestResult] = useUpdateLeagueMutation();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef();

  if (!leagueToEdit.id) {
    return "";
  }

  return (
    <div
      id={"modal-bg"}
      className={
        "absolute flex justify-center align-middle top-0 w-full h-full bg-zinc-900/75"
      }
      onClick={() => setLeagueToEdit(null)}
    >
      <div className="w-3/4 h-1/2 bg-zinc-500 p-10 rounded-xl">
        <h2>Edit League</h2>
        <div className="flex gap-4">
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
            <label htmlFor={"id"}>Id:</label>
            <input
              type={"text"}
              id={"id"}
              name={"id"}
              value={leagueToEdit.id}
              disabled
            />
            <br />
            <label htmlFor={"name"}>Name:</label>
            <input
              type={"text"}
              id={"name"}
              name={"name"}
              ref={nameRef}
              defaultValue={leagueToEdit.name}
            />
            <br />
            <label htmlFor={"description"}>description:</label>
            <input
              type={"text"}
              id={"description"}
              name={"description"}
              ref={descriptionRef}
              defaultValue={leagueToEdit.description}
            />
            <br />
            <input type={"submit"}></input>
          </form>
        </div>
      </div>
    </div>
  );
}
