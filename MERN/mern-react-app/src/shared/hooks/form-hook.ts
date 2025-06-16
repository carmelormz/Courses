import { useCallback, useReducer } from 'react';

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

type FormHookState = [FormState, (id: string, value: string, isValid: boolean) => void];
const useForm = (initialInputs: FormInputs, initialFormValidity: boolean): FormHookState => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
      });

      const inputHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
          dispatch({
            type: FormActionType.INPUT_CHANGE,
            payload: { inputId: id, value, isValid },
          });
        },
        []
      );

      return [formState, inputHandler];
};

export default useForm;
