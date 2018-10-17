// @flow
export const shuffleIntArray = (array:Array<number>) => {

  let i = array.length, j = 0, temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export const kebabToCamelCase = (id:string) => {
  return id.split('-').map(s => `${s[0].toUpperCase()}${s.slice(1)}`).join('');
}