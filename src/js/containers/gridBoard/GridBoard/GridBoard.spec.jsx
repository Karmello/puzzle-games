import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Draggable from 'react-draggable';
import { Row, Col } from 'react-flexbox-grid';

import { createNewStore } from 'js/store';
import GridBoard from './GridBoard';

const Element = () => <div>i am element</div>;

describe('GridBoard', () => {

  let getComponent;
  beforeAll(() => {
    getComponent = props => (
      <Provider store={createNewStore()}>
        <GridBoard {...props} />
      </Provider>
    );
  });

  it('should mount', () => {
    const props = {
      dimension: { x: 3, y: 3 },
      gridMap: [true, false, false, false, false, true, false, false, true],
      element: { size: 50, Element }
    };
    const wrapper = mount(getComponent(props));
    expect(wrapper.find(Row).length).toEqual(3);
    expect(wrapper.find(Col).length).toEqual(9);
    expect(wrapper.find(Element).length).toEqual(3);
    expect(wrapper.find(Draggable).length).toEqual(0);
  });

  it('should mount', () => {
    const props = {
      dimension: { x: 2, y: 2 },
      gridMap: [true, false, false, false],
      element: { size: 50, isDraggable: true, Element }
    };
    const wrapper = mount(getComponent(props));
    expect(wrapper.find(Row).length).toEqual(2);
    expect(wrapper.find(Col).length).toEqual(4);
    expect(wrapper.find(Element).length).toEqual(1);
    expect(wrapper.find(Draggable).length).toEqual(1);
  });

  it('should mount', () => {
    const props = {
      dimension: { x: 2, y: 2 },
      gridMap: [true, false, false, false],
      element: { size: 50, isSelectable: true, Element }
    };
    const wrapper = mount(getComponent(props));
    expect(wrapper.find(Row).length).toEqual(2);
    expect(wrapper.find(Col).length).toEqual(4);
    expect(wrapper.find(Element).length).toEqual(1);
    expect(wrapper.find(Draggable).length).toEqual(0);
  });
});