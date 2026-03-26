const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector("#popup-edit");
const addPopup = document.querySelector("#popup-add");

const editCloseButton = editPopup.querySelector(".popup__close");
const addCloseButton = addPopup.querySelector(".popup__close");

const editFormElement = editPopup.querySelector(".popup__form");
const addFormElement = addPopup.querySelector(".popup__form");

const nameInput = editPopup.querySelector(".popup__input_type_name");
const aboutInput = editPopup.querySelector(".popup__input_type_about");

const titleInput = addPopup.querySelector(".popup__input_type_title");
const linkInput = addPopup.querySelector(".popup__input_type_link");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const cardsList = document.querySelector(".elements__list");

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleOverlayClose(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

function handleDeleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function setCardEventListeners(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", handleDeleteCard);
}

function createCard(title, link) {
  const cardElement = document.createElement("li");
  cardElement.classList.add("card");

  cardElement.innerHTML = `
    <img class="card__image" src="${link}" alt="${title}">
    <button
      class="card__delete-button"
      type="button"
      aria-label="Eliminar tarjeta"
    ></button>
    <div class="card__description">
      <h2 class="card__title">${title}</h2>
      <button
        class="card__like-button"
        type="button"
        aria-label="Me gusta"
      ></button>
    </div>
  `;

  setCardEventListeners(cardElement);

  return cardElement;
}

function handleEditButtonClick() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closePopup(editPopup);
}

function handleAddButtonClick() {
  addFormElement.reset();
  openPopup(addPopup);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardElement = createCard(titleInput.value, linkInput.value);
  cardsList.prepend(cardElement);

  addFormElement.reset();
  closePopup(addPopup);
}

const initialCards = document.querySelectorAll(".card");
initialCards.forEach(setCardEventListeners);

editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);

editCloseButton.addEventListener("click", function () {
  closePopup(editPopup);
});

addCloseButton.addEventListener("click", function () {
  closePopup(addPopup);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddCardSubmit);

editPopup.addEventListener("click", handleOverlayClose);
addPopup.addEventListener("click", handleOverlayClose);
