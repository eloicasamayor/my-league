import { Button } from "flowbite-react";
import { PhotoIcon } from "./icons";
import { useState } from "react";

export function NewLeagueInfo({
  handleSubmit,
  leagueName,
  setLeagueName,
  leagueDescription,
  setLeagueDescription,
  tournamentType,
  setTournamentType,
  imgRef,
}) {
  const [previewImage, setPreviewImage] = useState(imgRef?.current?.url);

  function handleFileChange(event) {
    const file = event?.target?.files?.[0];
    let objectUrl = "";
    if (file) {
      // Crear una URL de objeto para la previsualización de la imagen
      objectUrl = URL.createObjectURL(file);
    }
    imgRef.current = {};
    imgRef.current.url = objectUrl;
    imgRef.current.file = file;
    setPreviewImage(objectUrl);
  }

  return (
    <div className="grow mx-2 mb-4 p-0.5 md:p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:mx-8 lg:mx-10 xl:mx-44 2xl:mx-96">
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <div className="relative w-full p-1 md:p-2">
          <label>League name</label>
          <input
            type="text"
            required
            minLength={3}
            className="w-full rounded-lg border-none focus:border-cyan-500"
            id={"name"}
            name={"name"}
            placeholder={""}
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
        </div>
        <div className="relative w-full p-1 md:p-2">
          <label>League description</label>
          <input
            type="text"
            required
            className="w-full rounded-lg border-none focus:border-cyan-500"
            id={"description"}
            placeholder={""}
            name={"description"}
            value={leagueDescription}
            onChange={(e) => setLeagueDescription(e.target.value)}
          />
        </div>
        <div className="relative w-full p-1 md:p-2">
          <p>Tourmanent type</p>
          <Button.Group>
            <Button onClick={() => setTournamentType("LEAGUE")}>League</Button>
            <Button disabled onClick={() => setTournamentType("ELIMINATION")}>
              Elimination rounds
            </Button>
          </Button.Group>
        </div>
        {tournamentType === "LEAGUE" && (
          <div className="relative w-full p-1 md:p-2">
            <p>Ranking base</p>
            <Button.Group>
              <Button>Victory 3p | tie 1p | losse 0p</Button>
              <Button disabled>Victory 1p | tie 0.5p | losse 0p</Button>
            </Button.Group>
          </div>
        )}

        <div className="max-w-xs w-50 h-50 border-2 bg-slate-300 border-zinc-50 border-dashed p-1 rounded-xl flex flex-col justify-center items-center aspect-square">
          {previewImage ? (
            <>
              <img
                src={previewImage}
                className={"relative object-cover w-72 max-h-72 rounded-lg"}
              ></img>
              <Button onClick={() => handleFileChange()} className={"absolute"}>
                Remove photo
              </Button>
            </>
          ) : (
            <form className="w-full p-2">
              <label htmlFor="select-file" className="cursor-pointer">
                <PhotoIcon
                  svgClassName={"-mt-16"}
                  pathClassName={"stroke-violet-300"}
                />
              </label>
              <input
                className="hidden"
                type="file"
                id="select-file"
                /* ref={imgRef} */
                onChange={(e) => handleFileChange(e)}
              />
              <p className="text-center">Select league image</p>
            </form>
          )}
        </div>
      </form>
    </div>
  );
}
