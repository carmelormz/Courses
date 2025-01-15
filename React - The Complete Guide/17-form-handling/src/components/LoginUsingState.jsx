import { useState } from 'react';

const EMAIL_FIELD_ID = 'email';
const PASSWORD_FIELD_ID = 'password';

export default function LoginUsingState() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');

  const [enteredValues, setEnteredValues] = useState({
    [EMAIL_FIELD_ID]: '',
    [PASSWORD_FIELD_ID]: '',
  });

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            onChange={(e) => handleInputChange(EMAIL_FIELD_ID, e.target.value)}
            value={enteredValues.email}
          />
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            onChange={(e) =>
              handleInputChange(PASSWORD_FIELD_ID, e.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
