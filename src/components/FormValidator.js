export class FormValidator {
    constructor(obj, formSelector) {
        this._inputSelector = obj.inputSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._errorClass = obj.errorClass;
        this._form = formSelector;
    }

    _showErrorMessage = (input) => {
        const error = document.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        error.classList.add(this._errorClass);
        error.textContent = input.validationMessage;
    };

    _hideErrorMessage = (input) => {
        const error = document.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        error.classList.remove(this._errorClass);
        error.textContent = '';
    };

     resetErrors = () => {
        const spans = this._form.querySelectorAll('.error');
        spans.forEach(function (span) {
            span.classList.remove('error_active');
        });
        const inputs = this._form.querySelectorAll('.popup__input');
        inputs.forEach(function (input) {
            input.classList.remove('popup__input_state_invalid')
        });
    };

    _toggleButtonState = (isValid, buttonElement) => {
        if(isValid) {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
        else {
            buttonElement.disabled = true;
            buttonElement.classList.add(this._inactiveButtonClass);
        }
    };

    setStateSubmitButton = () => {
        if(this._form.classList.contains('popup__form_action_edit')){
            const submitButton = this._form.querySelector('.button_action_submit');
            submitButton.classList.remove('button_disabled');
            submitButton.disabled = false;
        }
        else {
            const submitButton = this._form.querySelector('.button_action_submit');
            submitButton.classList.add('button_disabled');
            submitButton.disabled = true;
        }
    };

    _checkInputValidity = (input) => {
        if(!input.validity.valid){
            this._showErrorMessage(input);
        }
        else {
            this._hideErrorMessage(input);
        }
    };

    _setEventListener = (buttonElement) => {
        this._inputs = this._form.querySelectorAll(this._inputSelector);
        this._inputs.forEach(function (input) {
            input.addEventListener('input', (evt) => {
                this._checkInputValidity(evt.target);
                const isAllValid = this._form.checkValidity();
                this._toggleButtonState(isAllValid, buttonElement);
            })
        }, this)
    };


    enableValidation = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const buttonElement = this._form.querySelector(this._submitButtonSelector);

        this._setEventListener(buttonElement);
        this._toggleButtonState(this._form.checkValidity() ,buttonElement);
    }
}
