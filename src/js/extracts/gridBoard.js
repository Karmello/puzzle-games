// @flow
import { shuffleIntArray } from 'js/helpers/methods';
import type { T_Coords } from 'js/flow-types';

export const coordsToIndex = (coords:T_Coords, dimension:number) => {
  return (coords.y || 0) * dimension + (coords.x || 0);
};

export const indexToCoords = (index:number, dimension:number) => {
  return {
    x: index % dimension,
    y: Math.floor(index/dimension)
  }
};

export const offsetToIndex = (offset:T_Coords, elementSize:number, dimension:number) => {
  const coords = { x: Math.round((offset.x || 0) / elementSize), y: Math.round((offset.y || 0) / elementSize) };
  if (coords.x >= 0 && coords.x < dimension && coords.y >= 0 && coords.y < dimension) {
    return Math.abs(coordsToIndex(coords, dimension));
  } else {
    return -1;
  }
};

export const findAllMovementCoords = (targetCoords:T_Coords, dimension:number, movementType?:'SINGLE'|'CHESS_KNIGHT') => {

  if (!movementType) { movementType = 'SINGLE'; }
  if (targetCoords.x === undefined) { targetCoords.x = 0; }
  if (targetCoords.y === undefined) { targetCoords.y = 0; }

  if (dimension < 2) { throw new Error('Dimension must be greater than or equal 2'); }

  let possibleDestinationCoords;

  switch (movementType) {
    case 'SINGLE':
      possibleDestinationCoords = [
        { x: targetCoords.x, y : targetCoords.y - 1 },
        { x: targetCoords.x + 1, y : targetCoords.y },
        { x: targetCoords.x, y : targetCoords.y + 1 },
        { x: targetCoords.x - 1, y : targetCoords.y }
      ];
      break;
    case 'CHESS_KNIGHT':
      possibleDestinationCoords = [
        { x: targetCoords.x - 2, y : targetCoords.y + 1 },
        { x: targetCoords.x - 1, y : targetCoords.y + 2 },
        { x: targetCoords.x + 1, y : targetCoords.y + 2 },
        { x: targetCoords.x + 2, y : targetCoords.y + 1 },
        { x: targetCoords.x - 2, y : targetCoords.y - 1 },
        { x: targetCoords.x - 1, y : targetCoords.y - 2 },
        { x: targetCoords.x + 1, y : targetCoords.y - 2 },
        { x: targetCoords.x + 2, y : targetCoords.y - 1 }
      ];
      break;
    default:
      return [];
  }

  const realDestinationCoords = [];

  for (let coords of possibleDestinationCoords) {
    if (coords.x >= 0 && coords.x <= dimension - 1 && coords.y >= 0 && coords.y <= dimension - 1) {
      realDestinationCoords.push(coords);
    }
  }

  return realDestinationCoords;
};

export const isAloneOnAxis = (axis:'x'|'y'|'d1'|'d2', targetCoords:T_Coords, dimension:number, gridData:Array<boolean>) => {

  let upperBound = 0;
  let shouldTerminate;

  if (targetCoords.x === undefined) { targetCoords.x = 0; }
  if (targetCoords.y === undefined) { targetCoords.y = 0; }

  switch (axis) {
    
    case 'x':
      upperBound = dimension;
      shouldTerminate = i => i !== targetCoords.x && gridData[coordsToIndex({ x: i, y: targetCoords.y }, dimension)];
      break;

    case 'y':
      upperBound = dimension;
      shouldTerminate = i => i !== targetCoords.y && gridData[coordsToIndex({ x: targetCoords.x, y: i }, dimension)];
      break;

    case 'd1':
    case 'd2':

      if (axis === 'd1') {
        upperBound = dimension - Math.abs(targetCoords.x - targetCoords.y);
      } else if (axis === 'd2') {
        upperBound = dimension - Math.abs(dimension - targetCoords.x - targetCoords.y - 1);
      }

      shouldTerminate = i => {
        
        const { x = 0, y = 0 } = targetCoords;
        let j = 0;

        if (axis === 'd1') {
          j = (((y - Math.min(x, y)) + i) * dimension) + (x - Math.min(x, y) + i);
        } else if (axis === 'd2') {
          j = (((y + Math.min(dimension - 1 - y, x)) - i) * dimension) + (x - Math.min(dimension - 1 - y, x) + i);
        }

        const q = coordsToIndex(targetCoords, dimension);

        return j !== q && gridData[j];
      };

      break;

    default:
      return false;
  }

  for (let i = 0; i < upperBound; i++) {
    if (shouldTerminate(i)) {
      return false;
    }
  }

  return true;
};

export const areValuesUniqueOnAxis = (axis:'X'|'Y', axisIndex:number, dimension:number, gridData:Array<number>, disallowEmptyValues:boolean) => {

  const axisValues = [];
  const coord = axis === 'X' ? 'y' : 'x';

  for (let i = 0; i < gridData.length; i++) {

    const coords = indexToCoords(i, dimension);

    if (coords[coord] === axisIndex) {
      if (gridData[i] !== undefined && gridData[i] !== '') {
        axisValues.push(gridData[i]);
      } else if (disallowEmptyValues) {
        return false;
      }
    }
  }

  return (new Set(axisValues)).size === axisValues.length;
};

