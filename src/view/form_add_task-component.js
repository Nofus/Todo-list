import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return (
    `<form class="add-task-form">
      <h2>Новая задача</h2>
      <div class="form-row">
        <input type="text" id="add_task" name="add_task" placeholder="Название задачи..." required>
        <input type="submit" value="+ Добавить">
      </div>
    </form>`
  );
}

export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}