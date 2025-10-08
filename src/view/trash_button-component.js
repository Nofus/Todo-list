import {createElement} from '../framework/render.js';

function createTrashButtonTemplate() {
  return '<button>✕ Очистить</button>';
}

export default class ClearTrashButtonComponent {
  getTemplate() {
    return createTrashButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}