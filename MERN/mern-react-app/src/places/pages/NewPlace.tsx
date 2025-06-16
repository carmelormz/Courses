import { useCallback, useReducer, type FormEvent } from 'react';
import Input from '../../shared/components/FormElements/Input';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import './PlaceForm.css';
import Button from '../../shared/components/FormElements/Button';

enum FormActionType {
  INPUT_CHANGE,
}

interface FormReducerPayloadType {
  inputId: string;
  value: string;
  isValid: boolean;
}

interface FormAction {
  type: FormActionType;
  payload: FormReducerPayloadType;
}

interface FormInputType {
  value: string;
  isValid: boolean;
}

interface FormInputs {
  [key: string]: FormInputType;
}

interface FormState {
  inputs: FormInputs;
  isValid: boolean;
}

const formReducer = (state: FormState, action: FormAction) => {
  const { type, payload } = action;
  const { inputs } = state;

  switch (type) {
    case FormActionType.INPUT_CHANGE: {
      let formIsValid = true;
      for (const inputId in inputs) {
        if (inputId === payload.inputId) {
          formIsValid = formIsValid && payload.isValid;
        } else {
          formIsValid = formIsValid && inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...inputs,
          [payload.inputId]: {
            value: payload?.value,
            isValid: payload?.isValid,
          },
        },
        isValid: formIsValid,
      };
    }
    default:
      return state;
  }
};

const NewPlace: React.FC = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
    isValid: false,
  });

  const { isValid, inputs } = formState;

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: FormActionType.INPUT_CHANGE,
        payload: { inputId: id, value, isValid },
      });
    },
    []
  );

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
        onInput={inputHandler}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        errorText='Please enter a valid description.'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
      <Input
        id='address'
        type='text'
        element='input'
        label='Address'
        errorText='Please enter a valid address.'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
