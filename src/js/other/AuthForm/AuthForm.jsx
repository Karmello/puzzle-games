import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'material-ui';
import { TextField } from 'redux-form-material-ui';

import './AuthForm.css';


let AuthForm = props => {

  const { handleSubmit, reset, pristine, submitting } = props;
  
  return (
    <form className='AuthForm' onSubmit={handleSubmit}>
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
        <Button color='primary' type='submit' disabled={pristine || submitting}>Login</Button>
        <Button color='primary' type='submit' disabled={pristine || submitting}>Register</Button>
        <Button type='button' disabled={pristine || submitting} onClick={reset}>Clear</Button>
      </div>
    </form>
  );
}

AuthForm = reduxForm({ form: 'authForm' })(AuthForm);
export default AuthForm;