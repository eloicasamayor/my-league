import { PlusIcon } from "./icons/PlusIcon";

export function Modal({ title = "", children, onCloseModal }) {
  return (
    <div
      id={"modal-bg"}
      className={"absolute top-0 w-full h-full bg-zinc-900/75 z-20"}
      onClick={() => onCloseModal(null)}
    >
      <div className="sticky top-16 mx-auto w-11/12 bg-violet-100 dark:bg-violet-900 rounded-xl lg:w-3/4">
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => onCloseModal(null)}
          >
            <PlusIcon svgClassName={"w-6 h-6 rotate-45"} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={"py-8 px-2 md:px-6"}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
