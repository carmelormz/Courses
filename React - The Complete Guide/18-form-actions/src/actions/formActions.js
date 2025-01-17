import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from '../util/validation';

export function signupAction(prevFormState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');
  const firstName = formData.get('first-name');
  const lastName = formData.get('last-name');
  const role = formData.get('role');
  const terms = formData.get('terms');
  const acquisitionChannel = formData.getAll('acquisition');

  let errors = [];

  if (!isEmail(email)) {
    errors.push('Invalid email address.');
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push('You must provide a password with at least six characters.');
  }

  if (!isEqualToOtherValue(password, confirmPassword)) {
    errors.push('Passwords do not match.');
  }

  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push('Please provide both your first and last name.');
  }

  if (!isNotEmpty(role)) {
    errors.push('Please select a role.');
  }

  if (!terms) {
    errors.push('You must agree to the terms and conditions.');
  }

  if (acquisitionChannel.length === 0) {
    errors.push('Please select at least one acquisition channel.');
  }

  if (errors.length > 0) {
    return {
      errors,
      enteredValues: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        acquisitionChannel,
        terms,
      },
    };
  }

  return { errors: null };
}
