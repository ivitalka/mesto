export class UserInfo {
    constructor({nameSelector, aboutSelector: descriptionSelector}) {
        this.name = document.querySelector(nameSelector).textContent;
        this.description = document.querySelector(descriptionSelector).textContent;
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this.name;
        userInfo.description = this.description;
        return userInfo;
    }

    setUserInfo() {
        this.name = document.querySelector('.popup__input_profile_name').value;
        this.description = document.querySelector('.popup__input_profile_description').value;
    }
}