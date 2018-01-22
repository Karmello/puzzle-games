import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

import { SquareTile } from 'js/components';
import { clearHiddenTileCoords, switchTiles, resetFrame } from 'js/actions';
import './BossPuzzle.css';


class BossPuzzle extends Component {

  static tilesSizes = { 3: 150, 4: 125, 5: 100 };
  
  componentDidUpdate(prevProps, prevState) {

    const { bossPuzzle, onBeenSolved, dispatch } = this.props;

    // if move was made
    if (bossPuzzle.moves === prevProps.bossPuzzle.moves + 1) {
      
      // checking if solved
      for (let i = 0; i < bossPuzzle.tiles.length; i++) {
        if (i + 1 !== bossPuzzle.tiles[i]) {
          return;
        }
      }

      // if been solved
      dispatch(clearHiddenTileCoords());
      onBeenSolved();
    }
  }

  componentWillUnmount() {
        
    this.props.dispatch(resetFrame());
  }

  render() {

    const { bossPuzzle, imgSrc, isSolved } = this.props;
    
    return (
      <div className={'BossPuzzle-' + bossPuzzle.dimension}> {
      Array.from({ length: bossPuzzle.dimension }, (v, k) => k).map((i) => (
        <Row key={i} className='BossPuzzle-row'> {
        Array.from({ length: bossPuzzle.dimension }, (v, k) => k).map((j) => (
          <Col key={j} className='BossPuzzle-col'>
            <SquareTile
              bossPuzzle={bossPuzzle}
              imgSrc={imgSrc}
              row={Number(i)}
              col={Number(j)}
              isSolved={isSolved}
              onMoveMade={this.onMoveMade.bind(this)}
              showLabel={false}
            />
          </Col>
        ))}</Row>
      ))}</div>
    );
  }

  onMoveMade(index1, index2, targetCoords) {

    this.props.dispatch(switchTiles(index1, index2, targetCoords));
  }
};

export default connect(store => ({
  bossPuzzle: store.games.BOSS_PUZZLE,
  isSolved: store.game.isSolved
}))(BossPuzzle);