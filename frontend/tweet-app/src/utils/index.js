export const validateRequired = (inputValue) => {
  if (typeof inputValue === 'undefined') {
    return false;
  }
  if (typeof inputValue === 'string') {
    return inputValue.trim() !== '';
  }
};

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+_.-]+[.]+[a-zA-Z]{2,7}$/;
  return regex.test(email);
};

export const validatePasswordStrength = (password) => {
  let errors = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (password.length > 20) {
    errors.push('Password must be at most 20 characters');
  }
  if (password.search(/.*[a-z]/)) {
    errors.push('Password must contain atlest one lowecase letter');
  }
  if (password.search(/.*[A-Z]/)) {
    errors.push('Password must contain atlest one uppercase letter');
  }
  if (password.search(/.*\d/)) {
    errors.push('Password must contain atlest one number');
  }
  if (password.search(/.*[!@#$%^&*() =+_-]/)) {
    errors.push('Password must contain atlest one special character');
  }
  return errors;
};

export const validatePhoneNo = (phoneNo) => {
  const regex = /^[0-9\b]+$/;
  return regex.test(phoneNo);
};
