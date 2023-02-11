import { Popup } from "./Popup";

type OpenProps = {
  link: string;
  name: string;
  alt: string;
}

export class PopupWithImage extends Popup {
  static _imgPopupShowCard: HTMLImageElement;
  static _descriptionPopupShowCard: HTMLParagraphElement;

  constructor(popupSelector: string) {
    super(popupSelector)
    PopupWithImage._imgPopupShowCard = PopupWithImage._popup.querySelector('.popup__image');
    PopupWithImage._descriptionPopupShowCard = PopupWithImage._popup.querySelector('.popup__image-description');
  }

  static open({ link, name, alt }: OpenProps): void {
    PopupWithImage._imgPopupShowCard.src = link;
    PopupWithImage._imgPopupShowCard.alt = alt;
    PopupWithImage._descriptionPopupShowCard.textContent = name;
    Popup.open()
  }
}