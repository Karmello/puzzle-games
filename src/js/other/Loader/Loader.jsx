import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

import './Loader.css';


export default (props) => (
  <div className='Loader'>
    <div style={{ display: props.isShown ? 'none' : 'initial' }}>{props.children}</div>
    {props.isShown && <div className='Spinner'><CircularProgress/></div>}
  </div>
);