import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTrashButtonTemplate() {
  return '<button>✕ Очистить</button>';
}

export default class ClearTrashButtonComponent extends AbstractComponent {
  get template() {
    return createTrashButtonTemplate();
  }
}