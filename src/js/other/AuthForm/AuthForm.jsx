import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'material-ui';
import { TextField } from 'redux-form-material-ui';

import './AuthForm.css';


let AuthForm = props => {

  const { handleSubmit, onSubmit, reset, pristine, submitting } = props;

  return (
    <form className='AuthForm'>
      <div>
        <Field
          name='username'
          type='text'
          placeholder='Username'
          component={TextField}
          fullWidth={true}
        />
      </div>
      <div>
        <Field
          name='password'
          type='password'
          placeholder='Password'
          component={TextField}
          fullWidth={true}
        />
      </div>
      <div>
        <Button
          variant='raised'
          color='primary'
          disabled={pristine || submitting}
          onClick={handleSubmit(values => onSubmit('LOGIN', { ...values }))}
        >Login</Button>
        <Button
          variant='raised'
          color='primary'
          disabled={pristine || submitting}
          onClick={handleSubmit(values => onSubmit('REGISTER', { ...values }))}
        >Register</Button>
        <Button
          variant='raised'
          color='inherit'
          disabled={pristine || submitting}
          onClick={reset}
        >Clear</Button>
      </div>
    </form>
  );
}

AuthForm = reduxForm({ form: 'authForm' })(AuthForm);
export default AuthForm;