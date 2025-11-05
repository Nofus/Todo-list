import TaskListComponent from '../view/task_list-component.js';
import ClearTrashButtonComponent from '../view/trash_button-component.js';
import TaskBoardComponent from '../view/task_board-component.js';
import LoadingComponent from '../view/loading-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel, UserAction, UpdateType } from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #clearButtonComponent = null;
  #loadingComponent = new LoadingComponent();
  #isLoading = true;

  constructor(boardContainer, tasksModel) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
  }

  async init() {
    this.#renderLoading();
    await this.#tasksModel.init();
    this.#clearBoard();
    this.#renderBoard();
  }
  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  #renderBoard() {
    this.#loadingComponent.removeElement();
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
      status,
      this.#handleTaskDrop.bind(this)
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

  async createTask() {
    const input = document.querySelector('#add_task');
    const taskTitle = input.value.trim();
    
    if (!taskTitle) {
      return;
    }
    
    try {
      await this.#tasksModel.addTask(taskTitle);
      input.value = '';
    } catch (err) {
      console.error('Ошибка при создании задачи:', err);
    }
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #handleModelEvent(event, payload) {
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        if (this.#clearButtonComponent) {
          this.#clearButtonComponent.toggleDisabled(!this.#tasksModel.hasTrashTasks());
        }
        break;
      case UpdateType.INIT:
        break;
    }
  }

  async #handleTaskDrop(taskId, newStatus, insertIndex = null) {
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus, insertIndex);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи:', err);
    }
  }

  async #handleClearTrash() {
    try {
      await this.#tasksModel.clearTrash();
      if (this.#clearButtonComponent) {
        this.#clearButtonComponent.disableButton();
      }
    } catch (err) {
      console.error('Ошибка при очистке корзины:', err);
    }
  }
}