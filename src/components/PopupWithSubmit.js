import {Popup} from "./Popup";

export class PopupWithSubmit extends Popup{
    constructor(popupSelector, {formCallback}) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._submitButton = this._form.querySelector('.button_action_submit');
      this.serverRemoveCard = formCallback;
    }
    open(cardId) {
        this._cardId = cardId;
        super.open();
    }

    setEventListeners() {
        this._form.addEventListener('submit',(evt) => {
            this.serverRemoveCard(this._submitButton, evt, this._cardId);
        });
        super.setEventListeners();

    }
}