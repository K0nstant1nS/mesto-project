function changeButtonState(elem, state) {
  if (state) {
    elem.classList.remove("popup__save_disabled");
    elem.disabled = false;
  } else {
    elem.classList.add("popup__save_disabled");
    elem.disabled = true;
  }
}

function calculateErrorPos(input) {
  let errorElem = document.querySelector(`#${input.name}-error`);
  let closestRelativeCords = input
    .closest("[data-relative]")
    .getBoundingClientRect();
  let inputCords = input.getBoundingClientRect();
  errorElem.style.top = `${
    inputCords.top + inputCords.height + 5 - closestRelativeCords.top
  }px`;
  errorElem.style.left = `${inputCords.left - closestRelativeCords.left}px`;
}

function changeErrorState(input, stateObj) {
  let errorElem = document.querySelector(`#${input.name}-error`);
  if (!stateObj.state) {
    errorElem.classList.add("popup__form-error_active");
    errorElem.textContent = stateObj.message;
  } else {
    errorElem.classList.remove("popup__form-error_active");
  }
}

function isInputValid(elem) {
  if (elem.type === "text") {
    if (elem.validity.patternMismatch) {
      return {
        state: false,
        message: elem.dataset.mismatch,
      };
    } else if (!elem.validity.valid) {
      return {
        state: false,
        message: elem.validationMessage,
      };
    } else {
      return { state: true };
    }
  } else if (elem.type === "url") {
    if (!elem.validity.valid) {
      return { state: false, message: elem.validationMessage };
    } else {
      return { state: true };
    }
  }
}

function checkFormValid(form) {
  const inputs = Array.from(form.querySelectorAll("input"));
  return inputs.every(function (input) {
    return isInputValid(input).state;
  });
}

function validateForm(form) {
  const button = form.querySelector("button");
  const inputs = Array.from(form.querySelectorAll("input"));
  changeButtonState(button, checkFormValid(form));
  inputs.forEach(function (input) {
    calculateErrorPos(input);
    changeErrorState(input, isInputValid(input));
    input.addEventListener("input", function (evt) {
      let stateObj = isInputValid(input);
      changeErrorState(input, stateObj);

      let status = inputs.every(function (input) {
        return isInputValid(input).state;
      });
      changeButtonState(button, status);
    });
  });
}

function initValidationForms() {
  const forms = Array.from(document.forms);
  forms.forEach(function (form) {
    validateForm(form);
  });
}

export { initValidationForms, validateForm };
