import React, { Component } from 'react';
import { Button } from 'material-ui';

import { Frame } from 'js/components';


export default class SquareTile extends Component {

  constructor(props) {
    super(props);
    this.showLabel = false;
    this.index = props.row * props.frame.dimension + props.col;
  }

  componentWillUpdate(nextProps, nextState) {
    const { frame, row, col } = nextProps;
    this.isHidden = (row === frame.hiddenTileCoords.x && col === frame.hiddenTileCoords.y);
  }

  render() {
    return (
      <Button
        raised
        className='SquareTile'
        style={this.getStyle()}
        color={this.isInProperPlace() ? 'default' : 'contrast'}
        onClick={this.props.onSquareTileClick.bind(this)}
      >{this.showLabel ? this.getLabel() : ''}</Button>
    );
  }

  getStyle() {
    
    const { frame, round, imgSrc, tilesSizes } = this.props;

    // Setting background image    
    if ((!this.isHidden || round.isSolved) && imgSrc) {

      const imgCoords = Frame.indexToCoords(this.getLabel() - 1, frame.dimension);
      const imgSize = tilesSizes[frame.dimension];

      return {
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: `${frame.dimension * imgSize}px ${frame.dimension * imgSize}px`,
        backgroundPosition: `-${imgCoords.y * imgSize}px -${imgCoords.x * imgSize}px`,
        pointerEvents: round.isSolved ? 'none': 'initial'
      }
  
    // Hiding
    } else {
      return { 'visibility': 'hidden' };
    }
  }

  getLabel() {

    return this.props.frame.tiles[this.index];
  }

  isInProperPlace() {

    const { frame, row, col } = this.props;
    return row * frame.dimension + col + 1 === this.getLabel();
  }
}