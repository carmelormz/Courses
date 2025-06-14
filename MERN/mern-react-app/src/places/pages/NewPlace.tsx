import Input from '../../shared/components/FormElements/Input';

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

import './NewPlace.css';

const NewPlace: React.FC = () => {
  return (
    <form className='place-form'>
      <Input
        type='text'
        id='input1'
        element='input'
        label='Title'
        errorText='Please enter a valid title.'
        validators={[VALIDATOR_REQUIRE()]}
      />
    </form>
  );
};

export default NewPlace;
