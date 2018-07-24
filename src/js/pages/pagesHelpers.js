export function validateGameParams(pathParams, queryParams, savedGameOptions) {
  
  const { api } = this.props;

  let shouldRedirect = false;
  const validQueryParams = {};
    
  const categoryData = api.gameCategories.res.data.find(obj => obj.id === pathParams.category);
  const gameData = api.games.res.data.find(obj => obj.id === pathParams.id);
  
  if (categoryData && gameData && gameData.categoryId === categoryData.id) {

    for (const key in gameData.options) {
    
      if (queryParams[key] !== undefined && gameData.options[key].indexOf(queryParams[key]) > -1) {
        validQueryParams[key] = queryParams[key];
      
      } else {
        validQueryParams[key] = savedGameOptions ? savedGameOptions[key] : gameData.options[key][0];
        shouldRedirect = true;
      }
    }

    if (Object.keys(queryParams).length !== Object.keys(validQueryParams).length) { shouldRedirect = true; }
    
    return { shouldRedirect, validQueryParams, gameData };
  
  } else {

    return { shouldRedirect: true };
  }
}