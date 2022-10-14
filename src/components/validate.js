function changeButtonState(elem, state) {
  if (state) {
    elem.classList.remove(elem.dataset.disabled);
    elem.disabled = false;
  } else {
    elem.classList.add(elem.dataset.disabled);
    elem.disabled = true;
  }
}

function changeErrorState(input, stateObj) {
  let errorElem = document.querySelector(`#${input.name}-error`);
  if (!stateObj.state) {
    errorElem.classList.add(errorElem.dataset.onerror);
    errorElem.textContent = stateObj.message;
  } else {
    errorElem.classList.remove(errorElem.dataset.onerror);
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
