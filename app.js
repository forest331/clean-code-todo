const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const taskItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const taskItem = createNewTaskElement(taskInput.value);

  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, toggleTaskStatus);

  taskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;
  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');

  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
};

const toggleTaskStatus = function () {
  const taskItem = this.parentNode;
  if (this.checked) {
    completedList.appendChild(taskItem);
  } else {
    todoList.appendChild(taskItem);
  }
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskItem, statusToggleHandler) {
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkbox.addEventListener('change', statusToggleHandler);
};

const initTaskList = (taskList) => {
  Array.from(taskList.children).forEach((taskItem) => {
    bindTaskEvents(taskItem, toggleTaskStatus);
  });
};

initTaskList(todoList);
initTaskList(completedList);
