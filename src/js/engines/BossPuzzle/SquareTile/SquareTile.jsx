import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

import { GridGameBoard } from 'js/game';
import { BossPuzzle } from 'js/engines';


const fontSizes = { 3: 40, 4: 30, 5: 22 };

class SquareTile extends Component {

  constructor(props) {
    super(props);
    this.index = GridGameBoard.coordsToIndex({ x: props.col, y: props.row }, props.options.dimension);
  }

  componentWillMount() {
    const { hiddenTileCoords, row, col } = this.props;
    this.isHidden = (col === hiddenTileCoords.x && row === hiddenTileCoords.y);
  }

  render() {
    return (
      <Button
        disableRipple
        variant='raised'
        style={this.getStyle()}
        onClick={this.onClick.bind(this)}
      >{this.props.options.mode === 'NUM' ? this.getLabel() : ''}</Button>
    );
  }

  getStyle() {
    
    const { options, imgSrc } = this.props;
    const tileSize = BossPuzzle.tilesSizes[options.dimension];

    const style = {
      minWidth: `${tileSize}px`,
      width: `${tileSize}px`,
      height: `${tileSize}px`,
      fontSize: `${fontSizes[options.dimension]}px`,
      color: '#001f3f',
      backgroundColor: '#3D9970'
    };

    if (!this.isHidden) {

      if (options.mode === 'IMG' && imgSrc) {
        const imgCoords = GridGameBoard.indexToCoords(this.getLabel() - 1, options.dimension);
        const imgSize = BossPuzzle.tilesSizes[options.dimension];
        style.backgroundImage = `url(${imgSrc})`;
        style.backgroundSize = `${options.dimension * imgSize}px ${options.dimension * imgSize}px`;
        style.backgroundPosition = `-${imgCoords.x * imgSize}px -${imgCoords.y * imgSize}px`;
      }

    } else {
      style.visibility = 'hidden';
    }

    return style;
  }

  getLabel() {

    const { tiles } = this.props;
    if (tiles.length > 0) { return tiles[this.index]; } else { return ''; }
  }

  isInProperPlace() {

    const { options, row, col } = this.props;
    return GridGameBoard.coordsToIndex({ x: col, y: row }, options.dimension) + 1 === this.getLabel();
  }

  onClick() {

    const { options, hiddenTileCoords, row, col, isSolved, onMoveMade } = this.props;

    if (!isSolved) {
      
      const targetCoords = { x: col, y: row };
      const allMovementCoords = GridGameBoard.findAllMovementCoords(targetCoords, options.dimension);

      for (let coords of allMovementCoords) {

        // If hidden tile found
        if (coords.x === hiddenTileCoords.x && coords.y === hiddenTileCoords.y) {

          const index1 = GridGameBoard.coordsToIndex(targetCoords, options.dimension);
          const index2 = GridGameBoard.coordsToIndex(coords, options.dimension);
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