import {initialCards, obj, formAddCard, inputDescription, buttonAddCard,
    buttonEditProfile, formEditProfile, inputName,} from "../components/constants.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import './index.css';


const handleCardClick = (evt) => {
    const modal = new PopupWithImage('.popup_action_fullscreen');
    const picture = {
        src: evt.target.src,
        alt: evt.target.alt,
        caption: evt.target.closest('.gallery__item').textContent
    };
    modal.open(picture);
    modal.setEventListeners();
};

const cardList = new Section({items: initialCards, renderer: (item) => {
        const card = new Card(item, '.template', { handleCardClick });
        const cardElement = card.render();
        cardList.addItem(cardElement);
    }}, '.gallery__list');

cardList.renderer();


const profile = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__description'});


const submitFormEditProfileHandler = (evt) => {
    evt.preventDefault();
    profile.setUserInfo();
    document.querySelector('.profile__name').textContent = profile.name;
    document.querySelector('.profile__description').textContent = profile.description;
    editProf.close();
};

const editProf = new PopupWithForm('.popup_action_edit', { formCallback: submitFormEditProfileHandler});

buttonEditProfile.addEventListener('click',() => {
    editProf.open();
    editProf.setEventListeners();
    inputName.value = profile.getUserInfo().name;
    inputDescription.value = profile.getUserInfo().description;
    editFormValidator.resetErrors();
    editFormValidator.setStateSubmitButton();
});

const submitFormAddCardHandler = (evt, {values}) => {
    evt.preventDefault();
    const item = new Card( {
        name: values.pictureName,
        link: values.pictureLink,
        alt: 'Изображение пользователя'
    }, '.template', { handleCardClick });
    const cardElement = item.render();
    document.querySelector('.gallery__list').prepend(cardElement);
    addCardForm.close()
};


const addCardForm = new PopupWithForm('.popup_action_add', { formCallback: submitFormAddCardHandler });

buttonAddCard.addEventListener('click', () => {
    addCardForm.open();
    addCardForm.setEventListeners();
    addFormValidator.resetErrors();
    formAddCard.reset();
    addFormValidator.setStateSubmitButton();
});


const editFormValidator = new FormValidator(obj, formEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(obj, formAddCard);
addFormValidator.enableValidation();
