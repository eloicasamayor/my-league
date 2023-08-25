/**
 *
 * @param {String} text
 * @param {number} desiredLenght
 * @returns
 */
export function truncateString({ text, desiredLenght = 20 }) {
  return text.length < desiredLenght
    ? text
    : `${text.substring(0, desiredLenght - 3)}...`;
}
