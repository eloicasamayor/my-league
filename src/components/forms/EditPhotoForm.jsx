// Dependencies
import { useRef } from "react";
import { supabase } from "../../supabase";

// Components
import { PhotoIcon } from "../icons";
import { FileInput, Label, Button } from "flowbite-react";

export function EditPhotoForm({ itemToEdit, bucketName, updateItem }) {
  const fileRef = useRef();
  return (
    <div className="max-w-xs w-50 h-50 border-2 border-zinc-50 border-dashed p-8 rounded-full flex flex-col justify-center items-center aspect-square">
      {itemToEdit.img ? (
        <>
          <img src={itemToEdit.img} width={300}></img>
          <Button
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
            Remove photo
          </Button>
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
          {/* <input ref={fileRef} type={"file"}></input> */}
          <div id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              id="file"
              helperText="The photo will be public to all"
              ref={fileRef}
            />
          </div>
          <Button type={"submit"}>Submit</Button>
        </form>
      )}
    </div>
  );
}
