// @flow
import * as React from 'react';

type Props = {
  gridData?:Array<boolean>,
  col:number,
  row:number,
  index:number,
  Element:React.ComponentType<{ col:number, row:number, index:number }>
};

export default (props:Props) => {

  const { gridData, col, row, index, Element } = props;

  return (
    <div style={{ cursor: 'default' }}>
      {((gridData && gridData[index]) || !gridData) && <Element col={col} row={row} index={index} />}
    </div>
  );
};