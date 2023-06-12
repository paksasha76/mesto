export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer(cards) {
    cards.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}
