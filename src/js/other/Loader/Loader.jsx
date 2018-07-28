// @flow

import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';

import './Loader.css';


type Props = {
  isShown: boolean,
  centered?: boolean,
  children?: React.Node
};

const Loader = (props:Props) => (
  <div className={props.centered ? 'Loader-centered' : 'Loader'}>
    <div style={{ display: props.isShown ? 'none' : 'initial' }}>{props.children}</div>
    {props.isShown && <div className='Spinner'><CircularProgress/></div>}
  </div>
);

export default Loader;