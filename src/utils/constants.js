export const initialElements = [
    {
      name: 'Луна',
      link: 'https://img3.goodfon.ru/original/1024x768/c/fc/kosmos-luna-nebo.jpg',
    },
    {
      name: 'Моя планета Мелмак',
      link: 'https://avatars.mds.yandex.net/get-zen_doc/1821029/pub_5eafa60434cbba0565c6b3f2_5eafdcae0ab5b766d08574d5/scale_1200',
    },
    {
      name: 'Планета Венера',
      link: 'https://img4.goodfon.ru/original/1280x800/7/71/venera-planeta-solnechnaia-sistema.jpg',
    },
    {
      name: 'Планета Марс',
      link: 'https://img5.goodfon.ru/original/1024x768/d/86/kosmos-planeta-mars.jpg',
    },
    {
      name: 'Меркурий',
      link: 'https://img5.goodfon.ru/original/1280x800/f/d5/vadim-sadovski-by-vadim-sadovski-space-system-of-sun.jpg',
    },
    {
      name: 'Юпитер',
      link: 'https://img5.goodfon.ru/original/1280x800/2/4e/kosmos-planeta-iupiter.jpg',
    }
  ];

export const btnEditUser = document.querySelector('.profile__user-edit-button');
export const popupEditUser = document.querySelector('.popup_type_user-edit');
export const formElementEdit = popupEditUser.querySelector('.popup__form_type_user-edit');
export const nameUserInput = formElementEdit.querySelector('.popup__input_type_user-name');
export const bioUserInput = formElementEdit.querySelector('.popup__input_type_user-bio');

export const btnAddElement = document.querySelector('.profile__add-button');
export const popupAddElement = document.querySelector('.popup_type_add-mesto');
export const formElementAdd = popupAddElement.querySelector('.popup__form_type_add-mesto');

export const btnUpAvatar = document.querySelector('.profile__avatar');
export const popupUpAvatar = document.querySelector('.popup_type_update-avatar');
export const formElementAvatar = document.querySelector('.popup__form_type_update-avatar');

