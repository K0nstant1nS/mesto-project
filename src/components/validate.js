function changeButtonState(elem, state) {
  if (state) {
    elem.classList.remove(elem.dataset.disabled);
    elem.disabled = false;
  } else {
    elem.classList.add(elem.dataset.disabled);
    elem.disabled = true;
  }
}

function isInputValid(elem) {
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
}

function changeErrorState(input) {
  let errorElem = document.querySelector(`#${input.name}-error`);
  const stateObj = isInputValid(input);
  if (!stateObj.state) {
    errorElem.classList.add(errorElem.dataset.onerror);
    errorElem.textContent = stateObj.message;
  } else {
    errorElem.classList.remove(errorElem.dataset.onerror);
  }
}

function checkFormValid(form, inputsSelector) {
  const inputs = Array.from(form.querySelectorAll(inputsSelector));
  return inputs.every(function (input) {
    return isInputValid(input).state;
  });
}

function prepareOnOpen(formObj) {
  const form = document.forms[formObj.formName];
  const button = form.querySelector(formObj.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(formObj.inputSelector));
  const bool = Array.from(inputs).every(function (input) {
    return input.value === "";
  });
  if (!bool) {
    inputs.forEach(function (input) {
      changeErrorState(input);
    });
  }
  changeButtonState(button, checkFormValid(form, formObj.inputSelector));
}

function validateForm(formObj) {
  const form = document.forms[formObj.formName];
  const button = form.querySelector(formObj.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(formObj.inputSelector));
  inputs.forEach(function (input) {
    input.addEventListener("input", function (evt) {
      changeErrorState(input);

      let status = inputs.every(function (input) {
        return isInputValid(input).state;
      });
      changeButtonState(button, status);
    });
  });
}

export {
  validateForm,
  changeButtonState,
  changeErrorState,
  checkFormValid,
  prepareOnOpen,
};
