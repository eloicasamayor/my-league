import { PlusIcon } from "./icons/PlusIcon";

export function Alert({ children, onCloseAlert }) {
  return (
    <div className="fixed right-0 z-10 top-16 w-3/4 bg-zinc-800/90 p-10 rounded-3xl lg:w-1/4 border-2">
      <button
        onClick={() => onCloseAlert("")}
        className="absolute top-1 right-1 rotate-45 "
      >
        <PlusIcon />
      </button>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
