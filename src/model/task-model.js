import { tasks } from '../mock/task.js';
import { generateID } from '../utils.js';

export default class TaskModel {
  #boardTasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardTasks;
  }

  getTasksByStatus(status) {
    return this.#boardTasks.filter(task => task.status === status);
  }

  addTask(title) {
  const newTask = {
    title,
    status: 'backlog',
    id: generateID(),
  };
  this.#boardTasks.push(newTask);
  this._notifyObservers();
  return newTask;
  }

  clearTrash() {
  this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
  this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}