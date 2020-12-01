export const initialCards = [
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
export const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'error_active'
};
export const popupEditProfile = document.querySelector('.popup_action_edit');
export const buttonEditProfile = document.querySelector('.button_action_edit');
export const formEditProfile = document.querySelector('.popup__form_action_edit');
export const formAddCard = document.querySelector('.popup__form_action_add');

export const buttonAddCard = document.querySelector('.button_action_add');

export const inputName = popupEditProfile.querySelector('.popup__input_profile_name');
export const inputDescription = popupEditProfile.querySelector('.popup__input_profile_description');