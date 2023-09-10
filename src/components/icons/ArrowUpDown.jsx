export function ArrowUpDown({ isUp, svgClassName = "", pathClassName = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`${svgClassName && svgClassName}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${pathClassName && pathClassName}`}
        d={isUp ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"}
      />
    </svg>
  );
}
