export class UserInfo {
    constructor({nameSelector, aboutSelector}) {
        this.name = document.querySelector(nameSelector).textContent;
        this.about = document.querySelector(aboutSelector).textContent;
        this.avatar = document.querySelector('.profile__avatar').src;
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this.name;
        userInfo.about = this.about;
        userInfo.avatar = this.avatar;
        return userInfo;
    }

    setUserInfo() {
        this.name = document.querySelector('.popup__input_profile_name').value;
        this.about = document.querySelector('.popup__input_profile_about').value;
        this.avatar = document.querySelector('.popup__input_avatar_link').value;
    }
}