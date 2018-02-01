export const validateGameRouteParams = (validOptions, actualParams) => {

  let areValid = true;
  const validParams = {};

  for (const key in validOptions) {
    
    if (actualParams[key] !== undefined && validOptions[key].indexOf(actualParams[key]) > -1) {
      validParams[key] = actualParams[key];
    
    } else {
      validParams[key] = validOptions[key][0];
      areValid = false;
    }
  }

  if (Object.keys(actualParams).length !== Object.keys(validParams).length) { areValid = false; }

  return { areValid, validParams };
}