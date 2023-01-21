import { PlusIcon } from "./icons/PlusIcon";

export function Modal({ children, onCloseModal }) {
  return (
    <div
      id={"modal-bg"}
      className={"absolute top-0 w-full h-full bg-zinc-900/75"}
      onClick={() => onCloseModal(null)}
    >
      <div className="sticky top-16 mx-auto w-11/12 bg-zinc-500 p-10 rounded-xl lg:w-3/4">
        <button
          onClick={() => onCloseModal(null)}
          className="absolute top-1 right-1 rotate-45 "
        >
          <PlusIcon />
        </button>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </div>
  );
}
