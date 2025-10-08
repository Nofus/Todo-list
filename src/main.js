import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form_add_task-component.js';
import TaskBoardComponent from './view/task_board-component.js';
import TasksBoardPresenter from './presenter/task_board-presenter.js';
import TaskModel from './model/task-model.js';
import {render, RenderPosition} from './framework/render.js';

const taskModel = new TaskModel();

const bodyContainer = document.querySelector('body');
const mainContainer = document.querySelector('main');

//заголовок
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

//форма
render(new FormAddTaskComponent(), mainContainer, RenderPosition.AFTERBEGIN);

//доска задач
const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, mainContainer);

//презентер
const tasksBoardPresenter = new TasksBoardPresenter(
  taskBoardComponent.getElement(),
  taskModel
);

tasksBoardPresenter.init();