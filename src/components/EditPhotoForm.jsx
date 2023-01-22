// Dependencies
import { useRef } from "react";
import { supabase } from "../supabase";

// Components
import { PhotoIcon } from "./icons/PhotoIcon";
export function EditPhotoForm({ itemToEdit, bucketName, updateItem }) {
  const fileRef = useRef();
  return (
    <div className="max-w-xs w-50 h-50 border-2 border-zinc-50 border-dashed p-8 rounded-full flex flex-col justify-center items-center aspect-square">
      {itemToEdit.img ? (
        <>
          <img src={itemToEdit.img} width={300}></img>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const { data, error } = await supabase.storage
                .from(bucketName)
                .remove([`${itemToEdit.id + ".jpg"}`]);
              if (!error) {
                updateItem({
                  id: itemToEdit.id,
                  img: "",
                });
              }
            }}
            className={"mt-"}
          >
            Remove
          </button>
        </>
      ) : (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const file = event.target[0].files[0];
            const { data, error } = await supabase.storage
              .from(bucketName)
              .upload(`${itemToEdit.id + ".jpg"}`, file, {
                cacheControl: "3600",
                upsert: false,
              });
            if (data) {
              const { data: response } = await supabase.storage
                .from(bucketName)
                .getPublicUrl(`${itemToEdit.id + ".jpg"}`);
              debugger;
              updateItem({
                id: itemToEdit.id,
                img: response.publicUrl,
              });
            }
          }}
        >
          <PhotoIcon />
          <input ref={fileRef} type={"file"}></input>
          <input type={"submit"}></input>
        </form>
      )}
    </div>
  );
}
