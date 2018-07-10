import { getFlipped, getRotated, getWithLinesShuffled } from 'js/game/GridGameBoard/gridGameBoardHelpers';

export const initializeValues = dimension => {

  const startingValues = [
    5, 3, 4, 6, 7, 8, 9, 1, 2,
    6, 7, 2, 1, 9, 5, 3, 4, 8,
    1, 9, 8, 3, 4, 2, 5, 6, 7,
    8, 5, 9, 7, 6, 1, 4, 2, 3,
    4, 2, 6, 8, 5, 3, 7, 9, 1,
    7, 1, 3, 9, 2, 4, 8, 5, 6,
    9, 6, 1, 5, 3, 7, 2, 8, 4,
    2, 8, 7, 4, 1, 9, 6, 3, 5,
    3, 4, 5, 2, 8, 6, 1, 7, 9
  ];

  const axisDirections = ['H', 'V'];
  const directions = ['L', 'R'];
  const angles = [90, 180, 270];
  const indexBounds = [[0, 2], [3, 5], [6, 8]];
  
  const N = 1000;
  let values = [...startingValues];

  const jobs = [
    () => {
      const randomIndexBounds = indexBounds[Math.floor(Math.random() * indexBounds.length)];
      return getWithLinesShuffled(axisDirections[Math.floor(Math.random() * axisDirections.length)], randomIndexBounds[0], randomIndexBounds[1], dimension, values);
    },
    () => getRotated(directions[Math.floor(Math.random() * directions.length)], angles[Math.floor(Math.random() * angles.length)], dimension, values),
    () => getFlipped(axisDirections[Math.floor(Math.random() * axisDirections.length)], dimension, values)
  ];
  
  for (let i = 0; i < N; i++) {
    values = jobs[Math.floor(Math.random() * jobs.length)](this.dimension, values);
  }

  return values;
}