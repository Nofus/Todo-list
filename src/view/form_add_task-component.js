import {createElement} from '../framework/render.js';

function createFormAddTaskComponentTemplate() {
  return (
    `<form class="add-task-form">
      <h2>Новая задача</h2>
      <div class="form-row">
        <input type="text" id="new_task" name="new_task" placeholder="Название задачи..." required>
        <input type="submit" value="+ Добавить">
      </div>
    </form>`
  );
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}