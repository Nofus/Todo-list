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

  updateTaskStatus(taskId, newStatus, insertIndex = null) {
    const task = this.#boardTasks.find(task => task.id === taskId);
    if (task) {
      this.#boardTasks = this.#boardTasks.filter(t => t.id !== taskId);
      
      if (insertIndex !== null) {
        const tasksInNewStatus = this.#boardTasks.filter(t => t.status === newStatus);
        const otherTasks = this.#boardTasks.filter(t => t.status !== newStatus);
        
        task.status = newStatus;
        tasksInNewStatus.splice(insertIndex, 0, task);
        
        this.#boardTasks = [...otherTasks, ...tasksInNewStatus];
      } else {
        task.status = newStatus;
        this.#boardTasks.push(task);
      }
      
      this._notifyObservers();
    }
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