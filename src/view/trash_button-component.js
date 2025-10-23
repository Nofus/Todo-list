import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTrashButtonTemplate() {
  return '<button>✕ Очистить</button>';
}

export default class ClearTrashButtonComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
  }

  get template() {
    return createTrashButtonTemplate();
  }

  afterElementCreate() {
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  disableButton() {
    this.element.disabled = true;
  }
}