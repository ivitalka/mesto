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

const checkInputValidity = (input, rest) => {
    if(!input.validity.valid){
        showErrorMessage(input, rest);
    }
    else {
        hideErrorMessage(input, rest);
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

const setEventListener = (form,buttonElement, {inputSelector, ...rest}) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    inputs.forEach(function (input) {
        input.addEventListener('input', (evt) => {
            checkInputValidity(evt.target, rest);
            const isAllValid = form.checkValidity();

            toggleButtonState(isAllValid, buttonElement, rest);
        })

    })
};

const enableValidation = ({formSelector, submitButtonSelector, ...rest}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(function (form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const buttonElement = form.querySelector(submitButtonSelector);

        setEventListener(form, buttonElement, rest);
        toggleButtonState(form.checkValidity() ,buttonElement, rest);
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