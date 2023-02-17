import { PlusIcon } from "./icons/PlusIcon";

export function Modal({ title = "", children, onCloseModal }) {
  return (
    <div
      id={"modal-bg"}
      className={"absolute top-0 w-full h-full bg-zinc-900/75 z-50"}
      onClick={() => onCloseModal(null)}
    >
      <div className="sticky top-16 mx-auto w-11/12 bg-zinc-500 rounded-xl lg:w-3/4">
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => onCloseModal(null)}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div onClick={(e) => e.stopPropagation()} className={"py-8 px-6"}>
          {children}
        </div>
      </div>
    </div>
  );
}