export const getFlipped = (axisDirection:'H'|'V', dimension:number, gridData:Array<any>) => {

  const newGridData = [];

  for (let i = 0; i < gridData.length; i++) {
    const coords = indexToCoords(i, dimension);
    let newCoords;
    switch (axisDirection) {
      case 'H':
        newCoords = { x: coords.x, y: Math.abs(dimension - coords.y - 1) };
        break;
      case 'V':
        newCoords = { x: Math.abs(dimension - coords.x - 1), y: coords.y };
        break;
      default:
        return false;
    }
    const newIndex = coordsToIndex(newCoords, dimension);
    newGridData[newIndex] = gridData[i];
  }

  return newGridData;
};

export const getRotated = (direction:'L'|'R', angle:90|180|270|360, dimension:number, gridData:Array<any>) => {

  const possibleAngles = [90, 180, 270, 360];

  if (possibleAngles.indexOf(angle) === -1) {
    return false;
  }

  const newGridData = [...gridData];

  for (let a = 0; a < angle; a += 90) {
    const tempGridData = [...newGridData];
    for (let i = 0; i < tempGridData.length; i++) {
      const coords = indexToCoords(i, dimension);
      let newCoords;
      switch (direction) {
        case 'L':
          newCoords = { x: coords.y, y: Math.abs(dimension - coords.x - 1) };
          break;
        case 'R':
          newCoords = { x: Math.abs(dimension - coords.y - 1), y: coords.x };
          break;
        default:
          return false;
      }
      const newIndex = coordsToIndex(newCoords, dimension);
      newGridData[newIndex] = tempGridData[i];
    }
  }

  return newGridData;
};

export const getWithLinesShuffled = (axisDirection:'H'|'V', startIndex:number, endIndex:number, dimension:number, gridData:Array<any>) => {

  const newGridData = [...gridData];
  const indexes = Array.from({ length: endIndex - startIndex + 1 }, (v, k) => k + startIndex);
  let newIndexes = [...indexes];

  do { shuffleIntArray(newIndexes); } while (JSON.stringify(indexes) === JSON.stringify(newIndexes));

  for (let i = 0; i < gridData.length; i++) {
    const coords = indexToCoords(i, dimension);
    let index;
    switch(axisDirection) {
      case 'H':
        index = indexes.indexOf(coords.y);
        if (index > -1) {
          newGridData[coordsToIndex({ x: coords.x, y: newIndexes[index] }, dimension)] = gridData[i];
        }
        break;
      case 'V':
        index = indexes.indexOf(coords.x);
        if (index > -1) {
          newGridData[coordsToIndex({ x: newIndexes[index], y: coords.y }, dimension)] = gridData[i];
        }
        break;
      default:
        return false;
    }
  }

  return newGridData;
};

export const areOnTheSameAxis = (index1:number, index2:number, dimension:number) => {

  const coords1 = indexToCoords(index1, dimension);
  const coords2 = indexToCoords(index2, dimension);

  if (coords1.x === coords2.x) {
    return 'y';

  } else if (coords1.y === coords2.y) {
    return 'x';
  
  } else {

    const xDiff = coords1.x - coords2.x;
    const yDiff = coords1.y - coords2.y;

    if (Math.abs(xDiff) === Math.abs(yDiff)) {
      if (xDiff + yDiff !== 0) {
        return 'd1';
      } else {
        return 'd2';
      }
    }
  }

  return false;
};

export const isItEmptyBetweenThem = (index1:number, index2:number, dimension:number, data:Array<any>) => {

  const axis = areOnTheSameAxis(index1, index2, dimension);
  const minIndex = Math.min(index1, index2);
  const maxIndex = Math.max(index1, index2);
  let indexes = [];

  switch (axis) {
    
    case 'x':
      indexes = Array.from({ length: maxIndex - minIndex - 1 }, (value, key) => minIndex + key + 1);
      break;
    
    case 'y':
      indexes = Array.from({ length: (maxIndex - minIndex) / dimension - 1 }, (value, key) => minIndex + (key + 1) * dimension);
      break;
    
    case 'd1':
    case 'd2':
      const coords1 = indexToCoords(minIndex, dimension);
      const coords2 = indexToCoords(maxIndex, dimension);
      const length = Math.abs(coords1.x - coords2.x) - 1;
      if (axis === 'd1') {
        indexes = Array.from({ length }, (value, key) => minIndex + (key + 1) * (dimension + 1));
      } else if (axis === 'd2') {
        indexes = Array.from({ length }, (value, key) => minIndex + (key + 1) * (dimension - 1));
      }
      break;

    default:
      return false;
  }

  if (indexes.length === 0) { return; }

  for (let i = 0; i < indexes.length; i++) {
    if (data[indexes[i]]) { return false; }
  }
    
  return true;
};
