import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

import './Loader.css';


const Loader = props => (
  <div className={props.centered ? 'Loader-centered' : 'Loader'}>
    <div style={{ display: props.isShown ? 'none' : 'initial' }}>{props.children}</div>
    {props.isShown && <div className='Spinner'><CircularProgress/></div>}
  </div>
);

Loader.propTypes = {
  isShown: PropTypes.bool.isRequired
};

export default Loader;