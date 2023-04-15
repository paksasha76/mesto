export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._items = items;
    this._container = document.querySelector(selectorContainer);
    this._renderer = renderer;
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addCard(card) {
    this._container.prepend(card);
  }
}
