import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import { App, AppBar, AppDrawer, AuthPage, GamePage, GamesPage, HighscoresPage, BossPuzzle, EightQueens } from 'js/containers';
import { GridGameBoard, SquareTile, BossPuzzleOptions, KnightsTourOptions, FbBtn, Loader, MySnackBar, PageError, Timer } from 'js/components';

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