import { useState } from 'react';
import Input from './Input';
import { isEmail, hasMinLength } from '../util/validation';

const EMAIL_FIELD_ID = 'email';
const PASSWORD_FIELD_ID = 'password';

export default function LoginUsingState() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');

  const [enteredValues, setEnteredValues] = useState({
    [EMAIL_FIELD_ID]: '',
    [PASSWORD_FIELD_ID]: '',
  });

  const [didEdit, setDidEdit] = useState({
    [EMAIL_FIELD_ID]: false,
    [PASSWORD_FIELD_ID]: false,
  });

  const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('entered email:', enteredValues.email);
    console.log('entered password:', enteredValues.password);
  };

  const handleInputChange = (id, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));

    setDidEdit((prevVal) => ({ ...prevVal, [id]: false }));
  };

  const handleInputBlur = (id) => {
    setDidEdit((prevVal) => ({ ...prevVal, [id]: true }));
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
          onChange={(e) => handleInputChange(EMAIL_FIELD_ID, e.target.value)}
          onBlur={() => handleInputBlur(EMAIL_FIELD_ID)}
          value={enteredValues.email}
          error={emailIsInvalid && 'Please enter a valid email address.'}
        />

        <Input
          id='password'
          label='Password'
          type='password'
          name='password'
          onChange={(e) => handleInputChange(PASSWORD_FIELD_ID, e.target.value)}
          onBlur={() => handleInputBlur(PASSWORD_FIELD_ID)}
          value={enteredValues.password}
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
