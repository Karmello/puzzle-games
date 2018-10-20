// @flow
import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Button, TextField } from 'material-ui';
import ErrorIcon from 'material-ui-icons/Error';

import { Loader } from 'js/components';
import './AuthForm.css';

const MyTextField:Function = ({ input, meta: { touched, error }, ...custom }) => (
  <div>
    <TextField {...input} {...custom} error={Boolean(error)} />
    {touched && error &&
    <div className='error'>
      <span><ErrorIcon style={{ width: '20px' }} /></span>
      <span>{error}</span>
    </div>}
  </div>
);

const AuthForm = props => {

  const { handleSubmit, onSubmit, pristine, submitting } = props;
  
  return (
    <div>
      <form className='AuthForm'>
        <div>
          <Field
            name='username'
            type='text'
            label='Username'
            component={MyTextField}
            fullWidth={true}
            disabled={submitting}
          />
        </div>
        <div>
          <Field
            name='password'
            type='password'
            label='Password'
            component={MyTextField}
            fullWidth={true}
            disabled={submitting}
          />
        </div>
        <div className='actionBtns'>
          <div>
            <Loader isShown={submitting} />
          </div>
          <div>
            <Button
              variant='raised'
              color='inherit'
              disabled={pristine || submitting}
              onClick={
                handleSubmit(values => onSubmit('register', { ...values }).then(errors => {
                  if (errors) {
                    throw new SubmissionError({
                      username: errors.username ? errors.username.message : undefined,
                      password: errors.password ? errors.password.message : undefined
                    });
                  }
                }))
              }
            >Register</Button>
          </div>
          <div>
            <Button
              variant='raised'
              color='primary'
              disabled={pristine || submitting}
              onClick={
                handleSubmit(values => onSubmit('login', { ...values }).then(errors => {
                  if (errors && errors.credentials) {
                    throw new SubmissionError({ password: errors.credentials.message });
                  }
                }))
              }
            >Login</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default reduxForm({ form: 'authForm' })(AuthForm);