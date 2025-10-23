import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskBoardComponentTemplate() {
  return `<section id="task"></section>`;
}

export default class TaskBoardComponent extends AbstractComponent {
  get template() {
    return createTaskBoardComponentTemplate();
  }
}