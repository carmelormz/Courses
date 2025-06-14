export interface Validator {
  type: ValidatorType;
  val?: number;
};

enum ValidatorType {
  REQUIRE,
  MINLENGTH,
  MAXLENGTH,
  MIN,
  MAX,
  EMAIL,
  FILE
};

export const VALIDATOR_REQUIRE = (): Validator => ({ type: ValidatorType.REQUIRE });
export const VALIDATOR_FILE = (): Validator => ({ type: ValidatorType.FILE });
export const VALIDATOR_MINLENGTH = (val: number): Validator => ({
  type: ValidatorType.MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val: number): Validator => ({
  type: ValidatorType.MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val: number) : Validator => ({ type: ValidatorType.MIN, val: val });
export const VALIDATOR_MAX = (val: number) : Validator => ({ type: ValidatorType.MAX, val: val });
export const VALIDATOR_EMAIL = (): Validator => ({ type: ValidatorType.EMAIL });

export const validate = (value: string, validators: Validator[]) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === ValidatorType.REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === ValidatorType.MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val!;
    }
    if (validator.type === ValidatorType.MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val!;
    }
    if (validator.type === ValidatorType.MIN) {
      isValid = isValid && +value >= validator.val!;
    }
    if (validator.type === ValidatorType.MAX) {
      isValid = isValid && +value <= validator.val!;
    }
    if (validator.type === ValidatorType.EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};


