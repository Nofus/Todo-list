import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  return `<li>${task.title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor(task) {
    super(); 
    this.task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }

  afterElementCreate() {
    this.#makeTaskDraggable();
  }

  #makeTaskDraggable() {
    this.element.setAttribute('draggable', true);
    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.task.id);
    });
  }
}