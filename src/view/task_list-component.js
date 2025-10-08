import {createElement} from '../framework/render.js';
import TaskComponent from './task-component.js';

function createTaskListComponentTemplate(title, status) {
  return (
    `<div class="task-list" id="${status}">
      <h3>${title}</h3>
      <ul class="task-item">
      </ul>
    </div>`
  );
}

export default class TaskListComponent {
  constructor(title, tasks = [], status) {
    this.title = title;
    this.tasks = tasks;
    this.status = status;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.title, this.status);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      
      const taskList = this.element.querySelector('.task-item');
      
      this.tasks.forEach(task => {
        const taskComponent = new TaskComponent(task);
        taskList.insertAdjacentHTML('beforeend', taskComponent.getTemplate());
      });
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}