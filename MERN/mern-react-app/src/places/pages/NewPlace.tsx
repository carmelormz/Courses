import { type FormEvent } from 'react';
import Input from '../../shared/components/FormElements/Input';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import './PlaceForm.css';
import Button from '../../shared/components/FormElements/Button';
import useForm from '../../shared/hooks/form-hook';

const NewPlace: React.FC = () => {
  const [formState, inputChangeHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const { inputs, isValid } = formState;

  const placeSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
      <Input
        type='text'
        id='title'
        element='input'
        label='Title'
        errorText='Please enter a valid title.'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputChangeHandler}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        errorText='Please enter a valid description.'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInput={inputChangeHandler}
      />
      <Input
        id='address'
        type='text'
        element='input'
        label='Address'
        errorText='Please enter a valid address.'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputChangeHandler}
      />
      <Button type='submit' disabled={!isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
