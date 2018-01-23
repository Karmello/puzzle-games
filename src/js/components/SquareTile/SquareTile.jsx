import React, { Component } from 'react';
import { Button } from 'material-ui';

import { BossPuzzle } from 'js/containers';
import { coordsToIndex, findAllMovementCoords, indexToCoords } from 'js/containers/BossPuzzle/BossPuzzle.static';


export default class SquareTile extends Component {

  constructor(props) {
    super(props);
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
        onClick={this.onClick.bind(this)}
      >{this.props.showLabel ? this.getLabel() : ''}</Button>
    );
  }

  getStyle() {
    
    const { bossPuzzle, imgSrc } = this.props;

    // Setting background image    
    if (!this.isHidden && imgSrc) {

      const imgCoords = indexToCoords(this.getLabel() - 1, bossPuzzle.dimension);
      const imgSize = BossPuzzle.tilesSizes[bossPuzzle.dimension];

      return {
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: `${bossPuzzle.dimension * imgSize}px ${bossPuzzle.dimension * imgSize}px`,
        backgroundPosition: `-${imgCoords.y * imgSize}px -${imgCoords.x * imgSize}px`
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

  onClick() {

    const { bossPuzzle, row, col, isSolved, onMoveMade } = this.props;

    if (!isSolved) {
      
      const targetCoords = { x: row, y: col };
      const allMovementCoords = findAllMovementCoords(targetCoords, bossPuzzle.dimension);

      for (let coords of allMovementCoords) {

        // If hidden tile found
        if (coords.x === bossPuzzle.hiddenTileCoords.x && coords.y === bossPuzzle.hiddenTileCoords.y) {

          const index1 = coordsToIndex(targetCoords, bossPuzzle.dimension);
          const index2 = coordsToIndex(coords, bossPuzzle.dimension);
          return onMoveMade(index1, index2, targetCoords);
        }
      }
    }
  }
}