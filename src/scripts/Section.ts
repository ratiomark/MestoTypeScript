import { CardResponse } from "./Api";
interface SectionProps {
  renderer(obj: any): void;
  containerSelector: string
}

export class Section {

  container: HTMLElement
  _renderer: Function

  constructor({ renderer, containerSelector }: SectionProps) {
    this._renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }
  renderItems(itemsToRender: CardResponse[]) {
    itemsToRender.forEach(cardObject => {
      const obj = this.prepareObject(cardObject)
      this._renderer(obj)
    })
  }
  prepareObject(cardObject: CardResponse) {
    const { name, link, likes, _id } = cardObject
    const ownerId = cardObject.owner._id
    const obj = { name, link, likes, ownerId, _id }
    return obj
  }
  addItemToEnd(element: HTMLElement) {
    this.container.append(element)
  }
  addItem(element: HTMLElement) {
    this.container.prepend(element)
  }
}