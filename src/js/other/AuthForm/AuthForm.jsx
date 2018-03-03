import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';


let AuthForm = props => {
  const { handleSubmit } = props;
  return (
    <div className='AuthForm'>
      <form onSubmit={handleSubmit}>
        <Field name='username' component={TextField} type='text' />
        <Field name='password' component={TextField} type='password' />
      </form>
    </div>
  );
}

AuthForm = reduxForm({ form: 'authForm' })(AuthForm);
export default AuthForm;