import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(evt) {
        this._popup.querySelector('.figure__picture').src = evt.target.src;
        this._popup.querySelector('.figure__picture').alt = evt.target.alt;
        this._popup.querySelector('.figure__caption').textContent = evt.target.closest('.gallery__item').textContent;

        super.open();
    }


}
