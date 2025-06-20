import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import type { Place } from '../../models/place';

import './PlaceForm.css';
import useForm from '../../shared/hooks/form-hook';
import type { FormEvent } from 'react';

const DUMMY_PLACES_: Place[] = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famouse skyscrappers in the world',
    image:
      'https://media.architecturaldigest.com/photos/66b3974338264b1c676c46d3/1:1/w_3840,h_3840,c_limit/GettyImages-584714362.jpg',
    address: '20 W 34th St., New York, NY 10001',
    location: {
      lat: 40.7484553,
      lng: -74.0041184,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famouse skyscrappers in the world',
    image:
      'https://media.architecturaldigest.com/photos/66b3974338264b1c676c46d3/1:1/w_3840,h_3840,c_limit/GettyImages-584714362.jpg',
    address: '20 W 34th St., New York, NY 10001',
    location: {
      lat: 40.7484553,
      lng: -74.0041184,
    },
    creator: 'u2',
  },
];

const UpdatePlace: React.FC = () => {
  const { pid } = useParams();

  const identifiedPlace: Place | undefined = DUMMY_PLACES_.find(
    (place) => place.id === pid
  );

  const [formState, inputChangeHandler] = useForm(
    {
      title: {
        value: identifiedPlace?.title || '',
        isValid: true,
      },
      description: {
        value: identifiedPlace?.description || '',
        isValid: true,
      },
    },
    true
  );

  const { inputs, isValid } = formState;

  const palceUpdateSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className='place-form' onSubmit={palceUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputChangeHandler}
        value={inputs.title.value}
        valid={inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (At least 5 characters).'
        onInput={inputChangeHandler}
        value={inputs.description.value}
        valid={inputs.description.isValid}
      />
      <Button type='submit' disabled={!isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
