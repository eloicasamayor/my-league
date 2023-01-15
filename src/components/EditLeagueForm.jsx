// Dependencies
import { useRef } from "react";
import { supabase } from "../supabase";

// Api
import { useUpdateLeagueMutation } from "../redux";
import { nameToUrlName } from "../helpers/nameToUrlName";
import { useState } from "react";

export function EditLeagueForm({ leagueToEdit }) {
  let { id, name, urlname, description } = leagueToEdit;
  const [updateLeague, requestResult] = useUpdateLeagueMutation();
  const [leagueDetails, setLeagueDetails] = useState({ ...leagueToEdit });

  const nameRef = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef();

  if (!id) {
    return "";
  }
  return (
    <>
      <h2>Edit League</h2>
      <div className="flex gap-4">
        {leagueDetails.img ? (
          <div>
            <img src={leagueDetails.img} width={200}></img>
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
                  setLeagueDetails({ ...leagueDetails, img: "" });
                }
              }}
            >
              Remove league photo
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
                setLeagueDetails({ ...leagueDetails, img: response.publicUrl });
              }
            }}
          >
            <p>League logo</p>
            <input ref={fileRef} type={"file"}></input>
            <input type={"submit"}></input>
          </form>
        )}

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
          <input type={"text"} id={"id"} name={"id"} value={id} disabled />
          <br />
          <label htmlFor={"name"}>Name:</label>
          <input
            type={"text"}
            id={"name"}
            name={"name"}
            ref={nameRef}
            defaultValue={name}
          />
          <br />
          <label htmlFor={"description"}>description:</label>
          <input
            type={"text"}
            id={"description"}
            name={"description"}
            ref={descriptionRef}
            defaultValue={description}
          />
          <br />
          <input type={"submit"}></input>
        </form>
      </div>
    </>
  );
}
