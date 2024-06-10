export const RulePassword = {
  required: { value: true, message: "Password is required" },
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
};
export const RuleConfirmPassword = {
  required: { value: true, message: "Password is required" },
  minLength: {
    value: 8,
    message: "Confirm password not correct",
  },
};
export const RuleEmail = {
  required: { value: true, message: "Email is required" },
  pattern: {
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
    message: "Please enter a valid email address",
  },
};
export const RuleResetCode = {
  required: { value: true, message: "Code is required" },
  maxLength: {
    value: 6,
    message: "Code is six digits",
  },
  minLength: {
    value: 6,
    message: "Code is six digits",
  },
};
