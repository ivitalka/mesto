export class Card {
    constructor(data, templateSelector, {handleCardClick, handleDeleteCard, api}) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._id = data._id;
        this._ownerId = data.ownerId;
        this._profileId = data.profileId;
        this._likes = data.likes;
        this._template = document.querySelector(templateSelector);
        this._likeIndex = data.likes.length;
        this.handleCardClick = handleCardClick;
        // this.deleteLike = deleteLike;
        // this.putLike = putLike;
        this.handleDeleteCard = handleDeleteCard;
        this._api = api;
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
        this._element.querySelector('.gallery__item').id = this._id;
        this._likeButton = this._element.querySelector('.button_action_like');
        this._setLikesInitialState();
        this._setDeleteIcon();
        this._element.querySelector('.gallery__like-counter').textContent = this._likeIndex;
        this._setEventListeners();
        return this._element;
    }

    _setLikesInitialState() {
        this._likeCounter = this._element.querySelector('.gallery__like-counter');
        this._likeCounter.textContent = this._likeIndex;
        if (this._likes.some(elem => elem._id === this._profileId)) {
            this._element.querySelector('.button_action_like').classList.add('button_action_like-active');
        }
    }

    _removeLike = (res) => {
        this._likeCounter.textContent = res.likes.length;
        this._likeButton.classList.remove('button_action_like-active')
};
    _putLike = (res) => {
        this._likeCounter.textContent = res.likes.length;
        this._likeButton.classList.add('button_action_like-active')
    };

    _setLike(cardId) {
        if (this._likes.some(elem => elem._id === this._profileId) ||
            this._likeButton.classList.contains('button_action_like-active'))
        {
            this._api.deleteLike(cardId).then((res) => {
                this._removeLike(res);
            })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            this._api.putLike(cardId)
                .then((res) => {
                this._putLike(res);
            })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    _setDeleteIcon() {
        if(this._ownerId === this._profileId) {
            this._element.querySelector('.button_action_remove').style.visibility = 'visible';
        }
    }

    _setEventListeners() {
        this._element
            .querySelector('.button_action_remove')
            .addEventListener('click',() => this.handleDeleteCard(this._id));
        this._element
            .querySelector('.button_action_like')
            .addEventListener('click',() => this._setLike(this._id));

        this._element.querySelector('.gallery__picture')
            .addEventListener('click', (evt) => this.handleCardClick(evt));
    }
}

