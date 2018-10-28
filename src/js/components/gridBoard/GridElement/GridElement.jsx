// @flow
import * as React from 'react';

type Props = {
  gridData?:Array<boolean>,
  col:number,
  row:number,
  index:number,
  Content:React.ComponentType<{ col:number, row:number, index:number }>
};

export default (props:Props) => {

  const { gridData, col, row, index, Content } = props;

  return (
    <div style={{ cursor: 'default' }}>
      {((gridData && gridData[index]) || !gridData) && <Content col={col} row={row} index={index} />}
    </div>
  );
};