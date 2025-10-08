const Status = {
  BACKLOG: 'backlog',
  PROGRESS: 'progress', 
  DONE: 'done',
  TRASH: 'trash'
};

const StatusLabel = {
  [Status.BACKLOG]: 'Бэклог',
  [Status.PROGRESS]: 'В процессе',
  [Status.DONE]: 'Готово',
  [Status.TRASH]: 'Корзина'
};

export {Status, StatusLabel};