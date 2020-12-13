import {obj, formAddCard, inputAbout, buttonAddCard, buttonEditProfile, formEditProfile, inputName, buttonUpdate,
    formUpdate, profileName, profileAbout, profileAvatar} from "../components/constants.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js"
import './index.css';
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
        authorization: "e879a6b8-e74b-4471-9f27-351cc1bff765",
        "content-type": "application/json",
    }
});
//Получение информации о пользователе с сервера и загрузка изменений
const profile = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'});
//Отрисовка страницы
Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        profile.name = userData.name;
        profile.about = userData.about;
        profile.id = userData._id;
        profile.avatar = userData.avatar;

        profileName.textContent = profile.name;
        profileAbout.textContent = profile.about;
        profileAvatar.src = profile.avatar;

        const cardList = new Section({
            items: initialCards.map((item) => ({
                name: item.name,
                link: item.link,
                likes: item.likes,
                _id: item._id,
                profileId: profile.id,
                ownerId: item.owner._id,
            })),
            renderer: (item) => {
                const cardElement = createCard(item).render();
                cardList.addItem(cardElement);
            }}, '.gallery__list');
        cardList.renderer();
    })
    .catch((err) => {
        console.log(err);
    });

//Обновление информации профиля
const submitFormEditProfileHandler = (submitButton, evt) => {
    evt.preventDefault();
    submitButton.textContent = 'Сохранение...';
    profile.setUserInfo();
    api.updateProfile({ name: profile.name, about: profile.about})
        .then(() => {
            profileName.textContent = profile.name;
            profileAbout.textContent = profile.about;
            editProf.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButton.textContent ='Сохранить';
        })
};

//Обновление аватара пользователя
const submitFormUpdateHandler = (submitButton, evt) => {
    submitButton.textContent = 'Сохранение...';
    evt.preventDefault();
    profile.setUserInfo();
    api.changeAvatar({avatar: profile.avatar})
        .then(() => {
            profileAvatar.src = profile.avatar;
            updateAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        })
};

const updateAvatar = new PopupWithForm('.popup_action_update', {formCallback: submitFormUpdateHandler});
updateAvatar.setEventListeners();

buttonUpdate.addEventListener('click', () => {
    profile.getUserInfo();
    updateAvatar.open();
    updateFormValidator.resetErrors();
    formUpdate.reset();
});

const editProf = new PopupWithForm('.popup_action_edit', { formCallback: submitFormEditProfileHandler});
editProf.setEventListeners();

buttonEditProfile.addEventListener('click',() => {
    profile.getUserInfo();
    inputName.value = profile.name;
    inputAbout.value = profile.about;
    editProf.open();
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

//Открытие картинки на весь экран
const fullSizePicture = new PopupWithImage('.popup_action_fullscreen');
fullSizePicture.setEventListeners();
const handleCardClick = (evt) => {
    const picture = {
        src: evt.target.src,
        alt: evt.target.alt,
        caption: evt.target.closest('.gallery__item').querySelector('.gallery__heading').textContent
    };
    fullSizePicture.open(picture);
};

// const deleteLike = (cardId) => {
//     api.deleteLike(cardId)
//         .catch((err) => {
//         console.log(err);
//     });
// };
// const putLike = (cardId) => {
//     api.putLike(cardId)
//         .catch((err) => {
//         console.log(err);
//     });
// };

// const handleLikeCard = (evt, cardId, profileId, likes) => {
//     if(likes.some(elem => elem._id === profileId) || evt.target.classList.contains('button_action_like-active')) {
//         api.deleteLike(evt, cardId).then((data) => {
//             evt.target.closest('.gallery__item').querySelector('.gallery__like-counter').textContent = data.likes.length;
//             evt.target.classList.remove('button_action_like-active');
//         })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }
//     else {
//         api.putLike(evt, cardId)
//             .then((data) => {
//                 evt.target.closest('.gallery__item').querySelector('.gallery__like-counter').textContent = data.likes.length;
//                 evt.target.classList.add('button_action_like-active');
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }
//
// };

const handleDeleteCard = (cardId) => {
    submitPopup.open();
    submitPopup.setEventListeners();
};

const createCard = (item) => {
    return new Card(item, '.template', {handleCardClick, handleDeleteCard, api});
};

const submitFormAddCardHandler = (submitButton, evt, {values}) => {
    evt.preventDefault();
    submitButton.textContent = 'Сохранение...';
    const item =  {
        name: values.pictureName,
        link: values.pictureLink,
    };
    api.postCard(item)
        .then((data) => {
            const cardElement = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                _id: data._id,
                profileId: profile.id,
                ownerId: data.owner._id,
            }).render();
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
addCardForm.setEventListeners();
buttonAddCard.addEventListener('click', () => {
    addCardForm.open();
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
