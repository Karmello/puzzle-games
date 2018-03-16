import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

import { GameEngine } from 'js/engines';
import { GridGameBoard } from 'js/other';


const squareSize = 75;
const colors = { 0: '#dbbe92', 1: '#52220b' };

class EightQueens extends GameEngine {

  componentWillReceiveProps(nextProps) {
    
    // restarting game
    if (!this.props.game.isLoading && nextProps.game.isLoading) {
      this.props.onFinishInit();
    }
  }

  componentDidMount() {
    this.props.onFinishInit();
  }

  render() {
    return (
      <GridGameBoard
        dimension={8}
        squareSize={squareSize}
        Square={props => {
          return (
            <Button
              style={{
                borderRadius: 0,
                minWidth: `${squareSize}px`,
                height: `${squareSize}px`,
                backgroundColor: colors[(props.col + props.row) % 2]
              }}
            > </Button>
          );
        }}
      />
    );
  }
}

EightQueens.propTypes = {
  onFinishInit: PropTypes.func.isRequired,
  onMakeMove: PropTypes.func.isRequired,
  onBeenSolved: PropTypes.func.isRequired,
  restarting: PropTypes.bool.isRequired
};

export default connect(store => ({
  game: store.pages.gamePage,
  eightQueensEngine: store.engines.EightQueens
}))(EightQueens);