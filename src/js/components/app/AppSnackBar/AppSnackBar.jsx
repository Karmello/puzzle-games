import React, { Component } from 'react';
import { Snackbar } from 'material-ui';


const autoHideDuration = 5000;

export default class AppSnackBar extends Component {

  state = { open: false }

  componentWillReceiveProps(nextProps) {
    
    this.setState({ open: Boolean(nextProps.message) });
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={this.state.open}
        autoHideDuration={autoHideDuration}
        onClose={this.onClose.bind(this)}
        SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
        message={<span id='message-id'>{this.props.message}</span>}
      />
    );
  }

  onClose() {

    this.setState({ open: false });
    this.props.onClose();
  }
}