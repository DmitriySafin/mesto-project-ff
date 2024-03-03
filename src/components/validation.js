export {
  showInputError,
  hideInputError,
  checkInputValidity,
  setEventListeners,
  toggleButtonState,
  hasInvalidInput,
  clearValidation,
};
// Показ сообщения ошибки
function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}
// Скрытие ошибки
function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
}
// Проверка на валидность
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Обработчик на все формы
function setEventListeners(formElement, validationConfig) {
  const inputElements = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButtonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputElements, submitButtonElement, validationConfig);
    });
  });

  toggleButtonState(inputElements, submitButtonElement, validationConfig);
}

// Функция состояние кнопки в формах
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция очистки валидации
function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const errorList = Array.from(
    formElement.querySelectorAll(validationConfig.errorSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  errorList.forEach((errorElement) => {
    hideInputError(errorElement);
  });
  toggleButtonState(
    inputList,
    formElement.querySelector(validationConfig.submitButtonSelector),
    validationConfig
  );
}

// function validateFields(field1, field2) {
//   const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

//   if (!regex.test(field1)) {
//     return "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
//   }

//   if (!regex.test(field2)) {
//     return "Ошибка в поле 2: используйте только латинские и кириллические буквы, знаки дефиса и пробелы.";
//   }
// }
