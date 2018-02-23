import gamePageReducer from 'js/pages/GamePage/gamePage.reducer';
import { startGame, stopGameLoader, makeMove, setAsSolved, endGame } from 'js/pages/GamePage/gamePage.actions';


describe('gamePageReducer', () => {

  it('should return the initial state', () => {
    expect(gamePageReducer(undefined, {})).toEqual({
      id: undefined,
      moves: 0,
      isSolved: false,
      isLoading: true,
      options: {}
    });
  });

  it('should handle START_GAME', () => {
    expect(gamePageReducer({
      id: undefined,
      moves: 0,
      isSolved: false,
      isLoading: true,
      options: {}
    }, startGame('BossPuzzle', { mode: 'NUM', dimension: '3' }))).toEqual({
      id: 'BossPuzzle',
      moves: 0,
      isSolved: false,
      isLoading: true,
      options: { mode: 'NUM', dimension: '3' }
    });
  });

  it('should handle STOP_GAME_LOADER', () => {
    expect(gamePageReducer({
      id: 'BossPuzzle',
      moves: 0,
      isSolved: false,
      isLoading: true,
      options: { mode: 'NUM', dimension: '3' }
    }, stopGameLoader())).toEqual({
      id: 'BossPuzzle',
      moves: 0,
      isSolved: false,
      isLoading: false,
      options: { mode: 'NUM', dimension: '3' }
    });
  });

  it('should handle MAKE_MOVE', () => {
    expect(gamePageReducer({
      id: 'BossPuzzle',
      moves: 99,
      isSolved: false,
      isLoading: false,
      options: { mode: 'NUM', dimension: '3' }
    }, makeMove())).toEqual({
      id: 'BossPuzzle',
      moves: 100,
      isSolved: false,
      isLoading: false,
      options: { mode: 'NUM', dimension: '3' }
    });
  });

  it('should handle SET_AS_SOLVED', () => {
    expect(gamePageReducer({
      id: 'BossPuzzle',
      moves: 50,
      isSolved: false,
      isLoading: false,
      options: { mode: 'NUM', dimension: '3' }
    }, setAsSolved())).toEqual({
      id: 'BossPuzzle',
      moves: 50,
      isSolved: true,
      isLoading: false,
      options: { mode: 'NUM', dimension: '3' }
    });
  });

  it('should handle END_GAME', () => {
    expect(gamePageReducer({
      id: 'BossPuzzle',
      moves: 50,
      isSolved: true,
      isLoading: false,
      options: { mode: 'NUM', dimension: '3' }
    }, endGame())).toEqual({
      id: undefined,
      moves: 0,
      isSolved: false,
      isLoading: false,
      options: {}
    });
  });
});