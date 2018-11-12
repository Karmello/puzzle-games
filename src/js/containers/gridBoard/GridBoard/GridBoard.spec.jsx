import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import GridBoard from './GridBoard';

describe('GridBoard', () => {
  it('should render', () => {
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