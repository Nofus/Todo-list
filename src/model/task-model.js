import Observable from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class TaskModel extends Observable {
  #tasksApiService = null;
  #boardTasks = [];

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardTasks;
  }

  getTasksByStatus(status) {
    return this.#boardTasks.filter(task => task.status === status);
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardTasks = tasks;
    } catch(err) {
      this.#boardTasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID(),
    };

    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardTasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus, insertIndex = null) {
    const task = this.#boardTasks.find(task => task.id === taskId);
    if (task) {
      const previousStatus = task.status;
      
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

      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        console.error('Ошибка при обновлении статуса задачи на сервер:', err);
        task.status = previousStatus;
        throw err;
      }
    }
  }

  async clearTrash() {
    const trashTasks = this.#boardTasks.filter(task => task.status === 'trash');
    
    try {
      await Promise.all(trashTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
      this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
      this._notify(UserAction.DELETE_TASK, { status: 'trash' });
    } catch (err) {
      console.error('Ошибка при удалении задач из корзины на сервере:', err);
      throw err;
    }
  }

  hasTrashTasks() {
    return this.#boardTasks.some(task => task.status === 'trash');
  }
}