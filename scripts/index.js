
let popup = document.querySelector('.popup');

let editButton = document.querySelector('.button_action_edit');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_target_name');
let descriptionInput = formElement.querySelector('.popup__input_target_description');


let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');


function popupOpened(){
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', name.innerText);
    descriptionInput.setAttribute('value', description.innerText);
}

editButton.addEventListener('click', popupOpened);

let closeButton = document.querySelector('.button_action_close');

function popupClosed() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', popupClosed);


function formSubmitHandler (evt) {
    evt.preventDefault();
    name.innerText = nameInput.value;
    description.innerText = descriptionInput.value;
    popupClosed();
}

formElement.addEventListener('submit', formSubmitHandler);