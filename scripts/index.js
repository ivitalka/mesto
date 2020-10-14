
const popup = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_action_edit');
const addPopup = document.querySelector('.popup_action_add');

const editButton = document.querySelector('.button_action_edit');
const closeButton = document.querySelectorAll('.button_action_close');
const addButton = document.querySelector('.button_action_add');


const formElement = document.querySelectorAll('.popup__container');
const nameInput = formElement[0].querySelector('.popup__input_target_name');
const descriptionInput = formElement[0].querySelector('.popup__input_target_description');
const pictureName = formElement[1].querySelector('.popup__input_picture_name');
const pictureLink = formElement[1].querySelector('.popup__input_picture_link');

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


const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const editPopupOpened = () => {
    nameInput.value = profileName.innerText;
    descriptionInput.value = profileDescription.innerText;
    editPopup.classList.add('popup_opened');
    closeButton[0].addEventListener('click', formCloseHandler);
};

const addPopupOpened = () => {
    addPopup.classList.add('popup_opened');
    closeButton[1].addEventListener('click', formCloseHandler);
};

const renderList = () => {
    const items = initialCards.map(element => getItems(element));
    list.append(...items);
};

const getItems = (data) => {
    const card = template.content.cloneNode(true);
    card.querySelector('.gallery__heading').innerText = data.name;
    card.querySelector('.gallery__picture').src = data.link;

    const removeButton = card.querySelector('.button_action_remove');

    removeButton.addEventListener('click', cardRemoveHandler);
    return card;
};

const cardRemoveHandler = (evt) => {
    evt.target.closest('.gallery__item').remove();
};

const formCloseHandler = (evt) => {
    evt.target.closest('.popup').classList.remove('popup_opened');
};

const formEditProfileSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popup[0].classList.remove('popup_opened');
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
    popup[1].classList.remove('popup_opened');
};


renderList();

editButton.addEventListener('click', editPopupOpened);

addButton.addEventListener('click', addPopupOpened);

formElement[0].addEventListener('submit', formEditProfileSubmitHandler);
formElement[1].addEventListener('submit', formAddCardSubmitHandler);
