import React, { Component } from 'react';
import { Button } from 'material-ui';

import { BossPuzzle } from 'js/components';


export default class SquareTile extends Component {

  constructor(props) {
    super(props);
    this.showLabel = false;
    this.index = props.row * props.games.BOSS_PUZZLE.dimension + props.col;
  }

  componentWillUpdate(nextProps, nextState) {
    const bossPuzzle = nextProps.games.BOSS_PUZZLE;
    const { row, col } = nextProps;
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
    
    const { games, game, imgSrc } = this.props;
    const bossPuzzle = games.BOSS_PUZZLE;

    // Setting background image    
    if ((!this.isHidden || game.isSolved) && imgSrc) {

      const imgCoords = BossPuzzle.indexToCoords(this.getLabel() - 1, bossPuzzle.dimension);
      const imgSize = BossPuzzle.tilesSizes[bossPuzzle.dimension];

      return {
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: `${bossPuzzle.dimension * imgSize}px ${bossPuzzle.dimension * imgSize}px`,
        backgroundPosition: `-${imgCoords.y * imgSize}px -${imgCoords.x * imgSize}px`,
        pointerEvents: game.isSolved ? 'none': 'initial'
      }
  
    // Hiding
    } else {
      return { 'visibility': 'hidden' };
    }
  }

  getLabel() {

    return this.props.games.BOSS_PUZZLE.tiles[this.index];
  }

  isInProperPlace() {

    const { games, row, col } = this.props;
    const bossPuzzle = games.BOSS_PUZZLE;
    return row * bossPuzzle.dimension + col + 1 === this.getLabel();
  }
}