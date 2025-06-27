import { useCallback, useReducer } from 'react';

enum FormActionType {
  INPUT_CHANGE,
  SET_DATA,
}

interface FormActionInputChangePayload {
  inputId: string;
  value: string;
  isValid: boolean;
}

interface FormActionSetDataPayload {
  inputs: FormInputs;
  formIsValid: boolean;
}

interface FormReducerPayloadType {
  inputChangePayload?: FormActionInputChangePayload;
  setDataPayload?: FormActionSetDataPayload;
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
        if (inputId === payload.inputChangePayload?.inputId) {
          formIsValid = formIsValid && payload.inputChangePayload?.isValid;
        } else {
          formIsValid = formIsValid && inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...inputs,
          [payload.inputChangePayload!.inputId]: {
            value: payload.inputChangePayload!.value,
            isValid: payload.inputChangePayload!.isValid,
          },
        },
        isValid: formIsValid,
      };
    }
    case FormActionType.SET_DATA: {
      return {
        inputs: payload.setDataPayload!.inputs,
        isValid: payload.setDataPayload!.formIsValid,
      };
    }
    default:
      return state;
  }
};

type FormHookState = [
  FormState,
  (id: string, value: string, isValid: boolean) => void,
  (inputs: FormInputs, isValid: boolean) => void
];

const useForm = (
  initialInputs: FormInputs,
  initialFormValidity: boolean
): FormHookState => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: FormActionType.INPUT_CHANGE,
        payload: { inputChangePayload: { inputId: id, value, isValid } },
      });
    },
    []
  );

  const setFormData = useCallback((inputs: FormInputs, isValid: boolean) => {
    dispatch({
      type: FormActionType.SET_DATA,
      payload: {
        setDataPayload: {
          inputs: inputs,
          formIsValid: isValid,
        },
      },
    });
  }, []);

  return [formState, inputHandler, setFormData];
};

export default useForm;
