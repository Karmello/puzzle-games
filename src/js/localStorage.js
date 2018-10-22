// @flow
const defaultUiConfig = {
  gamesPage: {
    category: 'sliding',
    options: {
      'boss-puzzle': { mode: 'NUM', dimension: '3' },
      'knights-tour': { dimension: '5' }
    }
  },
  gamePage: {
    infoExpanded: false,
    bestScoreExpanded: false
  },
  highscoresPage: {
    gameFilter: { category: 'sliding', id: 'boss-puzzle' },
    optionsFilter: { mode: 'NUM', dimension: '3' }
  }
};

export const getUiConfig = (username:string, callback:Function) => {

  let ui = localStorage.getItem('ui');

  if (!ui) {
    ui = { [username]: defaultUiConfig };
    localStorage.setItem('ui', JSON.stringify(ui));

  } else {
    ui = JSON.parse(ui);
    if (!ui[username]) {
      ui[username] = defaultUiConfig;
      localStorage.setItem('ui', JSON.stringify(ui));
    }
  }

  callback(ui);
}