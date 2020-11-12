import {initialCards} from "./constants.js";
import {openPopup} from "./utils.js";
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

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

const pictureName = formAddCard.querySelector('.popup__input_picture_name');
const pictureLink = formAddCard.querySelector('.popup__input_picture_link');

const buttonCloseFullscreenPopup = popupFullscreen.querySelector('.button_action_close');

const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'error_active'
};

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

const closePopupFromKey = (evt) => {
    if (evt.key === 'Escape') {
        const modal = document.querySelector('.popup_opened');
        closePopup(modal);
    }
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupFromKey);
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

const fillEditPopup = () => {
    inputName.value = profileName.innerText;
    inputDescription.value = profileDescription.textContent;
};

const getCard = (data) => {
    const card = new Card(data, template);
    const cardElement = card.render();

    return cardElement;
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
    }, template);
    list.prepend(item);
    closePopup(popupAddCard);
};

const editFormValidator = new FormValidator(obj, formEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(obj, formAddCard);
addFormValidator.enableValidation();


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

// const getFullScreenHandler = (evt) => {
//     openPopup(popupFullscreen);
//     fullScreenPictureLink.src = evt.target.src;
//     fullScreenPictureLink.alt = evt.target.alt;
//     fullScreenPictureName.textContent = evt.target.closest('.gallery__item').textContent;
// };
//
// const setPictureListeners = () => {
//     const pictures = Array.from(document.querySelectorAll('.gallery__picture'));
//     pictures.forEach(function (picture) {
//         picture.addEventListener('click', getFullScreenHandler);
//     })
// };

// setPictureListeners();