import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { iniTodos, valConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

const newItem = new Section({
  items: iniTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});

newItem.renderItems();

const addNewTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);

    addNewTodoPopup.close();

    todoCounter.updateTotal(true);

    // resets the form after it being submitted.
    newTodoVal.resetValidation();
  },
});

const todoCounter = new TodoCounter(iniTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

function renderTodo(todoData) {
  const todo = generateTodo(todoData);
  newItem.addItem(todo);
}

addNewTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addNewTodoPopup.open();
});

const newTodoVal = new FormValidator(valConfig, addTodoForm);
newTodoVal.enableValidation();
