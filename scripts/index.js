const popupEditProfile = document.querySelector('.popup_action_edit');
const buttonEditProfile = document.querySelector('.button_action_edit');
const buttonClosePopupEditProfile = document.querySelector('.button_close_edit-form');
const formEditProfile = document.querySelector('.popup__form_action_edit');
const formAddCard = document.querySelector('.popup__form_action_add');

const popupAddCard = document.querySelector('.popup_action_add');
const buttonAddCard = document.querySelector('.button_action_add');
const buttonClosePopupAddCard = document.querySelector('.button_close_add-form');

const inputName = document.querySelector('.popup__input_profile_name');
const inputDescription = document.querySelector('.popup__input_profile_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupFullscreen = document.querySelector('.popup_action_fullscreen');
const pictureName = formAddCard.querySelector('.popup__input_picture_name');
const pictureLink = formAddCard.querySelector('.popup__input_picture_link');
const fullScreenPictureLink = document.querySelector('.figure__picture');
const fullScreenPictureName = document.querySelector('.figure__caption');
const buttonCloseFullscreenPopup = document.querySelector('.button_close_fullscreen');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const template = document.querySelector('.template');
const list = document.querySelector('.gallery__list');

const renderList = () => {
    const items = initialCards.map(element => getItems(element));
    list.append(...items);
};

const getItems = (data) => {
    const card = template.content.cloneNode(true);
    card.querySelector('.gallery__heading').innerText = data.name;
    card.querySelector('.gallery__picture').src = data.link;

    const pictureButton = card.querySelector('.gallery__picture');


    const removeButton = card.querySelector('.button_action_remove');
    const likeButton = card.querySelector('.button_action_like');

    pictureButton.addEventListener('click', fullScreenHandler);
    likeButton.addEventListener('click', likeHandler);
    removeButton.addEventListener('click', cardRemoveHandler);

    return card;
};

const cardRemoveHandler = (evt) => {
    evt.target.closest('.gallery__item').remove();
};
const fullScreenHandler = (evt) => {
    openingPopup(popupFullscreen);
    fullScreenPictureLink.src = evt.target.src;
    fullScreenPictureName.textContent = evt.target.nextElementSibling.textContent;
};



const likeHandler = (evt) => {
    evt.target.closest('.button_action_like').classList.toggle('button_action_like-active');
};

const openingPopup = (data) => data.classList.add('popup_opened');
const closingPopup = (data) => data.classList.remove('popup_opened');


const fillEditPopup = () => {
    inputName.value = profileName.innerText;
    inputDescription.value = profileDescription.innerText;
};

const formEditProfileSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closingPopup(popupEditProfile);
};
const formAddCardSubmitHandler = (evt) => {
    evt.preventDefault();
    const item = getItems( {
        name: pictureName.value,
        link: pictureLink.value
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
