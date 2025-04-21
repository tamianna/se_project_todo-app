export default class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
  }

  open() {
    this._popupEl.classList.add("popup_visible");
    document.addEventListener("keydown", (evt) => this._handleEscapeClose(evt));
  }

  close() {
    this._popupEl.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupEl.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}
