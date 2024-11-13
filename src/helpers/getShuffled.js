/**
 * Rep un array i el retorna barrejat
 * @param {any[]} arrayOriginal
 * @returns {any[]}
 */
export function getShuffled(arrayOriginal) {
  const array = [...arrayOriginal];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
