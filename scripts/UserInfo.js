export default class UserInfo {
    constructor({ profileNameSelector, profileBioSelector }) {
      this._nameElement = document.querySelector(profileNameSelector)
      this._bioElement = document.querySelector(profileBioSelector)
      
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        bio: this._bioElement.textContent
      }
    }
    
    setUserInfo(profileName, profileBio) {
        this._nameElement.textContent = profileName
        this._bioElement.textContent = profileBio
      }
  }