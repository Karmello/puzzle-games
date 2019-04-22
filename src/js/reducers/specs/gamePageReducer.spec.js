import gamePageReducer from 'js/reducers/gamePage';
import { toggleExpansionPanel } from 'js/actions/gamePage';


describe('gamePageReducer', () => {

  it('should return the initial state', () => {
    expect(gamePageReducer(undefined, {})).toEqual({
      infoExpanded: false,
      bestScoreExpanded: false
    });
  });

  it('should handle GAME_PAGE_TOGGLE_EXPANSION_PANEL', () => {
    expect(gamePageReducer({
      infoExpanded: false,
      bestScoreExpanded: false
    }, toggleExpansionPanel('info', true))).toEqual({
      infoExpanded: true,
      bestScoreExpanded: false
    });
  });

  it('should handle GAME_PAGE_TOGGLE_EXPANSION_PANEL', () => {
    expect(gamePageReducer({
      infoExpanded: false,
      bestScoreExpanded: true
    }, toggleExpansionPanel('bestScore', false))).toEqual({
      infoExpanded: false,
      bestScoreExpanded: false
    });
  });
});
