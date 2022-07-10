(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){var n=e.baseUrl,r=e.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._userUrl="".concat(this._baseUrl,"/users/me"),this._cardsUrl="".concat(this._baseUrl,"/cards"),this._headers=r}var n,r;return n=t,(r=[{key:"_checkRes",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUserData",value:function(){var e=this;return fetch(this._userUrl,{method:"GET",headers:this._headers}).then((function(t){return e._checkRes(t)}))}},{key:"getCards",value:function(){var e=this;return fetch(this._cardsUrl,{method:"GET",headers:this._headers}).then((function(t){return e._checkRes(t)}))}},{key:"setUserData",value:function(e,t){var n=this;return fetch(this._userUrl,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return n._checkRes(e)}))}},{key:"addCard",value:function(e){var t=this,n=e.name,r=e.link;return fetch(this._cardsUrl,{method:"POST",headers:this._headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return t._checkRes(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch(this._cardsUrl+"/".concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._checkRes(e)}))}},{key:"likeSwitcher",value:function(e,t){var n=this;return t?fetch(this._cardsUrl+"/".concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return n._checkRes(e)})):fetch(this._cardsUrl+"/".concat(e,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return n._checkRes(e)}))}},{key:"updateAvatar",value:function(e){var t=this;return fetch("".concat(this._userUrl,"/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return t._checkRes(e)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i,a){var u,c,s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),c=function(){return s._likes.some((function(e){return e._id==s._userId}))},(u="isLiked")in this?Object.defineProperty(this,u,{value:c,enumerable:!0,configurable:!0,writable:!0}):this[u]=c,this._cardData=t,this._name=t.name,this._link=t.link,this._userId=r,this._ownerId=t.owner._id,this._likes=t.likes,this._templateSelector=n,this._cardElement=this._getTemplate(),this._cardName=this._cardElement.querySelector(".elements__item-name"),this._cardImage=this._cardElement.querySelector(".elements__item-image"),this._likeCard=this._cardElement.querySelector(".elements__like-btn"),this._deleteCard=this._cardElement.querySelector(".elements__trash-btn"),this._likeCount=this._cardElement.querySelector(".elements__like-counter"),this._handlePhotoClick=o,this._handleTrashButtonClick=i,this._handleLikeButtonClick=a}var t,r;return t=e,(r=[{key:"deleteCard",value:function(){this._cardElement.remove(),this._cardElement=null}},{key:"_isOwnerCard",value:function(){this._ownerId!==this._userId&&this._deleteCard.remove()}},{key:"updateLikes",value:function(e){this._likeCount.textContent=e.likes.length,this._likes=e.likes,this._likeCard.classList.toggle("elements__like-btn_active",this.isLiked())}},{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".elements__item").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._likeCard.addEventListener("click",(function(){e._handleLikeButtonClick(e)})),this._deleteCard.addEventListener("click",(function(){e._handleTrashButtonClick(e._cardData)})),this._cardImage.addEventListener("click",(function(){e._handlePhotoClick(e._name,e._link)}))}},{key:"createCard",value:function(){return this._cardImage.alt=this._name,this._cardName.textContent=this._name,this._cardImage.src=this._link,this.updateLikes(this._cardData),this._likeCount.textContent=this._likes.length,this._isOwnerCard(),this._setEventListeners(),this._cardElement}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formData=t,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._formData.inputSelector)),this._buttonElement=this._formElement.querySelector(this._formData.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_findErrorElement",value:function(e){return this._formElement.querySelector("#error-".concat(e.id))}},{key:"_showInputError",value:function(e){var t=this._findErrorElement(e);e.classList.add(this._formData.inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._formData.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._findErrorElement(e);e.classList.remove(this._formData.inputErrorClass),t.classList.remove(this._formData.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._formData.inactiveButtonClass),this._buttonElement.disabled="disabled"):(this._buttonElement.classList.remove(this._formData.inactiveButtonClass),this._buttonElement.disabled="")}},{key:"_setEventListeners",value:function(){var e=this;this.toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e.toggleButtonState()}))}))}},{key:"resetValidation",value:function(){var e=this;this.toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=t,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.reverse().forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._closePopupByEsc=this._closePopupByEsc.bind(this)}var t,n;return t=e,(n=[{key:"_closePopupByEsc",value:function(e){"Escape"===e.key&&this.closePopup()}},{key:"openPopup",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._closePopupByEsc)}},{key:"closePopup",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._closePopupByEsc)}},{key:"setEventListeners",value:function(){var e=this,t=this._popup.querySelector(".popup__close-btn");this._popup.addEventListener("mousedown",(function(n){(n.target.classList.contains("popup_opened")||n.target===t)&&e.closePopup()}))}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=h(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},f.apply(this,arguments)}function h(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}function d(e,t){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},d(e,t)}function y(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(r);if(o){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return y(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__figure-image"),t._popupCaption=t._popup.querySelector(".popup__figure-caption"),t}return t=a,(n=[{key:"openPopup",value:function(e,t){this._popupImage.src=t,this._popupImage.alt=e,this._popupCaption.textContent=e,f(_(a.prototype),"openPopup",this).call(this)}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=E(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},k.apply(this,arguments)}function E(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}function g(e,t){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},g(e,t)}function w(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleFormSubmit=t,n._form=n._popup.querySelector(".popup__form"),n._inputs=n._form.querySelectorAll(".popup__input"),n._popupSubmitButton=n._form.querySelector(".popup__submit-btn"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputs.forEach((function(t){e[t.name]=t.value})),e}},{key:"setEventListeners",value:function(){var e=this;k(S(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())}))}},{key:"closePopup",value:function(){k(S(a.prototype),"closePopup",this).call(this),this._form.reset()}},{key:"renderLoading",value:function(e){this._popupSubmitButton.textContent=e?"Сохранение...":"Сохранить"}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function P(e){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(e)}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=L(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},j.apply(this,arguments)}function L(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}function I(e,t){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},I(e,t)}function R(e,t){if(t&&("object"===P(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&I(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return R(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._formElement=t._popup.querySelector(".form"),t}return t=a,(n=[{key:"setSubmitAction",value:function(e){this._clickSubmit=e}},{key:"setEventListeners",value:function(){var e=this;this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._clickSubmit()})),j(q(a.prototype),"setEventListeners",this).call(this)}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var D=function(){function e(t){var n=t.profileNameSelector,r=t.profileBioSelector,o=t.profileAvatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._bioElement=document.querySelector(r),this._avatarElement=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,bio:this._bioElement.textContent}}},{key:"setAvatar",value:function(e){this._avatarElement.src=e}},{key:"setUserInfo",value:function(e,t,n){this._nameElement.textContent=e,this._bioElement.textContent=t,n&&(this._avatarElement.src=n)}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),U=document.querySelector(".profile__user-edit-button"),A=document.querySelector(".popup_type_user-edit").querySelector(".popup__form_type_user-edit"),x=A.querySelector(".popup__input_type_user-name"),V=A.querySelector(".popup__input_type_user-bio"),N=document.querySelector(".profile__add-button"),J=document.querySelector(".popup_type_add-mesto").querySelector(".popup__form_type_add-mesto"),F=document.querySelector(".profile__avatar"),G=document.querySelector(".popup__form_type_update-avatar");function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-btn",inactiveButtonClass:"popup__submit-btn_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},z=new i(M,A),$=new i(M,J),K=new i(M,G),Q=new t({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-44",headers:{authorization:"552f6cf5-9624-4487-82c3-a3748eda88d5","Content-Type":"application/json"}}),W=null;function X(e){var t=new r(e,"#element-template",W,Y,(function(e){te.openPopup(),te.setSubmitAction((function(){Q.deleteCard(e._id).then((function(){t.deleteCard(),te.closePopup()})).catch((function(e){console.log(e)}))}))}),(function(t){Q.likeSwitcher(e._id,t.isLiked()).then((function(e){t.updateLikes(e)})).catch((function(e){console.log(e)}))}));return t.createCard()}function Y(e,t){ee.openPopup(e,t)}var Z=new u((function(e){var t=X(e);Z.addItem(t)}),".elements__items");Promise.all([Q.getUserData(),Q.getCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];W=o._id,ne.setUserInfo(o.name,o.about,o.avatar),Z.renderItems(i)})).catch((function(e){console.log(e)}));var ee=new m(".popup_type_view-mesto"),te=new T(".popup_type_delete-card-confirm"),ne=new D({profileNameSelector:".profile__user-name",profileBioSelector:".profile__user-bio",profileAvatarSelector:".profile__avatar-image"}),re=new O(".popup_type_user-edit",(function(e){re.renderLoading(!0),Q.setUserData(e.name,e.bio).then((function(e){ne.setUserInfo(e.name,e.about),re.closePopup()})).catch((function(e){console.log(e)})).finally((function(){re.renderLoading(!1)}))})),oe=new O(".popup_type_add-mesto",(function(e){oe.renderLoading(!0),Q.addCard({name:e["mesto-name"],link:e["mesto-link"]}).then((function(e){var t=X(e);Z.addItem(t),oe.closePopup()})).catch((function(e){console.log(e)})).finally((function(){oe.renderLoading(!1)}))})),ie=new O(".popup_type_update-avatar",(function(e){ie.renderLoading(!0),Q.updateAvatar(e["avatar-link"]).then((function(e){ne.setAvatar(e.avatar),ie.closePopup()})).catch((function(e){console.log(e)})).finally((function(){ie.renderLoading(!1)}))}));ee.setEventListeners(),re.setEventListeners(),oe.setEventListeners(),ie.setEventListeners(),te.setEventListeners(),N.addEventListener("click",(function(){$.resetValidation(),oe.openPopup()})),U.addEventListener("click",(function(){var e=ne.getUserInfo(),t=e.name,n=e.bio;x.value=t,V.value=n,z.resetValidation(),re.openPopup()})),F.addEventListener("click",(function(){K.resetValidation(),ie.openPopup()})),z.enableValidation(),$.enableValidation(),K.enableValidation()})();