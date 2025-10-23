import TaskListComponent from '../view/task_list-component.js';
import TrashButtonComponent from '../view/trash_button-component.js';
import TaskBoardComponent from '../view/task_board-component.js';
import {render} from '../framework/render.js';
import {Status, StatusLabel} from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];

  constructor(boardContainer, tasksModel) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
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
    const tasksForStatus = this.#boardTasks.filter(task => task.status === status);
    
    const tasksListComponent = new TaskListComponent(
      statusLabel,
      tasksForStatus,
      status
    );
    
    render(tasksListComponent, this.#tasksBoardComponent.element);

    if (status === Status.TRASH) { 
      this.#renderClearButton(tasksListComponent.element);
    }
  }

  #renderClearButton(container) {
    const clearButtonComponent = new TrashButtonComponent();
    render(clearButtonComponent, container);
  }
}