import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer } from 'js/components/app';
import { AuthPage, GamesPage, GamePage, ResultsPage } from 'js/components/pages';
import { Loader, MySnackBar, PageError } from 'js/components/other';
import { fetchGames, fetchGameCategories } from 'js/actions/api';
import './App.css';


class App extends Component {

  static minLoadTime = 300;

  state = { snackBarMessage: '' }

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

    const { authStatus, isLoading, gameCategory, api } = this.props;
    const defaultPath = `/games/${gameCategory}`;

    return (
      <div className='App'>
        <Loader isShown={isLoading}>
          <Switch>
            <Route exact path='/auth' render={props => {
              if (authStatus === 'connected' || authStatus === 'error') {
                const state = props.location.state;
                let pathname;
                if (!state || state.from.pathname === '/') { pathname = defaultPath; } else { pathname = state.from.pathname; }
                return <Redirect to={pathname} />;
              }
              return <AuthPage authStatus={authStatus} />;
            }}/>
            <Route path='/' render={props => {
              if (authStatus !== 'connected' && authStatus !== 'error') {
                return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />;
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
                    <Route exact path='/games/:category' render={props => {
                      if (api.gameCategories.data.some(obj => obj.id === props.match.params.category)) {
                        return <GamesPage gameCategoryToSet={props.match.params.category} />;
                      } else {
                        return <Redirect to={defaultPath} />;
                      }
                    }}/>
                    <Route exact path='/games/:category/:id' render={props => {
                      console.log(props);
                      const categoryData = api.gameCategories.data.find(obj => obj.id === props.match.params.category);
                      const gameData = api.games.data.find(obj => obj.id === props.match.params.id);
                      if (categoryData && gameData && gameData.categoryId === categoryData.id) {
                        return <GamePage gameData={gameData} />
                      } else {
                        return <Redirect to={defaultPath} />;
                      }
                    }}/>
                    <Route exact path='/results' component={ResultsPage} />
                    <Redirect from='*' to={defaultPath} />
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
}

export default withRouter(connect(store => ({
  authStatus: store.app.authStatus,
  isLoading: store.app.isLoading,
  gameCategory: store.pages.gamesPage.category,
  api: store.api
}))(App));