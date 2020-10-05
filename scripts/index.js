
let popup = document.querySelector('.popup');

let editButton = document.querySelector('.button_action_edit');
let closeButton = document.querySelector('.button_action_close');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_target_name');
let descriptionInput = formElement.querySelector('.popup__input_target_description');


let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');


function popupOpened(){
    nameInput.value = name.innerText;
    descriptionInput.value = description.innerText;
    popup.classList.add('popup_opened');
}

function popupClosed() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    popupClosed();
}

editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);

formElement.addEventListener('submit', formSubmitHandler);