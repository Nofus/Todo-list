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
  #onTaskDrop = null;

  constructor(title, tasks = [], status, onTaskDrop) {
    super(); 
    this.title = title;
    this.tasks = tasks;
    this.status = status;
    this.#onTaskDrop = onTaskDrop;
  }

  get template() {
    return createTaskListComponentTemplate(this.title, this.status);
  }

  afterElementCreate() {
    this.#setDropHandler();
    
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

  #setDropHandler() {
    const container = this.element;
    
    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    
    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      const insertIndex = this.#getInsertIndex(event);
      this.#onTaskDrop(taskId, this.status, insertIndex);
    });
  }

  #getInsertIndex(event) {
    const taskItems = this.element.querySelectorAll('li');
    if (taskItems.length === 0) {
      return 0;
    }

    const afterElement = this.#getDragAfterElement(this.element.querySelector('.task-item'), event.clientY);
    
    if (afterElement == null) {
      return taskItems.length;
    } else {
      return Array.from(taskItems).indexOf(afterElement);
    }
  }

  #getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}