// Dependencies
import { useRef, useState } from "react";
import { supabase } from "../../supabase";

// Components
import { PhotoIcon } from "../icons";
import { FileInput, Label, Button } from "flowbite-react";

export function EditPhotoForm({ itemToEdit, bucketName, updateItem }) {
  const [imageUrl, setImageUrl] = useState(itemToEdit.img);

  async function submitPhoto(event) {
    event.preventDefault();
    const file = event.target?.[0]?.files?.[0] ?? event.target.value;
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
      updateItem({
        id: itemToEdit.id,
        img: response.publicUrl,
      });
      setImageUrl(response.publicUrl);
    }
  }

  const fileRef = useRef();
  return (
    <div className="max-w-xs w-50 h-50 border-2 bg-slate-300 border-zinc-50 border-dashed p-1 rounded-xl flex flex-col justify-center items-center aspect-square">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            className={"relative object-cover w-72 h-72 rounded-lg"}
          ></img>
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
                setImageUrl("");
              }
            }}
            className={"absolute"}
          >
            Remove photo
          </Button>
        </>
      ) : (
        <form onSubmit={submitPhoto}>
          <PhotoIcon pathClassName={"stroke-violet-300"} />
          {/* <input ref={fileRef} type={"file"}></input> */}
          <div id="fileUpload" className="-mt-36">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              id="file"
              helperText="The photo will be public"
              ref={fileRef}
              onChange={(e) => submitPhoto(e)}
            />
          </div>
        </form>
      )}
    </div>
  );
}
