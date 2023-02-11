interface IPopup {
  // static _popup: HTMLElement;
  // open(): void
  // close(): void
  // _handleEscClose(event: KeyboardEvent): void;
  // _handleCloseByOverlay(event: MouseEvent): void;
  // setEventListeners(): void
}

export class Popup implements IPopup {

  static _popup: HTMLElement

  constructor(popupSelector: string) {
    Popup._popup = document.querySelector(popupSelector);
    Popup._handleEscClose = Popup._handleEscClose.bind(this)
  }

  public static open(obj?: Object): void {
    Popup._popup.classList.add('popup_active')
    document.addEventListener('keydown', this._handleEscClose)
  }

  public static close() {
    this._popup.classList.remove('popup_active')
    document.removeEventListener("keydown", this._handleEscClose)
  }

  static _handleEscClose(event: KeyboardEvent): void {
    if (event.key === "Escape" || event.key === "Esc") {
      Popup.close();
    }
  }

  static _handleCloseByOverlay(event: MouseEvent): void {
    if (event.target == event.currentTarget) {
      Popup.close()
    }
  }

  public static setEventListeners() {
    Popup._popup.querySelector('.popup__close-button').addEventListener("click", this.close.bind(this))
    Popup._popup.addEventListener('click', this._handleCloseByOverlay.bind(this))
  }
}

