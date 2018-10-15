// @flow

import React, { Component } from 'react';
import { Button } from 'material-ui';

import { GridGameBoard } from 'js/game';
import BossPuzzle from './../BossPuzzle';
import type { T_GameOptionsModel } from 'js/api';
import type { T_Coords } from 'js/types';


type Props = {
  imgSrc:string,
  col:number,
  row:number,
  tiles:Array<number>,
  hiddenTileCoords:T_Coords,
  options:T_GameOptionsModel,
  isSolved:boolean,
  onMoveMade:Function
};

const fontSizes = { '3': 40, '4': 30, '5': 22 };

class SquareTile extends Component<Props> {

  index:number;
  isHidden:boolean;

  constructor(props:Props) {
    super(props);
    this.index = GridGameBoard.coordsToIndex({ x: props.col, y: props.row }, Number(props.options.dimension));
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
      fontSize: `${fontSizes[options.dimension || '3']}px`,
      color: '#001f3f',
      backgroundColor: 'rgba(61, 153, 112, 0.75)',
      backgroundImage: undefined,
      backgroundSize: undefined,
      backgroundPosition: undefined,
      visibility: undefined
    };

    if (!this.isHidden) {

      const label = this.getLabel();

      if (options.mode === 'IMG' && imgSrc && label) {
        const imgCoords = GridGameBoard.indexToCoords(Number(label) - 1, Number(options.dimension));
        const imgSize = BossPuzzle.tilesSizes[options.dimension];
        style.backgroundImage = `url(${imgSrc})`;
        style.backgroundSize = `${Number(options.dimension) * imgSize}px ${Number(options.dimension) * imgSize}px`;
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
    return GridGameBoard.coordsToIndex({ x: col, y: row }, Number(options.dimension)) + 1 === this.getLabel();
  }

  onClick() {

    const { options, hiddenTileCoords, row, col, isSolved, onMoveMade } = this.props;

    if (!isSolved) {
      
      const targetCoords = { x: col, y: row };
      const allMovementCoords = GridGameBoard.findAllMovementCoords(targetCoords, Number(options.dimension));

      for (let coords of allMovementCoords) {

        // If hidden tile found
        if (coords.x === hiddenTileCoords.x && coords.y === hiddenTileCoords.y) {

          const index1 = GridGameBoard.coordsToIndex(targetCoords, Number(options.dimension));
          const index2 = GridGameBoard.coordsToIndex(coords, Number(options.dimension));
          return onMoveMade(index1, index2, targetCoords);
        }
      }
    }
  }
}

export default SquareTile;