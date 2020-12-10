import {obj, formAddCard, inputAbout, buttonAddCard, buttonEditProfile, formEditProfile, inputName, buttonUpdate,
    formUpdate, profileName, profileAbout} from "../components/constants.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js"
import './index.css';
import {PopupWithSubmit} from "../components/PopupWithSubmit";

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
        authorization: "e879a6b8-e74b-4471-9f27-351cc1bff765",
        "content-type": "application/json",
    }
});
//Получение информации о пользователе с сервера и загрузка изменений
const profile = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'});
api.getProfile()
    .then((data) => {
        profile.name = data.name;
        profile.about = data.about;
        profile._id = data._id;
        document.querySelector('.profile__avatar').src = data.avatar;
    })
    .then(() => {
        profileName.textContent = profile.name;
        profileAbout.textContent = profile.about;
    })
    .catch((err) => {
        console.log(err);
    });
const submitFormEditProfileHandler = (submitButton, evt) => {
    evt.preventDefault();
    submitButton.textContent = 'Сохранение...';
    profile.setUserInfo();
    api.updateProfile({ name: profile.name, about: profile.about})
        .then(() => {
            profileName.textContent = profile.name;
            profileAbout.textContent = profile.about;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButton.textContent ='Сохранить';
            editProf.close();
        })
};


//Обновление аватара пользователя
const submitFormUpdateHandler = (submitButton, evt, {values}) => {
    submitButton.textContent = 'Сохранение...';
    evt.preventDefault();
    api.changeAvatar({avatar: values.avatar})
        .then(() => {
            document.querySelector('.profile__avatar').src = values.avatar;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
            updateAvatar.close();
        })
};

const updateAvatar = new PopupWithForm('.popup_action_update', {formCallback: submitFormUpdateHandler});

buttonUpdate.addEventListener('click', () => {
    updateAvatar.open();
    updateAvatar.setEventListeners();
    updateFormValidator.resetErrors();
    formUpdate.reset();
});

const editProf = new PopupWithForm('.popup_action_edit', { formCallback: submitFormEditProfileHandler});

buttonEditProfile.addEventListener('click',() => {
    profile.getUserInfo();
    inputName.value = profile.name;
    inputAbout.value = profile.about;
    editProf.open();
    editProf.setEventListeners();
    editFormValidator.resetErrors();
    editFormValidator.setStateSubmitButton();
});

const serverRemoveCard = (evt, cardId) => {
    evt.preventDefault();
    api.removeCard(cardId).then(() => {
        document.getElementById(cardId).remove();
        submitPopup.close();
    })
        .catch((err) => {
            console.log(err);
        })
};
const submitPopup = new PopupWithSubmit('.popup_action_submit', {formCallback: serverRemoveCard});

const handleCardClick = (evt) => {
    const modal = new PopupWithImage('.popup_action_fullscreen');
    const picture = {
        src: evt.target.src,
        alt: evt.target.alt,
        caption: evt.target.closest('.gallery__item').querySelector('.gallery__heading').textContent
    };
    modal.open(picture);
    modal.setEventListeners();
};
const handleLikeCard = (evt, cardId, profileId, likes) => {
    if(likes.some(elem => elem._id === profileId) || evt.target.classList.contains('button_action_like-active')) {
        api.deleteLike(evt, cardId).then((data) => {
            evt.target.closest('.gallery__item').querySelector('.gallery__like-counter').textContent = data.likes.length;
            evt.target.classList.remove('button_action_like-active');
        })
            .catch((err) => {
                console.log(err);
            })
    }
    else {
        api.putLike(evt, cardId)
            .then((data) => {
                evt.target.closest('.gallery__item').querySelector('.gallery__like-counter').textContent = data.likes.length;
                evt.target.classList.add('button_action_like-active');
            })
            .catch((err) => {
                console.log(err);
            })
    }

};
const handleDeleteCard = (cardId) => {
    submitPopup.open();
    submitPopup.setEventListeners(cardId);
};



Promise.all([api.getProfile()]).then(() => {

    api.getInitialCards()
        .then((data) => {
            const cardList = new Section({
                items: data.map((item) => ({
                    name: item.name,
                    link: item.link,
                    likes: item.likes,
                    _id: item._id,
                    profileId: profile._id,
                    ownerId: item.owner._id,
                })),
                renderer: (item) => {
                    const card = new Card(item, '.template', { handleCardClick, handleLikeCard, handleDeleteCard });
                    const cardElement = card.render();
                    cardList.addItem(cardElement);
                }}, '.gallery__list');
            cardList.renderer();
        })
        .catch((err) => {
            console.log(err);
        })
});

const submitFormAddCardHandler = (submitButton, evt, {values}) => {
    evt.preventDefault();
    submitButton.textContent = 'Сохранение...';
    const item =  {
        name: values.pictureName,
        link: values.pictureLink,
    };
    api.postCard(item)
        .then((data) => {
            const card = new Card( {
                name: data.name,
                link: data.link,
                likes: data.likes,
                _id: data._id,
                profileId: profile._id,
                ownerId: data.owner._id,

            }, '.template', { handleCardClick, handleLikeCard, handleDeleteCard });
            const cardElement = card.render();
            document.querySelector('.gallery__list').prepend(cardElement);
            addCardForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButton.textContent = 'Создать';

        })

};
const addCardForm = new PopupWithForm('.popup_action_add', { formCallback: submitFormAddCardHandler });
buttonAddCard.addEventListener('click', () => {
    addCardForm.open();
    addCardForm.setEventListeners();
    addFormValidator.resetErrors();
    formAddCard.reset();
    addFormValidator.setStateSubmitButton();
});


//Валидация форм
const updateFormValidator = new FormValidator(obj, formUpdate);
updateFormValidator.enableValidation();

const editFormValidator = new FormValidator(obj, formEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(obj, formAddCard);
addFormValidator.enableValidation();
