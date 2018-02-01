import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import * as qs from 'query-string';

import { AppBar, AppDrawer } from 'js/components/app';
import { AuthPage, GamesPage, GamePage, ResultsPage } from 'js/components/pages';
import { Loader, MySnackBar, PageError } from 'js/components/other';
import { fetchGames, fetchGameCategories } from 'js/actions/api';
import { validateGameRouteParams } from 'js/components/app/App/App.queryparams';
import './App.css';


class App extends Component {

  static minLoadTime = 300;

  constructor(props) {
    super(props);
    this.defaultPath = `/games/${props.gamesPage.category}`;
    this.state = { snackBarMessage: '' };
  }

  componentWillReceiveProps(nextProps) {
    
    const { authStatus, api } = this.props;

    if (authStatus !== 'error' && nextProps.authStatus === 'error') {
      this.setState({ snackBarMessage: 'Could not login.' });
    
    } else if (api.newResult.isFetching && !nextProps.api.newResult.isFetching && nextProps.api.newResult.status === 200) {
      this.setState({ snackBarMessage: 'Your score has been saved.' });
    }
  }

  componentDidMount() {

    this.props.dispatch(fetchGames());
    this.props.dispatch(fetchGameCategories());
  }

  render() {

    const { authStatus, isLoading, api } = this.props;

    return (
      <div className='App'>
        <Loader isShown={isLoading}>
          <Switch>
            <Route exact path='/auth' render={props => this.authRouteLogic(props)}/>
            <Route path='/' render={props => {
              if (authStatus !== 'connected' && authStatus !== 'error') {
                return <Redirect to={{
                  pathname: '/auth',
                  state: api.clientUser.status === 200 ? undefined : { from: props.location }
                }}/>;
              }
              return (
                <div>
                  <AppBar/>
                  {api.clientUser.status === 200 && <AppDrawer/>}
                  <MySnackBar
                    message={this.state.snackBarMessage}
                    onClose={() => { this.setState({ snackBarMessage: '' }) }}
                  />
                  {api.gameCategories.status === 200 && api.games.status === 200 &&
                  <Switch>
                    <Route exact path='/games/:category' render={props => this.gamesRouteLogic(props)} />
                    <Route exact path='/games/:category/:id' render={props => this.gameRouteLogic(props)} />
                    <Route exact path='/results' component={ResultsPage} />
                    <Redirect from='*' to={this.defaultPath} />
                  </Switch>}
                  {(api.gameCategories.status !== 200 || api.games.status !== 200) && <PageError/> }
                </div>
              );
            }}/>
          </Switch>
        </Loader>
      </div>
    );
  }

  authRouteLogic(props) {

    const { authStatus } = this.props;

    if (authStatus === 'connected' || authStatus === 'error') {
      
      const state = props.location.state;
      let pathname;
      
      if (!state || state.from.pathname === '/') {
        pathname = this.defaultPath;
      } else {
        pathname = state.from.pathname + state.from.search;
      }

      return <Redirect to={pathname} />;
    }

    return <AuthPage authStatus={authStatus} />;
  }

  gamesRouteLogic(props) {

    const { api } = this.props;

    if (api.gameCategories.data.some(obj => obj.id === props.match.params.category)) {
      return <GamesPage gameCategoryToSet={props.match.params.category} />;
    
    } else {
      return <Redirect to={this.defaultPath} />;
    }
  }

  gameRouteLogic(props) {

    const { api } = this.props;
    
    const categoryData = api.gameCategories.data.find(obj => obj.id === props.match.params.category);
    const gameData = api.games.data.find(obj => obj.id === props.match.params.id);
    
    if (categoryData && gameData && gameData.categoryId === categoryData.id) {

      const { areValid, validParams } = validateGameRouteParams(gameData.options, qs.parse(props.location.search));
      
      if (!areValid) {
        return <Redirect to={{ pathname: props.location.pathname, search: qs.stringify(validParams) }}/>;
      } else {
        return <GamePage gameData={gameData} queryParams={validParams} />
      }
    
    } else {
      return <Redirect to={this.defaultPath} />;
    }
  }
}

export default withRouter(connect(store => ({
  authStatus: store.app.authStatus,
  isLoading: store.app.isLoading,
  gamesPage: store.pages.gamesPage,
  api: store.api
}))(App));