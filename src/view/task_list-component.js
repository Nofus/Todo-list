import { AbstractComponent } from '../framework/view/abstract-component.js';
import TaskComponent from './task-component.js';
import NullTaskComponent from './null-task-component.js';
import { render } from '../framework/render.js';

function createTaskListComponentTemplate(title, status) {
  return (
    `<div class="task-list" id="${status}">
      <h3>${title}</h3>
      <ul class="task-item">
      </ul>
    </div>`
  );
}

export default class TaskListComponent extends AbstractComponent {
  constructor(title, tasks = [], status) {
    super(); 
    this.title = title;
    this.tasks = tasks;
    this.status = status;
  }

  get template() {
    return createTaskListComponentTemplate(this.title, this.status);
  }

  afterElementCreate() {
  const taskList = this.element.querySelector('.task-item');
  
  if (this.tasks.length === 0) {
    this.#renderNullTask(taskList);
  } else {
    this.tasks.forEach(task => {
      const taskComponent = new TaskComponent(task);
      render(taskComponent, taskList);
    });
  }
}

#renderNullTask(container) {
  const nullTaskComponent = new NullTaskComponent();
  render(nullTaskComponent, container);
}
}