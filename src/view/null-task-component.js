import { AbstractComponent } from '../framework/view/abstract-component.js';

function createEmptyTaskTemplate() {
  return `
    <li class="null-task-item">
        Перетащите карточку
    </li>
  `;
}

export default class NullTaskComponent extends AbstractComponent {
  get template() {
    return createEmptyTaskTemplate();
  }
}