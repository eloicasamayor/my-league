/**
 *
 * @param {{text: string, desiredLenght: number}} param
 * @returns
 */
export function truncateString({ text, desiredLenght = 20 }) {
  return text.length < desiredLenght
    ? text
    : `${text.substring(0, desiredLenght - 3)}...`;
}
