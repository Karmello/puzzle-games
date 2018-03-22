import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'material-ui';


const autoHideDuration = 5000;

class MySnackBar extends Component {

  state = { open: false }

  componentWillReceiveProps(nextProps) {
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

MySnackBar.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func
}

export default MySnackBar;