/**
 * @param {{svgClassName?: string, pathClassName?: string}} param0
 * @returns {JSX.Element}
 */
export function DragDropIcon({ svgClassName = "", pathClassName = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`w-6 h-6 ${svgClassName && svgClassName}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${pathClassName && pathClassName}`}
        d="M10 5h-3l5-5 5 5h-3v3h-4v-3zm4 14h3l-5 5-5-5h3v-3h4v3zm-9-5v3l-5-5 5-5v3h3v4h-3zm14-4v-3l5 5-5 5v-3h-3v-4h3z"
      />
    </svg>
  );
}
