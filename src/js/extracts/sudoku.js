// @flow
import {
  getFlipped,
  getRotated,
  getWithLinesShuffled,
  coordsToIndex,
  areValuesUniqueOnAxis
} from 'js/extracts/gridBoard';

import { shuffleIntArray } from 'js/helpers/methods';

export const startingValues = [
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

export const initializeValues = (dimension:number) => {

  const axisDirections = ['H', 'V'];
  const directions = ['L', 'R'];
  const angles = [90, 180, 270];
  const indexBounds = [[0, 2], [3, 5], [6, 8]];
  
  const N = 100;
  let values = [...startingValues];

  const jobs = [
    (values:Array<number|null>) => {
      const randomIndexBounds = indexBounds[Math.floor(Math.random() * indexBounds.length)];
      return getWithLinesShuffled(axisDirections[Math.floor(Math.random() * axisDirections.length)], randomIndexBounds[0], randomIndexBounds[1], dimension, values);
    },
    (values:Array<number|null>) => getRotated(directions[Math.floor(Math.random() * directions.length)], angles[Math.floor(Math.random() * angles.length)], dimension, values),
    (values:Array<number|null>) => getFlipped(axisDirections[Math.floor(Math.random() * axisDirections.length)], dimension, values)
  ];
  
  // Creating unique values

  for (let i = 0; i < N; i++) {
    const newValues = jobs[Math.floor(Math.random() * jobs.length)](values);
    if (newValues) { values = newValues; }
  }

  const numOfVisibleOnARow = shuffleIntArray([3, 3, 3, 3, 3, 3, 4, 4, 4]);

  // Clearing some of the values
  for (let i = 0; i < dimension; i++) {
    const visibleIndexes = [];
    do {
      const visibleIndex = Math.floor(Math.random() * dimension);
      if (visibleIndexes.indexOf(visibleIndex) === -1) {
        visibleIndexes.push(visibleIndex);
      }
    } while(visibleIndexes.length < numOfVisibleOnARow[i]);
    for (let j = 0; j < dimension; j++) {
      const index = coordsToIndex({ x: j, y: i }, dimension);
      if (visibleIndexes.indexOf(j) === -1) {
        values[index] = null;
      }
    }
  }

  return values;
}

export const checkIfSolved = (values:Array<number>, dimension:number) => {

  return new Promise(resolve => {
    
    // Checking sections
    
    const dimensionSqrt = Math.sqrt(dimension);
    
    for (let i = 0; i < dimensionSqrt; i++) {
      for (let j = 0; j < dimensionSqrt; j++) {
        
        const startingPointCoords = { x: j * dimensionSqrt, y: i * dimensionSqrt };
        const sectionValues = [];
        
        for (let a = 0; a < dimensionSqrt; a++) {
          for (let b = 0; b < dimensionSqrt; b++) {
            
            const coords = { x: startingPointCoords.x + b * 1, y: startingPointCoords.y + a * 1 };
            const value = values[coordsToIndex(coords, dimension)];
            if (!value) { return false; }
            sectionValues.push(value);
          }
        }

        sectionValues.sort();
        
        for (let i = 0; i < dimension; i++) {
          if (sectionValues[i] !== i + 1) { return false; }
        }
      }
    }

    // Checking rows
    for (let i = 0; i < dimension; i++) {
      if (!areValuesUniqueOnAxis('X', i, dimension, values, true)) {
        return resolve(false);
      }
    }
    
    // Checking columns
    for (let i = 0; i < dimension; i++) {
      if (!areValuesUniqueOnAxis('Y', i, dimension, values, true)) {
        return resolve(false);
      }
    }

    resolve(true);
  });
}