import {Popup} from "./Popup";

export class PopupWithSubmit extends Popup{
    constructor(popupSelector, {formCallback}) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this.serverRemoveCard = formCallback;
    }

    setEventListeners(cardId) {
        this._form.addEventListener('submit',(evt) => {
            this.serverRemoveCard(evt, cardId);
        });
        super.setEventListeners();

    }
}