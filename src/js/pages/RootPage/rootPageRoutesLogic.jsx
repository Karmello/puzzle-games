import React from 'react';
import * as qs from 'query-string';
import { Redirect } from 'react-router-dom';

import { GamesPage, GamePage, HighscoresPage } from 'js/pages';


export const gamesRouteLogic = function(props) {

  const pathParams = props.match.params;

  if (this.props.api.gameCategories.res.data.some(obj => obj.id === pathParams.category)) {
    return <GamesPage gameCategoryToSet={pathParams.category} />;
  
  } else {
    const pathname = this.getDefaultPath();
    return (
      <div pathname={pathname}>
        <Redirect to={pathname} />
      </div>
    );
  }
}

export const gameRouteLogic = function(props) {
    
  const pathname = props.location.pathname;
  const pathParams = props.match.params;
  const queryParams = qs.parse(props.location.search);
  const gameOptions = this.ui.gamesPage.options[pathParams.id];

  const { shouldRedirect, validQueryParams, gameData } = this.validateGameParams(pathParams, queryParams, gameOptions);
  
  if (!shouldRedirect) {
    return <GamePage queryParams={queryParams} gameData={gameData} />;
  
  } else if (validQueryParams) {
    const query = qs.stringify(validQueryParams);
    return (
      <div pathname={pathname} search={query}>
        <Redirect to={{ pathname, search: query }} />
      </div>
    );

  } else {
    const pathname = this.getDefaultPath();
    return (
      <div pathname={pathname}>
        <Redirect to={pathname} />
      </div>
    );
  }
}

export const highscoresRouteLogic = function(props) {

  const pathname = props.location.pathname;
  const pathParams = props.match.params;
  const queryParams = qs.parse(props.location.search);
  const optionsFilter = this.ui.highscoresPage.optionsFilter;

  const gameData = this.props.api.games.res.data.find(obj => obj.id === pathParams.gameId);
  const gameCategory = gameData ? gameData.categoryId : undefined;
  
  const { shouldRedirect, validQueryParams } = this.validateGameParams({ category: gameCategory, id:  pathParams.gameId }, queryParams, optionsFilter);

  if (!shouldRedirect) {
    return (
      <HighscoresPage
        gameFilterToSet={{ category: gameCategory, id: pathParams.gameId }}
        optionsFilterToSet={queryParams}
      />
    );
  
  } else if (validQueryParams) {
    const query = qs.stringify(validQueryParams);
    return (
      <div pathname={pathname} search={query}>
        <Redirect to={{ pathname, search: query }}/>
      </div>
    );
  
  } else {
    const pathname = this.getDefaultPath();
    return (
      <div pathname={pathname}>
        <Redirect to={pathname} />
      </div>
    );
  }
}