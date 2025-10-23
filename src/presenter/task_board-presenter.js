import TaskListComponent from '../view/task_list-component.js';
import ClearTrashButtonComponent from '../view/trash_button-component.js';
import TaskBoardComponent from '../view/task_board-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #clearButtonComponent = null;

  constructor(boardContainer, tasksModel) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#renderTasks();
  }

  #renderTasks() {
    Object.values(Status).forEach((status) => {
      this.#renderTasksList(status);
    });
  }

  #renderTasksList(status) {
  const statusLabel = StatusLabel[status];
  const tasksForStatus = this.#tasksModel.tasks.filter(task => task.status === status);
  
  const tasksListComponent = new TaskListComponent(
    statusLabel,
    tasksForStatus,
    status
  );
  
  render(tasksListComponent, this.#tasksBoardComponent.element);

  if (status === Status.TRASH) { 
    this.#renderClearButton(tasksListComponent.element, tasksForStatus.length);
  }
  }

  #renderClearButton(container, tasksCount) {
    this.#clearButtonComponent = new ClearTrashButtonComponent({ 
      onClick: this.#handleClearTrash.bind(this) 
    });
    
    if (tasksCount === 0) {
      this.#clearButtonComponent.disableButton();
    }
    
    render(this.#clearButtonComponent, container);
  }

  createTask() {
  const input = document.querySelector('#add_task');
  const taskTitle = input.value.trim();
  
  if (!taskTitle) {
    return;
  }
  
  this.#tasksModel.addTask(taskTitle);
  input.value = '';
}

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #handleModelChange() {
  this.#clearBoard();
  this.#renderBoard();
  }

  #handleClearTrash() {
    this.#tasksModel.clearTrash();
    if (this.#clearButtonComponent) {
      this.#clearButtonComponent.disableButton();
    }

  }
}