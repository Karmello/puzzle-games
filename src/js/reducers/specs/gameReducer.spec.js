import gameReducer from 'js/reducers/game';
import { startGame, stopGameLoader, makeMove, setAsSolved, endGame } from 'js/actions/game';


describe('gameReducer', () => {

  it('should return the initial state', () => {
    expect(gameReducer(undefined, {})).toEqual({
      id: '',
      moves: 0,
      isSolved: false,
      isLoading: true,
      doRestart: false,
      options: {}
    });
  });

  it('should handle GAME_START', () => {
    expect(gameReducer({
      id: '',
      moves: 0,
      isSolved: false,
      isLoading: true,
      doRestart: false,
      options: {}
    }, startGame('boss-puzzle', { mode: 'NUM', dimension: '3' }, true))).toEqual({
      id: 'boss-puzzle',
      moves: 0,
      isSolved: false,
      isLoading: true,
      doRestart: true,
      options: { mode: 'NUM', dimension: '3' }
    });
  });

  it('should handle GAME_STOP_LOADER', () => {
    expect(gameReducer({
      id: 'boss-puzzle',
      moves: 0,
      isSolved: false,
      isLoading: true,
      doRestart: true,
      options: { mode: 'NUM', dimension: '3' }
    }, stopGameLoader())).toEqual({
      id: 'boss-puzzle',
      moves: 0,
      isSolved: false,
      isLoading: false,
      doRestart: false,
      options: { mode: 'NUM', dimension: '3' }
    });
  });

  it('should handle GAME_MAKE_MOVE', () => {
    expect(gameReducer({
      id: 'boss-puzzle',
      moves: 99,
      isSolved: false,
      isLoading: false,
      doRestart: false,
      options: { mode: 'NUM', dimension: '3' }
    }, makeMove())).toEqual({
      id: 'boss-puzzle',
      moves: 100,
      isSolved: false,
      isLoading: false,
      doRestart: false,
      options: { mode: 'NUM', dimension: '3' }
    });
  });

  it('should handle GAME_SET_AS_SOLVED', () => {
    expect(gameReducer({
      id: 'boss-puzzle',
      moves: 50,
      isSolved: false,
      isLoading: false,
      doRestart: false,
      options: { mode: 'NUM', dimension: '3' }
    }, setAsSolved())).toEqual({
      id: 'boss-puzzle',
      moves: 50,
      isSolved: true,
      isLoading: false,
      doRestart: false,
      options: { mode: 'NUM', dimension: '3' }
    });
  });

  it('should handle GAME_END', () => {
    expect(gameReducer({
      id: 'boss-puzzle',
      moves: 50,
      isSolved: true,
      isLoading: false,
      doRestart: false,
      options: { mode: 'NUM', dimension: '3' }
    }, endGame())).toEqual({
      id: '',
      moves: 0,
      isSolved: false,
      isLoading: false,
      doRestart: false,
      options: {}
    });
  });
});
