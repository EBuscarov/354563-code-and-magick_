'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');

var getRandomArray = function (array) {
  var indexArray = Math.floor(Math.random() * array.length);
  return array[indexArray];
};

var formUserName = document.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (evt.target !== formUserName) {
      closePopup();
    }
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

userDialogOpen.addEventListener('click', openPopup);

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', closePopup);

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
    // name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)],
    name: getRandomArray(WIZARD_NAMES),
    surname: getRandomArray(WIZARD_SURNAMES),
    coatColor: getRandomArray(COAT_COLORS),
    eyeColor: getRandomArray(EYE_COLORS)
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

var coatThumbnails = document.querySelectorAll('.wizard-coat');
var wizardPicture = document.querySelector('.setup-wizard');
var coatFullPicture = wizardPicture.querySelector('.wizard-coat');

var addThumbnailClickHandler = function (coatThumbnail, coatPicture) {
  coatThumbnail.addEventListener('click', function () {
    coatFullPicture.style.fill = coatPicture;
  });
};

for (i = 1; i < coatThumbnails.length; i++) {
  addThumbnailClickHandler(coatThumbnails[i], COAT_COLORS[i]);
}

/*
Изменение цвета глаз персонажа по нажатию.
Цвет глаз волшебника меняется по нажатию на блок .setup-wizard .wizard-eyes.
Возможные варианты цвета глаз персонажа:

black
red
blue
yellow
green
*/

var eyeThumbnails = document.querySelectorAll('.wizard-eyes');
var eyeFullPicture = wizardPicture.querySelector('.wizard-eyes');

addThumbnailClickHandler = function (eyeThumbnail, eyePicture) {
  eyeThumbnail.addEventListener('click', function () {
    eyeFullPicture.style.fill = eyePicture;
  });
};

for (i = 1; i < eyeThumbnails.length; i++) {
  addThumbnailClickHandler(eyeThumbnails[i], EYE_COLORS[i]);
}

/*
Изменение цвета фаерболов по нажатию.
Цвет задаётся через изменение фона у блока .setup-fireball-wrap.

Для того, чтобы на сервер отправились правильные данные, при изменении
параметров персонажа должно изменяться и значение соответствующего скрытого инпута.
*/

var fireballSetup = document.querySelector('.setup-fireball-wrap');

var addFireballClickHandler = function () {
  fireballSetup.addEventListener('click', function () {
    fireballSetup.style.background = getRandomArray(FIREBALL_COLORS);
  });
};

addFireballClickHandler(FIREBALL_COLORS);

// for (i = 0; i < FIREBALL_COLORS.length; i++) {
// addFireballClickHandler(FIREBALL_COLORS[i]);
// }

// var fireballSetupForm = fireballSetupWrap.querySelector('input');
