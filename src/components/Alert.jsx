// Dependencies
import { useEffect } from "react";
// Components
import { PlusIcon, CircleCheckIcon } from "./icons";
import { Toast } from "flowbite-react";
import { ExclamationCircleIcon } from "./icons/ExclamationCircleIcon";

export function Alert({
  children,
  onCloseAlert,
  isError,
  secondsToAutoClose = 2,
}) {
  useEffect(() => {
    if (secondsToAutoClose) {
      setTimeout(() => {
        onCloseAlert();
      }, secondsToAutoClose * 1000);
    }
  }, [children]);

  const iconColorsClasses = isError
    ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
    : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
  return (
    <Toast className="fixed right-3 z-50 top-16 max-w-sm shadow-[2px_4px_8px_12px_rgba(0,0,0,0.1)]">
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconColorsClasses}`}
      >
        {isError ? <ExclamationCircleIcon /> : <CircleCheckIcon />}
      </div>
      <div className="ml-3 text-sm font-normal w-full">{children}</div>
      <button
        onClick={() => onCloseAlert("")}
        className="absolute top-1 right-1 rotate-45 "
      >
        <PlusIcon />
      </button>
      <div className="h-2 w-full absolute right-0 bottom-0 rounded-b-lg overflow-clip">
        <div
          className={` h-full ${isError ? "bg-red-100" : "bg-green-100"} ${
            secondsToAutoClose && "animate-[toast_" + secondsToAutoClose + "s]"
          }`}
        ></div>
      </div>
    </Toast>
  );
}
