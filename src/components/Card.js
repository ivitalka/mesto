export class Card {
    constructor(data, templateSelector, {handleCardClick}) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._template = document.querySelector(templateSelector);
        this.handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return this._template.content.cloneNode(true);
    }

    render() {
        this._element = this._getTemplate();
        this._picture = this._element.querySelector('.gallery__picture');

        this._element.querySelector('.gallery__heading').textContent = this._name;
        this._picture.src = this._link;
        this._picture.alt = this._alt;
        this._setEventListeners();
        return this._element;

    }

    _pressLikeHandler(evt) {
        evt.target.classList.toggle('button_action_like-active');
    }

    _removeCardHandler(evt) {
        evt.target.closest('.gallery__item').remove();
    }

    _setEventListeners() {
        this._element
            .querySelector('.button_action_remove')
            .addEventListener('click', this._removeCardHandler);
        this._element.querySelector('.button_action_like')
            .addEventListener('click', this._pressLikeHandler);

        this._element.querySelector('.gallery__picture')
            .addEventListener('click', (evt) => this.handleCardClick(evt));
    }
}

