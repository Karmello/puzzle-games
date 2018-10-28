// @flow
import * as React from 'react';
import { Component } from 'react';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import { GridElement, DraggableGridElement } from 'js/components';
import { coordsToIndex } from 'js/extracts/gridBoard';
import './GridBoard.css';

type Props = {
  dimension:number,
  elementSize:number,
  Element:React.ComponentType<{ col:number, row:number, index:number }>,
  isDraggable?:boolean,
  isChessBoard?:boolean,
  gridData?:Array<boolean>,
  onDragStop?:Function,
  onEmptyCellClick?:Function
};

type State = {
  lastDraggedIndex:number|null
};

export default class GridBoard extends Component<Props, State> {

  getStyles:(subject:string, args?:{ col?:number, row?:number, index?:number }) => {}|null;

  state = { lastDraggedIndex: null };

  render() {

    const { dimension, elementSize, isDraggable, Element, gridData } = this.props;
    
    if (!dimension || !elementSize) { return null; }

    return (
      <Paper className='GridBoard' style={this.getStyles('board')}>{
        Array.from({ length: dimension }, (v, k) => k).map(i => (
          <Row key={i} style={this.getStyles('row')}>{
            Array.from({ length: dimension }, (v, k) => k).map(j => {
              
              const row = Number(i);
              const col = Number(j);
              const index = coordsToIndex({ x: col, y: row }, dimension);
              
              return (
                <Col key={j}>
                  <div
                    style={this.getStyles('elementContainer', { col, row })}
                    onClick={this.onBoardClick.bind(this, index)}
                  >
                    {!isDraggable && <GridElement
                      gridData={gridData}
                      col={col}
                      row={row}
                      index={index}
                      Element={Element}
                    />}
                    {isDraggable && <div style={this.getStyles('draggableElementContainer', { index })}>
                      <DraggableGridElement
                        col={col}
                        row={row}
                        index={index}
                        dimension={dimension}
                        elementSize={elementSize}
                        Element={Element}
                        gridData={gridData}
                        onDragStart={this.onDragStart.bind(this)}
                        onDragStop={this.onDragStop.bind(this)}
                      />
                    </div>}
                  </div>
                </Col>
              );
            })
          }</Row>
        ))
      }</Paper>
    );
  }

  onBoardClick(index:number) {
    const { onEmptyCellClick, gridData } = this.props;
    if (onEmptyCellClick && gridData && !gridData[index]) { onEmptyCellClick(index); }
  }

  onDragStop(index:number) {
    const { onDragStop } = this.props;
    const { lastDraggedIndex } = this.state;
    if (onDragStop) {
      return onDragStop(lastDraggedIndex, index);
    }
  }

  getStyles(subject:string, args:{ col:number, row:number, index:number }) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { dimension, elementSize, isChessBoard, onEmptyCellClick } = this.props;

    switch (subject) {

      case 'board':
        return { minWidth: dimension * elementSize + 'px', cursor: onEmptyCellClick ? 'pointer' : 'default' }

      case 'row':
        return { padding: 0, margin: 0 }

      case 'elementContainer':
        const style = {
          minWidth: `${elementSize}px`,
          height: `${elementSize}px`,
          backgroundColor: undefined
        };
        if (isChessBoard) {
          style.backgroundColor = squareBgColors[(args.col + args.row) % 2];
        }
        return style;

      case 'draggableElementContainer':
        return {
          position: 'relative',
          zIndex: args.index === this.state.lastDraggedIndex ? 100: 99
        }

      default:
        return null;
    }
  }

  onDragStart = (index:number) => () => this.setState({ lastDraggedIndex: index });
}