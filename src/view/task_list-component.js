import {createElement} from '../framework/render.js';
import TaskComponent from './task-component.js';

function createTaskListComponentTemplate() {
  return (
    `<div class="task-list" id="backlog">
      <h3>Название блока</h3>
      <ul class="task-item">
      </ul>
    </div>`
  );
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      
      //4 задачи в каждый список
      const taskList = this.element.querySelector('.task-item');
      for (let i = 0; i < 4; i++) {
        const taskComponent = new TaskComponent();
        taskList.insertAdjacentHTML('beforeend', taskComponent.getTemplate());
      }
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}