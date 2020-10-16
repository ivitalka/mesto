const popupEditProfile = document.querySelector('.popup_action_edit');
const buttonEditProfile = document.querySelector('.button_action_edit');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.button_close_edit-form');
const formEditProfile = document.querySelector('.popup__form_action_edit');
const formAddCard = document.querySelector('.popup__form_action_add');

const popupAddCard = document.querySelector('.popup_action_add');
const buttonAddCard = document.querySelector('.button_action_add');
const buttonClosePopupAddCard = popupAddCard.querySelector('.button_close_add-form');

const inputName = popupEditProfile.querySelector('.popup__input_profile_name');
const inputDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupFullscreen = document.querySelector('.popup_action_fullscreen');
const pictureName = formAddCard.querySelector('.popup__input_picture_name');
const pictureLink = formAddCard.querySelector('.popup__input_picture_link');
const fullScreenPictureLink = popupFullscreen.querySelector('.figure__picture');
const fullScreenPictureName = popupFullscreen.querySelector('.figure__caption');
const buttonCloseFullscreenPopup = popupFullscreen.querySelector('.button_close_fullscreen');

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

const openingPopup = (data) => data.classList.add('popup_opened');
const closingPopup = (data) => data.classList.remove('popup_opened');

const fillEditPopup = () => {
    inputName.value = profileName.innerText;
    inputDescription.value = profileDescription.textContent;
};

const removeCardHandler = (evt) => {
    evt.target.closest('.gallery__item').remove();
};
const fullScreenHandler = (evt) => {
    openingPopup(popupFullscreen);
    fullScreenPictureLink.src = evt.target.src;
    fullScreenPictureLink.alt = evt.target.alt;
    fullScreenPictureName.textContent = evt.target.nextElementSibling.textContent;
};
const likeHandler = (evt) => {
    evt.target.closest('.button_action_like').classList.toggle('button_action_like-active');
};

const getItem = (data) => {
    const card = template.content.cloneNode(true);
    const pictureButton = card.querySelector('.gallery__picture');
    card.querySelector('.gallery__heading').textContent = data.name;
    pictureButton.src = data.link;
    pictureButton.alt = data.alt;

    const removeButton = card.querySelector('.button_action_remove');
    const likeButton = card.querySelector('.button_action_like');

    pictureButton.addEventListener('click', fullScreenHandler);
    likeButton.addEventListener('click', likeHandler);
    removeButton.addEventListener('click', removeCardHandler);

    return card;
};

const renderList = () => {
    const items = initialCards.map(getItem);
    list.append(...items);
};

const formEditProfileSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closingPopup(popupEditProfile);
};
const formAddCardSubmitHandler = (evt) => {
    evt.preventDefault();
    const item = getItem( {
        name: pictureName.value,
        link: pictureLink.value,
        alt: 'Изображение пользователя'
    });
    pictureName.value ='';
    pictureLink.value ='';

    list.prepend(item);
    closingPopup(popupAddCard);
};

renderList();

buttonEditProfile.addEventListener('click',() => openingPopup(popupEditProfile));
fillEditPopup();
buttonClosePopupEditProfile.addEventListener('click', () => closingPopup(popupEditProfile));

buttonCloseFullscreenPopup.addEventListener('click', () => closingPopup(popupFullscreen));

buttonAddCard.addEventListener('click', () => openingPopup(popupAddCard));
buttonClosePopupAddCard.addEventListener('click', () => closingPopup(popupAddCard));

formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);