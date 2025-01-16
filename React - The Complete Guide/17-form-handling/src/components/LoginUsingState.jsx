import { useState } from 'react';
import Input from './Input';
import { isEmail, hasMinLength } from '../util/validation';
import { useInput } from '../hooks/useInput';

const EMAIL_FIELD_ID = 'email';
const PASSWORD_FIELD_ID = 'password';

export default function LoginUsingState() {
  const {
    value: emailValue,
    handleInputChange: handleEmailInputChange,
    handleInputBlur: handleEmailInputBlur,
    hasError: emailIsInvalid,
  } = useInput('', (val) => isEmail(val));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordInputChange,
    handleInputBlur: handlePasswordInputBlur,
    hasError: passwordIsInvalid,
  } = useInput('', (val) => hasMinLength(val, 6));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailIsInvalid || passwordIsInvalid) {
      return;
    }

    console.log('email:', emailValue);
    console.log('password:', passwordValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <Input
          id='email'
          label='Email'
          type='email'
          name='email'
          onChange={handleEmailInputChange}
          onBlur={handleEmailInputBlur}
          value={emailValue}
          error={emailIsInvalid && 'Please enter a valid email address.'}
        />

        <Input
          id='password'
          label='Password'
          type='password'
          name='password'
          onChange={handlePasswordInputChange}
          onBlur={handlePasswordInputBlur}
          value={passwordValue}
          error={passwordIsInvalid && 'Please enter a valid password.'}
        />
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
