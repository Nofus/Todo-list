import { AbstractComponent } from '../framework/view/abstract-component.js';

function createLoadingTemplate() {
  return (
    `<p class="board_no-tasks">
      Загрузка...
    </p>`
  );
}

export default class LoadingComponent extends AbstractComponent {
  get template() {
    return createLoadingTemplate();
  }
}