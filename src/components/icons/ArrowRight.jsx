/**
 * @param {{svgClassName?: string, pathClassName?: string}} param0
 * @returns {JSX.Element}
 */
export function ArrowRight({ svgClassName, pathClassName }) {
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
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
