const popupEditProfile = document.querySelector('.popup_action_edit');
const buttonEditProfile = document.querySelector('.button_action_edit');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.button_action_close');
const formEditProfile = document.querySelector('.popup__form_action_edit');
const formAddCard = document.querySelector('.popup__form_action_add');

const popupAddCard = document.querySelector('.popup_action_add');
const buttonAddCard = document.querySelector('.button_action_add');
const buttonClosePopupAddCard = popupAddCard.querySelector('.button_action_close');

const inputName = popupEditProfile.querySelector('.popup__input_profile_name');
const inputDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupFullscreen = document.querySelector('.popup_action_fullscreen');
const pictureName = formAddCard.querySelector('.popup__input_picture_name');
const pictureLink = formAddCard.querySelector('.popup__input_picture_link');
const fullScreenPictureLink = popupFullscreen.querySelector('.figure__picture');
const fullScreenPictureName = popupFullscreen.querySelector('.figure__caption');
const buttonCloseFullscreenPopup = popupFullscreen.querySelector('.button_action_close');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt:   'Горы'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt:   'Озеро в лесу'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt:   'Хрущевки в спальном районе'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt:   'Горная вершина'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt:   'Железная дорога в лесу'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt:   'Скалистый берег озера'
    }
];
const template = document.querySelector('.template');
const list = document.querySelector('.gallery__list');

const modals = document.querySelectorAll('.popup');

const resetErrors = (popup) => {
    const spans = popup.querySelectorAll('.error');
    spans.forEach(function (span) {
        span.classList.remove('error_active');
    });
    const inputs = popup.querySelectorAll('.popup__input');
    inputs.forEach(function (input) {
        input.classList.remove('popup__input_state_invalid')
    });
};


const setStateSubmitButton = (popup) => {
    if(popup === popupEditProfile){
        const submitButton = popup.querySelector('.button_action_submit');
        submitButton.classList.remove('button_disabled');
        submitButton.disabled = false;
    }
    else {
        const submitButton = popup.querySelector('.button_action_submit');
        submitButton.classList.add('button_disabled');
        submitButton.disabled = true;
    }
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupFromKey);
};

const openPopup = (popup) => {
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', closePopupFromKey);
};

const closePopupFromOverlay = () => {
    modals.forEach(function (modal) {
        modal.addEventListener('mousedown', function (evt) {
            if(evt.target.classList.contains('popup_opened')) {
                closePopup(modal);
            }
        });
    })
};


const closePopupFromKey = (evt) => {
    if (evt.key === 'Escape') {
        const modal = document.querySelector('.popup_opened');
        closePopup(modal);
    }

};

// const togglePopup = (popup) => {
//     popup.classList.toggle('popup_opened');
//     resetErrors(popup);
//     activateSubmitButton(popup);
// };


const fillEditPopup = () => {
    inputName.value = profileName.innerText;
    inputDescription.value = profileDescription.textContent;
};

const removeCardHandler = (evt) => {
    evt.target.closest('.gallery__item').remove();
};
const getFullScreenHandler = (evt) => {
    openPopup(popupFullscreen);
    fullScreenPictureLink.src = evt.target.src;
    fullScreenPictureLink.alt = evt.target.alt;
    fullScreenPictureName.textContent = evt.target.closest('.gallery__item').textContent;
};
const pressLikeHandler = (evt) => {
    evt.target.classList.toggle('button_action_like-active');
};

const getCard = (data) => {
    const card = template.content.cloneNode(true);
    const pictureButton = card.querySelector('.gallery__picture');
    card.querySelector('.gallery__heading').textContent = data.name;
    pictureButton.src = data.link;
    pictureButton.alt = data.alt;

    const removeButton = card.querySelector('.button_action_remove');
    const likeButton = card.querySelector('.button_action_like');

    pictureButton.addEventListener('click', getFullScreenHandler);
    likeButton.addEventListener('click', pressLikeHandler);
    removeButton.addEventListener('click', removeCardHandler);

    return card;
};

const renderList = () => {
    const items = initialCards.map(getCard);
    list.append(...items);
};

const submitFormEditProfileHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupEditProfile);
};
const submitFormAddCardHandler = (evt) => {
    evt.preventDefault();
    const item = getCard( {
        name: pictureName.value,
        link: pictureLink.value,
        alt: 'Изображение пользователя'
    });
    list.prepend(item);
    closePopup(popupAddCard);
};

renderList();
closePopupFromOverlay();

buttonEditProfile.addEventListener('click',() => {
    openPopup(popupEditProfile);
    fillEditPopup();
    resetErrors(popupEditProfile);
    setStateSubmitButton(popupEditProfile);
});

buttonClosePopupEditProfile.addEventListener('click', () => closePopup(popupEditProfile));

buttonCloseFullscreenPopup.addEventListener('click', () => closePopup(popupFullscreen));

buttonAddCard.addEventListener('click', () => {
    openPopup(popupAddCard);
    resetErrors(popupAddCard);
    formAddCard.reset();
    setStateSubmitButton(popupAddCard);
});
buttonClosePopupAddCard.addEventListener('click', () => closePopup(popupAddCard));

formEditProfile.addEventListener('submit', submitFormEditProfileHandler);
formAddCard.addEventListener('submit', submitFormAddCardHandler);

