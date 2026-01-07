const passwordInput = document.getElementById(
  "password-input"
) as HTMLInputElement;

const successMessage = document.getElementById(
  "success-message"
) as HTMLElement;

const requirements = {
  length: document.getElementById("rule-length") as HTMLElement,
  number: document.getElementById("rule-number") as HTMLElement,
  upper: document.getElementById("rule-uppercase") as HTMLElement,
  special: document.getElementById("rule-special") as HTMLElement,
};

const patterns = {
  number: /\d/,
  upper: /[A-Z]/,
  special: /[!@#$%^&*(),.?":{}|<>_\-]/,
};

const validateRequirement = (element: HTMLElement, isValid: boolean) => {
  if (isValid) {
    element.classList.add("valid");
  } else {
    element.classList.remove("valid");
  }
};

if (passwordInput) {
  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;

    const isLengthValid = value.length >= 8;
    const isNumberValid = patterns.number.test(value);
    const isUpperValid = patterns.upper.test(value);
    const isSpecialValid = patterns.special.test(value);

    validateRequirement(requirements.length, isLengthValid);
    validateRequirement(requirements.number, isNumberValid);
    validateRequirement(requirements.upper, isUpperValid);
    validateRequirement(requirements.special, isSpecialValid);

    if (isLengthValid && isNumberValid && isUpperValid && isSpecialValid) {
      successMessage.classList.remove("hidden");

      passwordInput.style.borderColor = "#2ea043";
    } else {
      successMessage.classList.add("hidden");

      passwordInput.style.borderColor = "#30363d";
    }
  });
}

const toggleBtn = document.getElementById(
  "togglePasswordBtn"
) as HTMLButtonElement;
const toggleIcon = toggleBtn.querySelector("i") as HTMLElement;

if (toggleBtn && passwordInput) {
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    if (isPassword) {
      toggleIcon.classList.remove("ph-eye");
      toggleIcon.classList.add("ph-eye-slash");
    } else {
      toggleIcon.classList.remove("ph-eye-slash");
      toggleIcon.classList.add("ph-eye");
    }
  });
}
