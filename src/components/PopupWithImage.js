import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._picture = this._popup.querySelector('.figure__picture');
        this._caption = this._popup.querySelector('.figure__caption');
    }
    open({src, alt, caption}) {
        this._picture.src = src;
        this._picture.alt = alt;
        this._caption.textContent = caption;

        super.open();
    }


}
