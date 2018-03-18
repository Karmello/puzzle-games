import React from 'react';
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';

import './GamePageInfo.css';


const GamePageInfo = () => (
  <div className='GamePageInfo'>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Best score</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          adfh skldf sld sld sldfkls dkfl sdlkf lsdkf lsdkf lsdfk d df sdf sdf sdf sdf sdf sdf sdf 
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Help</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          adfh skldf sld sld sldfkls dkfl sdlkf lsdkf lsdkf lsdfk d df sdf sdf sdf sdf sdf sdf sdf 
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
);

export default GamePageInfo;