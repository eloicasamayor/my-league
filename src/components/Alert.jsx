import { PlusIcon } from "./icons/PlusIcon";
import { Toast } from "flowbite-react";
import { ExclamationCircleIcon } from "./icons/ExclamationCircleIcon";
import { CircleCheckIcon } from "./icons";

export function Alert({ children, onCloseAlert, isError }) {
  const iconColorsClasses = isError
    ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
    : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
  return (
    <Toast className="fixed right-0 z-10 top-20">
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconColorsClasses}`}
      >
        {isError ? <ExclamationCircleIcon /> : <CircleCheckIcon />}
      </div>
      <div className="ml-3 text-sm font-normal">{children}</div>
      <button
        onClick={() => onCloseAlert("")}
        className="absolute top-1 right-1 rotate-45 "
      >
        <PlusIcon />
      </button>
    </Toast>
  );
}
