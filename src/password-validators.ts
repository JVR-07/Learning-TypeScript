export function hasValidLength(password: string): boolean {
  return password.length >= 8;
}

export function hasNumber(password: string): boolean {
  return /\d/.test(password);
}

export function hasUpperCase(password: string): boolean {
  return /[A-Z]/.test(password);
}

export function hasSpecialChar(password: string): boolean {
  return /[^a-zA-Z0-9]/.test(password);
}
