// @flow
import React, { Component } from 'react';
import { Snackbar } from '@material-ui/core';

const autoHideDuration = 5000;

type Props = {
  message:string,
  onClose:Function
};

type State = {
  open:boolean
};

export default class MySnackBar extends Component<Props, State> {

  state = { open: false }

  componentWillReceiveProps(nextProps:Props) {
    this.setState({ open: Boolean(nextProps.message) });
  }

  render() {
    return (
      <div className='MySnackBar'>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.open}
          autoHideDuration={autoHideDuration}
          onClose={this.onClose.bind(this)}
          SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id='message-id'>{this.props.message}</span>}
        />
      </div>
    );
  }

  onClose() {

    this.setState({ open: false });
    this.props.onClose();
  }
}