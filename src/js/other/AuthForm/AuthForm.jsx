import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, TextField } from 'material-ui';

import { Loader } from 'js/other';
import './AuthForm.css';


const MyTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <div>
    <TextField {...input} {...custom} error={error} />
    {touched && error && <div className='error'>{error}</div>}
  </div>
);

let AuthForm = props => {

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
                      username: errors.username ? errors.username.message : undefined
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

AuthForm.propTypes = { onSubmit: PropTypes.func.isRequired };
AuthForm = reduxForm({ form: 'authForm' })(AuthForm);
export default AuthForm;