import React, { Component } from 'react';
import { Button } from 'material-ui';

import BossPuzzle from './../BossPuzzle';
import { coordsToIndex, findAllMovementCoords, indexToCoords } from './../BossPuzzle.static';


export default class SquareTile extends Component {

  constructor(props) {
    super(props);
    this.index = props.row * props.options.dimension + props.col;
  }

  componentWillReceiveProps(nextProps) {
    const { hiddenTileCoords, row, col } = nextProps;
    this.isHidden = (row === hiddenTileCoords.x && col === hiddenTileCoords.y);
  }

  render() {
    
    return (
      <Button
        raised
        disableRipple
        className='SquareTile'
        style={this.getStyle()}
        color={this.getLabelColor()}
        onClick={this.onClick.bind(this)}
      >{this.props.options.mode === 'NUM' ? this.getLabel() : ''}</Button>
    );
  }

  getStyle() {
    
    const { options, imgSrc } = this.props;

    if (!this.isHidden) {

      if (options.mode === 'IMG' && imgSrc) {

        const imgCoords = indexToCoords(this.getLabel() - 1, options.dimension);
        const imgSize = BossPuzzle.tilesSizes[options.dimension];

        return {
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: `${options.dimension * imgSize}px ${options.dimension * imgSize}px`,
          backgroundPosition: `-${imgCoords.y * imgSize}px -${imgCoords.x * imgSize}px`
        }
      
      }

    } else {
      return { 'visibility': 'hidden' };
    }
  }

  getLabelColor() {

    if (this.props.options.mode === 'NUM') {
      return this.isInProperPlace() ? 'default' : 'contrast'
    
    } else {
      return 'default';
    }
  }

  getLabel() {

    const { tiles } = this.props;
    if (tiles.length > 0) { return tiles[this.index]; } else { return ''; }
  }

  isInProperPlace() {

    const { options, row, col } = this.props;
    return row * options.dimension + col + 1 === this.getLabel();
  }

  onClick() {

    const { options, hiddenTileCoords, row, col, isSolved, onMoveMade } = this.props;

    if (!isSolved) {
      
      const targetCoords = { x: row, y: col };
      const allMovementCoords = findAllMovementCoords(targetCoords, options.dimension);

      for (let coords of allMovementCoords) {

        // If hidden tile found
        if (coords.x === hiddenTileCoords.x && coords.y === hiddenTileCoords.y) {

          const index1 = coordsToIndex(targetCoords, options.dimension);
          const index2 = coordsToIndex(coords, options.dimension);
          return onMoveMade(index1, index2, targetCoords);
        }
      }
    }
  }
}