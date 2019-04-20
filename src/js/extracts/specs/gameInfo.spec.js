import { humanizeHighscoreTime  } from 'js/extracts/gameInfo';

describe('gameInfo extracts', () => {

  describe('humanizeHighscoreTime method', () => {

    it('should humanize time correctly', () => {
      expect(humanizeHighscoreTime(1).trim()).toEqual('a second');
      expect(humanizeHighscoreTime(30).trim()).toEqual('30 seconds');
      expect(humanizeHighscoreTime(60).trim()).toEqual('a minute');
      expect(humanizeHighscoreTime(120).trim()).toEqual('2 minutes');
      expect(humanizeHighscoreTime(3600).trim()).toEqual('an hour');
    });
  });
});