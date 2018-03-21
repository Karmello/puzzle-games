import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import { App, AppBar, AppDrawer } from 'js/app';
import { AuthPage, GamePage, GamesPage, HighscoresPage } from 'js/pages';
import { GridGameBoard } from 'js/game';
import { BossPuzzle, SquareTile, EightQueens } from 'js/engines';
import * as gameOptions from 'js/gameOptions';
import * as other from 'js/other';


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

    it('GridGameBoard', () => {
      shallow(<GridGameBoard
        dimension={3}
        squareSize={50}
        Square={() => <div>square</div>}
      />);
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

    it('SquareTile', () => {
      shallow(
        <SquareTile
          options={{}}
          hiddenTileCoords={{ x: 0, y: 0 }}
          tiles={[2, 4, 6, 3, 1, 5, 7, 9, 8]}
          imgSrc={'img.png'}
          row={0}
          col={0}
          isSolved={false}
          onMoveMade={() => {}}
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
      shallow(<gameOptions.BossPuzzleOptions options={{}} />);
    });
  });

  describe('other components', () => {
    
    it('FbBtn', () => {
      shallow(<other.FbBtn authStatus={'unknown'} onClick={() => {}} />);
    });

    it('Loader', () => {
      shallow(<other.Loader isShown />);
    });

    it('MySnackBar', () => {
      shallow(<other.MySnackBar message={'message'} onClose={() => {}} />);
    });

    it('PageError', () => {
      shallow(<other.PageError />);
    });

    it('Timer', () => {
      shallow(<other.Timer on paused={false} />);
    });
  });
});