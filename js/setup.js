'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');

// Если фокус находится на форме ввода имени, то окно закрываться не должно.
// var setupUserName = document.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = [];
for (i = 0; i < 4; i++) {
  wizards.push({
    name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)],
    surname: WIZARD_SURNAME[Math.floor(Math.random() * WIZARD_SURNAME.length)],
    coatColor: COAT_COLOR[Math.floor(Math.random() * COAT_COLOR.length)],
    eyeColor: EYE_COLOR[Math.floor(Math.random() * EYE_COLOR.length)]
  });
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');

/*
Изменение цвета мантии персонажа по нажатию.
Цвет мантии .setup-wizard .wizard-coat должен обновляться по нажатию на неё.
Цвет мантии задаётся через изменение инлайнового CSS-свойства fill для элемента.
Цвет должен сменяться произвольным образом на один из следующих цветов:

rgb(101, 137, 164)
rgb(241, 43, 107)
rgb(146, 100, 161)
rgb(56, 159, 117)
rgb(215, 210, 55)
rgb(0, 0, 0)
*/

var thumbnails = document.querySelectorAll('.wizard-coat');
var wizardPicture = document.querySelector('.setup-wizard');
var fullPicture = wizardPicture.querySelector('.wizard-coat');

var addThumbnailClickHandler = function (thumbnail, picture) {
  thumbnail.addEventListener('click', function () {
    fullPicture.style.fill = picture;
    // console.log(thumbnail);
    // console.log(picture);
  });
};

for (i = 1; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], COAT_COLOR[i]);
}
