import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form_add_task-component.js';
import TaskBoardComponent from './view/task_board-component.js';
import TaskListComponent from './view/task_list-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('body');
const mainContainer = document.querySelector('main');

//заголовок
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

//форма
render(new FormAddTaskComponent(), mainContainer, RenderPosition.AFTERBEGIN);

//доска задач
const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, mainContainer);

//список задач
const taskContainer = taskBoardComponent.getElement();

//4 списка задач
for (let i = 0; i < 4; i++) {
  const taskListComponent = new TaskListComponent();
  render(taskListComponent, taskContainer);
}
