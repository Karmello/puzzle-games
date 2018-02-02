export function validateParams(gameParams, optionParams) {
  
  let areValid = true;
  const validParams = {};

  const { api } = this.props;
    
  const categoryData = api.gameCategories.data.find(obj => obj.id === gameParams.category);
  const gameData = api.games.data.find(obj => obj.id === gameParams.id);
  
  if (categoryData && gameData && gameData.categoryId === categoryData.id) {

    for (const key in gameData.options) {
    
      if (optionParams[key] !== undefined && gameData.options[key].indexOf(optionParams[key]) > -1) {
        validParams[key] = optionParams[key];
      
      } else {
        validParams[key] = gameData.options[key][0];
        areValid = false;
      }
    }

    if (Object.keys(optionParams).length !== Object.keys(validParams).length) { areValid = false; }

    return { areValid, validParams, gameData }; 
  
  } else {

    return { areValid: false };
  }
}