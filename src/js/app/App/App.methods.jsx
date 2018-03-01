import React from 'react';
import * as qs from 'query-string';
import { Redirect } from 'react-router-dom';

import { AuthPage, GamesPage, GamePage, HighscoresPage } from 'js/pages';


export const authRouteLogic = function(props) {

  const { authStatus } = this.props;

  if (authStatus === 'connected') {
    
    const state = props.location.state;
    let pathname;
    
    if (!state || state.from.pathname === '/') {
      pathname = this.defaultPath;
    } else {
      pathname = state.from.pathname + state.from.search;
    }

    return (
      <div pathname={pathname}>
        <Redirect to={pathname} />
      </div>
    );
  }

  return <AuthPage authStatus={authStatus} />;
}

export const gamesRouteLogic = function(props) {

  const { api } = this.props;

  if (api.gameCategories.res.data.some(obj => obj.id === props.match.params.category)) {
    return <GamesPage gameCategoryToSet={props.match.params.category} />;
  
  } else {
    return (
      <div pathname={this.defaultPath}>
        <Redirect to={this.defaultPath} />
      </div>
    );
  }
}

export const gameRouteLogic = function(props) {

  const { shouldRedirect, validParams, gameData } = this.validateGameParams(props.match.params, qs.parse(props.location.search));
  
  if (!shouldRedirect) {
    return <GamePage gameData={gameData} queryParams={validParams} />
  
  } else if (validParams) {
    const search = qs.stringify(validParams);
    return (
      <div pathname={props.location.pathname} search={search}>
        <Redirect to={{ pathname: props.location.pathname, search: search }} />;
      </div>
    );

  } else {
    return (
      <div pathname={this.defaultPath}>
        <Redirect to={this.defaultPath} />
      </div>
    );
  }
}

export const highscoresRouteLogic = function(props) {

  const params = qs.parse(props.location.search);
  const { category, id } = params;
  
  delete params.category;
  delete params.id;

  const { shouldRedirect, validParams } = this.validateGameParams({ category, id }, params);

  if (!shouldRedirect) {
    return <HighscoresPage gameFilterToSet={{ category: category, id: id }} optionsFilterToSet={validParams} />;
  
  } else if (validParams) {
    
    let search = `category=${category}&id=${id}`;
    for (const key in validParams) { search += `&${key}=${validParams[key]}`; }

    return (
      <div pathname='/highscores' search={search}>
        <Redirect to={{ pathname: props.location.pathname, search }}/>
      </div>
    );
  
  } else {

    const { highscoresPage } = this.props;
    let search = `category=${highscoresPage.gameFilter.category}&id=${highscoresPage.gameFilter.id}`;
    for (const key in highscoresPage.optionsFilter) { search += `&${key}=${highscoresPage.optionsFilter[key]}`; }

    return (
      <div pathname='/highscores' search={search}>
        <Redirect to={{ pathname: '/highscores', search }} />
      </div>
    );
  }
}