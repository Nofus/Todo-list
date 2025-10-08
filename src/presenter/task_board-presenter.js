import TaskListComponent from '../view/task_list-component.js';
import TrashButtonComponent from '../view/trash_button-component.js';
import TaskBoardComponent from '../view/task_board-component.js';
import TaskComponent from '../view/task-component.js';
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
    this.#boardTasks = [...this.#tasksModel.getTasks()];
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#renderTasks();
  }

  #renderTasks() {

    for (let i = 0; i < 4; i++) {
      const status = Object.values(Status)[i]; 
      const statusLabel = StatusLabel[status];
      
      const tasksListComponent = new TaskListComponent(
        statusLabel,
        [], 
        status
      );
      
      render(tasksListComponent, this.#tasksBoardComponent.getElement());
      

      for (let j = 0; j < this.#boardTasks.length; j++) {
        const task = this.#boardTasks[j];
        if (task.status === status) {
          const taskComponent = new TaskComponent(task);
          render(taskComponent, tasksListComponent.getElement());
        }
      }


      if (status === Status.TRASH) { 
        const clearButtonComponent = new TrashButtonComponent();
        render(clearButtonComponent, tasksListComponent.getElement());
      }
    }
  }
}
    