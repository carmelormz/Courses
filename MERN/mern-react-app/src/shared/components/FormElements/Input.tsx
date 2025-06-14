import {
  useReducer,
  type ChangeEvent,
  type HTMLInputTypeAttribute,
  type ReactNode,
} from 'react';

import { validate, type Validator } from '../../util/validators';

import './Input.css';

type InputChangeEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>;

interface InputProps {
  type?: HTMLInputTypeAttribute;
}

interface TextareaProps {
  rows?: number;
}

enum InputActionType {
  CHANGE,
  TOUCH,
}

interface InputAction {
  type: InputActionType;
  payload?: string;
  validators?: Validator[];
}
interface InputState {
  value: string | undefined;
  isValid: boolean;
  isTouched: boolean;
}

function inputReducer(state: InputState, action: InputAction): InputState {
  const { type, payload, validators } = action;

  switch (type) {
    case InputActionType.CHANGE:
      return {
        ...state,
        value: payload,
        isValid: validate(payload!, validators!),
      };
    case InputActionType.TOUCH:
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

interface Props extends InputProps, TextareaProps {
  id: string;
  label: string;
  element?: 'input' | 'textarea';
  placeholder?: string;
  errorText?: string;
  validators: Validator[];
}

const Input: React.FC<Props> = ({
  id,
  label,
  element,
  type,
  placeholder,
  rows = 3,
  errorText,
  validators,
}) => {
  const [{ value, isValid, isTouched }, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });

  let inputEl: ReactNode;

  const changeHandler = (e: InputChangeEvent) => {
    dispatch({
      type: InputActionType.CHANGE,
      payload: e.target.value,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: InputActionType.TOUCH });
  };

  if (element === 'input') {
    inputEl = (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
    );
  } else {
    inputEl = (
      <textarea
        id={id}
        rows={rows}
        onChange={changeHandler}
        onBlur={touchHandler}
      />
    );
  }

  const isInvalidInput = !isValid && isTouched;

  return (
    <div
      className={`form-control ${isInvalidInput && 'form-control--invalid'}`}
    >
      <label htmlFor={id}>{label}</label>
      {inputEl}
      {isInvalidInput && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
