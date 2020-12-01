import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, { formCallback }) {
        super(popupSelector);
        this.formCallback = formCallback;
        this.form = this._popup.querySelector('.popup__form');
        this._inputList = this.form.querySelectorAll('.popup__input');
    }

    _getInputValues = () => {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    };

    setEventListeners() {
        this.form.addEventListener('submit', (evt) => {
            const values = this._getInputValues();
            this.formCallback(evt, {values});
        });
        super.setEventListeners();
    }

    close() {
        this.form.reset();
        super.close();
    }
}