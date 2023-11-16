const submitBtn = document.querySelector("#submitBtn");
let passwordsMatch = false;

const showError = (elementId, message) => {
  const errorMessage = document.createElement("span");
  errorMessage.textContent = message;
  document.querySelector(elementId).appendChild(errorMessage);
};

const removeError = (elementId) => {
  const parent = document.querySelector(elementId);
  parent.removeChild(parent.lastChild);
};

const createNodeObj = (id, errorText) => {
  const node = document.querySelector(id);

  const nodeObj = {
    node,
    value: "",
    isValid: false,
    isTouched: false,
    hasError: false,
  };

  nodeObj.node.addEventListener("change", (event) => {
    nodeObj.value = event.target.value;
    nodeObj.isValid = nodeObj.node.validity.valid;

    if (!nodeObj.isValid && !nodeObj.hasError) {
      showError(`div:has(> ${id})`, errorText);
      nodeObj.hasError = true;
    }
    if (nodeObj.isValid && nodeObj.hasError) {
      removeError(`div:has(> ${id})`);
      nodeObj.hasError = false;
    }
  });

  nodeObj.node.addEventListener("focus", () => {
    nodeObj.node.required = true;
  });

  return nodeObj;
};

const formElement = document.querySelector("form");

const firstName = createNodeObj("#firstName", "*Please enter your first name");
const lastName = createNodeObj("#lastName", "*Please enter your last name");
const email = createNodeObj("#email", "*Please enter a valid email address");
const phoneNumber = createNodeObj(
  "#phoneNumber",
  "*Please eneter a valid phone number"
);
const password = createNodeObj(
  "#password",
  "*Password needs to be 6-14 characters long."
);
const confirmPassword = createNodeObj(
  "#confirmPassword",
  "*Password needs to be 6-14 characters long."
);

formElement.addEventListener("change", () => {
  if (password.value.trim() >= 6 && password.value === confirmPassword.value) {
    passwordsMatch = true;
  } else {
    passwordsMatch = false;
  }

  if (
    firstName.isValid &&
    lastName.isValid &&
    email.isValid &&
    phoneNumber.isValid &&
    password.isValid &&
    confirmPassword.isValid
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

formElement.addEventListener("submit", (event) => {
  if (
    password.value.trim().length >= 6 &&
    password.value === confirmPassword.value
  ) {
    passwordsMatch = true;
  } else {
    event.preventDefault();
    if (!confirmPassword.hasError) {
      showError(`div:has(> #confirmPassword)`, "*Passwords do not match");
    }
    passwordsMatch = false;
    confirmPassword.hasError = true;
    confirmPassword;
  }
});
