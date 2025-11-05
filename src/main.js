import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form_add_task-component.js';
import TaskBoardComponent from './view/task_board-component.js';
import TasksBoardPresenter from './presenter/task_board-presenter.js';
import TaskModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';
import { render, RenderPosition } from './framework/render.js';

const END_POINT = 'https://690b8ec66ad3beba00f575d6.mockapi.io';

const tasksApiService = new TasksApiService(END_POINT);
const taskModel = new TaskModel({ tasksApiService });

const bodyContainer = document.querySelector('body');
const mainContainer = document.querySelector('main');

// заголовок
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

// форма
const formAddTaskComponent = new FormAddTaskComponent({ 
  onClick: handleNewTaskButtonClick 
});
render(formAddTaskComponent, mainContainer, RenderPosition.AFTERBEGIN);

// доска задач
const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, mainContainer);

// презентер
const tasksBoardPresenter = new TasksBoardPresenter(
  taskBoardComponent.element,
  taskModel
);

tasksBoardPresenter.init();

async function handleNewTaskButtonClick() {
  await tasksBoardPresenter.createTask();
}