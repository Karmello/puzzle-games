import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import { App, AppBar, AppDrawer, AuthPage, GamePage, GamesPage, HighscoresPage, BossPuzzle, EightQueens, GridBoard } from 'js/containers';
import { BossPuzzleOptions, KnightsTourOptions, FbBtn, Loader, MySnackBar, PageError, Timer } from 'js/components';

describe('should render', () => {
  
  describe('app components', () => {
    
    it('App', () => {
      shallow(<App />);
    });

    it('AppBar', () => {
      shallow(<AppBar store={store} />);
    });

    it('AppDrawer', () => {
      shallow(<AppDrawer store={store} />);
    });
  });

  describe('pages', () => {
    
    it('AuthPage', () => {
      shallow(<AuthPage store={store} />);
    });

    it('GamePage', () => {
      shallow(<GamePage store={store} />);
    });

    it('GamesPage', () => {
      shallow(<GamesPage store={store} />);
    });

    it('HighscoresPage', () => {
      shallow(<HighscoresPage store={store} />);
    });
  });

  describe('game', () => {

    it('GridBoard', () => {
      shallow(
        <GridBoard
          store={store}
          dimension={3}
          element={{
            size: 50
          }}
          Square={() => <div>square</div>}
        />
      );
    });
  });

  describe('engine components', () => {
    
    it('BossPuzzle', () => {
      shallow(
        <BossPuzzle
          store={store}
          readTimer={() => {}}
        />
      );
    });

    it('EightQueens', () => {
      shallow(<EightQueens
        store={store}
        readTimer={() => {}}
      />);
    });
  });

  describe('game options', () => {
    
    it('BossPuzzleOptions', () => {
      shallow(<BossPuzzleOptions options={{}} />);
    });

    it('KnightsTourOptions', () => {
      shallow(<KnightsTourOptions options={{}} />);
    });
  });

  describe('other components', () => {
    
    it('FbBtn', () => {
      shallow(<FbBtn authStatus={'unknown'} onClick={() => {}} />);
    });

    it('Loader', () => {
      shallow(<Loader isShown />);
    });

    it('MySnackBar', () => {
      shallow(<MySnackBar message={'message'} onClose={() => {}} />);
    });

    it('PageError', () => {
      shallow(<PageError />);
    });

    it('Timer', () => {
      shallow(<Timer on paused={false} />);
    });
  });
});