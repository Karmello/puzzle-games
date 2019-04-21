import React from 'react';
import { mount } from 'enzyme';

import HighscoresTable from './HighscoresTable';

describe('HighscoresTable', () => {

  let props;

  beforeAll(() => {
    props = [
      { highscores: { req: { isAwaiting: false }} },
      { highscores: { req: { isAwaiting: true } } },
      {
        highscores: {
          req: { isAwaiting: false },
          res: { status: 200, data: [] }
        }
      },
      {
        highscores: {
          req: { isAwaiting: false },
          res: { status: 400 }
        }
      },
      username => ({
        highscores: {
          req: { isAwaiting: false },
          res: {
            status: 200,
            data: [{
              _id: '1234',
              username: 'Karmello',
              date: '',
              details: { seconds: 50, moves: 100 }
            }]
          }
        },
        clientUser: {
          res: { data: { username } }
        }
      })
    ];
  });

  it('should mount', () => {
    const wrapper = mount(<HighscoresTable api={props[0]} />);
    wrapper.setProps({ api: props[1] });
  });

  it('should mount', () => {
    const wrapper = mount(<HighscoresTable api={props[1]} />);
    wrapper.setProps({ api: props[2] });
  });

  it('should mount', () => {
    const wrapper = mount(<HighscoresTable api={props[1]} />);
    wrapper.setProps({ api: props[3] });
  });

  it('should mount', () => {
    const wrapper = mount(<HighscoresTable api={props[1]} />);
    wrapper.setProps({ api: props[4]('Karmello') });
  });

  it('should mount', () => {
    const wrapper = mount(<HighscoresTable api={props[1]} />);
    wrapper.setProps({ api: props[4]('Karmelito') });
  });
});
