export default class UserInfo {
    constructor({ profileNameSelector, profileBioSelector, profileAvatarSelector }) {
      this._nameElement = document.querySelector(profileNameSelector)
      this._bioElement = document.querySelector(profileBioSelector)
      this._avatarElement = document.querySelector(profileAvatarSelector)
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        bio: this._bioElement.textContent
      }
    }

    setAvatar(avatarUrl) {
      this._avatarElement.src = avatarUrl;
    }
  
    setUserInfo(profileName, profileBio, profileAvatarUrl) {
        this._nameElement.textContent = profileName
        this._bioElement.textContent = profileBio
        if (profileAvatarUrl) this._avatarElement.src = profileAvatarUrl;
      }
  }