import React, { Component } from 'react';
import { Button } from 'material-ui';

import { BossPuzzle } from 'js/components';


export default class SquareTile extends Component {

  constructor(props) {
    super(props);
    this.showLabel = false;
    this.index = props.row * props.bossPuzzle.dimension + props.col;
  }

  componentWillUpdate(nextProps, nextState) {
    const { bossPuzzle, row, col } = nextProps;
    this.isHidden = (row === bossPuzzle.hiddenTileCoords.x && col === bossPuzzle.hiddenTileCoords.y);
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
    
    const { round, bossPuzzle, imgSrc } = this.props;

    // Setting background image    
    if ((!this.isHidden || round.isSolved) && imgSrc) {

      const imgCoords = BossPuzzle.indexToCoords(this.getLabel() - 1, bossPuzzle.dimension);
      const imgSize = BossPuzzle.tilesSizes[bossPuzzle.dimension];

      return {
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: `${bossPuzzle.dimension * imgSize}px ${bossPuzzle.dimension * imgSize}px`,
        backgroundPosition: `-${imgCoords.y * imgSize}px -${imgCoords.x * imgSize}px`,
        pointerEvents: round.isSolved ? 'none': 'initial'
      }
  
    // Hiding
    } else {
      return { 'visibility': 'hidden' };
    }
  }

  getLabel() {

    return this.props.bossPuzzle.tiles[this.index];
  }

  isInProperPlace() {

    const { bossPuzzle, row, col } = this.props;
    return row * bossPuzzle.dimension + col + 1 === this.getLabel();
  }
}