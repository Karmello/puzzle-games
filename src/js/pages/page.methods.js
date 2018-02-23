export function validateGameParams(params, options) {
  
  const { api } = this.props;

  let shouldRedirect = false;
  const validParams = {};
    
  const categoryData = api.gameCategories.res.data.find(obj => obj.id === params.category);
  const gameData = api.games.res.data.find(obj => obj.id === params.id);
  
  if (categoryData && gameData && gameData.categoryId === categoryData.id) {

    for (const key in gameData.options) {
    
      if (options[key] !== undefined && gameData.options[key].indexOf(options[key]) > -1) {
        validParams[key] = options[key];
      
      } else {
        validParams[key] = gameData.options[key][0];
        shouldRedirect = true;
      }
    }

    if (Object.keys(options).length !== Object.keys(validParams).length) { shouldRedirect = true; }

    return { shouldRedirect, validParams, gameData };
  
  } else {

    return { shouldRedirect: true };
  }
}