import React from 'react';
import * as qs from 'query-string';
import { Redirect } from 'react-router-dom';

import { GamesPage, GamePage, HighscoresPage } from 'js/pages';


export const gamesRouteLogic = function(props) {

  const { api } = this.props;

  if (api.gameCategories.res.data.some(obj => obj.id === props.match.params.category)) {
    return <GamesPage gameCategoryToSet={props.match.params.category} />;
  
  } else {
    return (
      <div pathname={this.getDefaultPath()}>
        <Redirect to={this.getDefaultPath()} />
      </div>
    );
  }
}

export const gameRouteLogic = function(props) {
    
  const { shouldRedirect, validQueryParams, gameData } = this.validateGameParams(props.match.params, qs.parse(props.location.search), this.ui.gamesPage.options[props.match.params.id]);
  
  if (!shouldRedirect) {
    return <GamePage gameData={gameData} queryParams={validQueryParams} />
  
  } else if (validQueryParams) {
    const search = qs.stringify(validQueryParams);
    return (
      <div pathname={props.location.pathname} search={search}>
        <Redirect to={{ pathname: props.location.pathname, search: search }} />;
      </div>
    );

  } else {
    return (
      <div pathname={this.getDefaultPath()}>
        <Redirect to={this.getDefaultPath()} />
      </div>
    );
  }
}

export const highscoresRouteLogic = function(props) {

  const queryParams = qs.parse(props.location.search);
  
  const id = props.match.params.id;
  const gameData = this.props.api.games.res.data.find(obj => obj.id === id);
  const category = gameData ? gameData.categoryId : undefined;
  
  const { shouldRedirect, validQueryParams } = this.validateGameParams({ category, id }, queryParams, this.ui.highscoresPage.optionsFilter);

  if (!shouldRedirect) {
    return <HighscoresPage gameFilterToSet={{ category: category, id: id }} optionsFilterToSet={validQueryParams} />;
  
  } else if (validQueryParams) {
    const query = qs.stringify(validQueryParams);
    return (
      <div pathname={props.location.pathname} search={query}>
        <Redirect to={{ pathname: props.location.pathname, search: query }}/>
      </div>
    );
  
  } else {
    return (
      <div pathname={this.getDefaultPath()}>
        <Redirect to={this.getDefaultPath()} />
      </div>
    );
  }
}