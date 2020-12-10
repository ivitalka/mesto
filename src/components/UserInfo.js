export class UserInfo {
    constructor({nameSelector, aboutSelector}) {
        this.name = document.querySelector(nameSelector).textContent;
        this.about = document.querySelector(aboutSelector).textContent;
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this.name;
        userInfo.about = this.about
    }

    setUserInfo() {
        this.name = document.querySelector('.popup__input_profile_name').value;
        this.about = document.querySelector('.popup__input_profile_about').value;
    }
}