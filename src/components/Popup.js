
export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };
    close = () => {
       this._popup.classList.remove('popup_opened');
       document.removeEventListener('keydown', this._handleEscClose);
    };

    _closePopupFromOverlay = () => {
    document.forEach(function (modal) {
        modal.addEventListener('mousedown', function (evt) {
            if(evt.target.classList.contains('popup_opened')) {
                closePopup(modal);
            }
        });
    })
};

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    };

    setEventListeners() {
        this._popup.querySelector('.button_action_close')
            .addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', (evt) => {
            if(evt.target.classList.contains('popup_opened')) {
               this.close();
            }
        })
    };
}