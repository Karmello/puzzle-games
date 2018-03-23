import gameReducer from 'js/game/game.reducer';
import { startGame, stopGameLoader, makeMove, setAsSolved, endGame } from 'js/game/game.actions';


describe('gameReducer', () => {

  it('should return the initial state', () => {
    expect(gameReducer(undefined, {})).toEqual({
      id: undefined,
      moves: 0,
      isSolved: false,
      isLoading: true,
      doRestart: false,
      options: {}
    });
  });

  it('should handle START_GAME', () => {
    expect(gameReducer({
      id: undefined,
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

  it('should handle STOP_GAME_LOADER', () => {
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

  it('should handle MAKE_MOVE', () => {
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

  it('should handle SET_AS_SOLVED', () => {
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

  it('should handle END_GAME', () => {
    expect(gameReducer({
      id: 'boss-puzzle',
      moves: 50,
      isSolved: true,
      isLoading: false,
      doRestart: false,
      options: { mode: 'NUM', dimension: '3' }
    }, endGame())).toEqual({
      id: undefined,
      moves: 0,
      isSolved: false,
      isLoading: false,
      doRestart: false,
      options: {}
    });
  });
});