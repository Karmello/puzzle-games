import React from 'react';
import { mount } from 'enzyme';
import Draggable from 'react-draggable';
import { Row, Col } from 'react-flexbox-grid';

import { createNewStore } from 'js/store';
import GridBoard from './GridBoard';

const Element = () => <div>i am element</div>;

describe('GridBoard', () => {

  it('should render', () => {
    const gridBoard = mount(
      <GridBoard
        store={createNewStore()}
        dimension={3}
        gridMap={[true, false, false, false, false, true, false, false, true]}
        element={{ size: 50, Element }}
      />
    );
    expect(gridBoard.find(Row).length).toEqual(3);
    expect(gridBoard.find(Col).length).toEqual(9);
    expect(gridBoard.find(Element).length).toEqual(3);
    expect(gridBoard.find(Draggable).length).toEqual(0);
  });

  it('should render', () => {
    const gridBoard = mount(
      <GridBoard
        store={createNewStore()}
        dimension={2}
        gridMap={[true, false, false, false]}
        element={{
          size: 50,
          isDraggable: true,
          Element
        }}
      />
    );
    expect(gridBoard.find(Row).length).toEqual(2);
    expect(gridBoard.find(Col).length).toEqual(4);
    expect(gridBoard.find(Element).length).toEqual(1);
    expect(gridBoard.find(Draggable).length).toEqual(1);
  });
});