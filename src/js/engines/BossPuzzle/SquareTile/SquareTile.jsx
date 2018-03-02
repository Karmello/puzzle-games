import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

import BossPuzzle from './../BossPuzzle';
import { coordsToIndex, findAllMovementCoords, indexToCoords } from './../BossPuzzle.static';


class SquareTile extends Component {

  constructor(props) {
    super(props);
    this.index = coordsToIndex({ x: props.col, y: props.row }, props.options.dimension);
  }

  componentWillReceiveProps(nextProps) {
    const { hiddenTileCoords, row, col } = nextProps;
    this.isHidden = (col === hiddenTileCoords.x && row === hiddenTileCoords.y);
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
          backgroundPosition: `-${imgCoords.x * imgSize}px -${imgCoords.y * imgSize}px`
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
    return coordsToIndex({ x: col, y: row }, options.dimension) + 1 === this.getLabel();
  }

  onClick() {

    const { options, hiddenTileCoords, row, col, isSolved, onMoveMade } = this.props;

    if (!isSolved) {
      
      const targetCoords = { x: col, y: row };
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

SquareTile.propTypes = {
  options: PropTypes.object.isRequired,
  hiddenTileCoords: PropTypes.object.isRequired,
  tiles: PropTypes.array.isRequired,
  imgSrc: PropTypes.string,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  isSolved: PropTypes.bool.isRequired,
  onMoveMade: PropTypes.func.isRequired
};

export default SquareTile;