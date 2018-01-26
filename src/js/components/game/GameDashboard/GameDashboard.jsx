import React from 'react';
import { Chip } from 'material-ui';

import { Timer } from 'js/components';
import './GameDashboard.css';


export default (props) => (
  <div className='GameDashboard'>
    <div><Chip label={props.apiData.name} /></div>
    <div><Chip label={'Moves: ' + props.engine.moves} /></div>
    <div><Timer on={!props.game.isLoading && !props.game.isSolved} paused={props.game.isSolved} /></div>
    {props.game.isSolved && <div><Chip label='SOLVED' /></div>}
  </div>
);