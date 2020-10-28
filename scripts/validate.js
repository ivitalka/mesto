const showErrorMessage = (input, {inputErrorClass, errorClass}) => {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
};

const hideErrorMessage = (input, {inputErrorClass, errorClass}) => {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
};

const checkInputValidity = (input) => {
    if(!input.validity.valid){
        showErrorMessage(input, obj);
    }
    else {
        hideErrorMessage(input, obj);
    }
};

const toggleButtonState = (isValid, buttonElement, {inactiveButtonClass}) => {
    if(isValid) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
   else {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    }
};

const setEventListener = (form, {submitButtonSelector, inputSelector}, buttonElement) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    inputs.forEach(function (input) {
        input.addEventListener('input', (evt) => {
            checkInputValidity(evt.target);
            const isAllValid = form.checkValidity();

            toggleButtonState(isAllValid, buttonElement, obj);
        })

    })
};

const enableValidation = ({formSelector, submitButtonSelector}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(function (form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const buttonElement = form.querySelector(submitButtonSelector);

        setEventListener(form, obj, buttonElement);
        toggleButtonState(form.checkValidity() ,buttonElement, obj);
    })
};

const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'error_active'
};

enableValidation(obj);