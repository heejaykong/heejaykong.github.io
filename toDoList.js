const todoForm = document.querySelector('.js-todoForm'),
      todoInput = todoForm.querySelector('input'),
      todoLoadArea = document.querySelector('.js-todoLoadArea');
const LS_KEY_TODOS = 'todos';
let todos = [];
function handleDelBtnClick(e){
  const targetLi = e.target.parentNode;
  const targetId = parseInt(targetLi.id);
  todoLoadArea.removeChild(targetLi);
  todos = todos.filter(function(element){
    return element.id !== targetId;
  });
  localStorage.setItem(LS_KEY_TODOS, JSON.stringify(todos));
}
function paintTodo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("span");
  const span = document.createElement("span");
  const newId = todos.length;
  delBtn.innerText = "✅";
  delBtn.addEventListener('click', handleDelBtnClick)
  delBtn.classList.add("delBtn");
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  todoLoadArea.appendChild(li);
  
  const todoObj = {
    id : newId,
    text : text
  };
  todos.push(todoObj);
  localStorage.setItem(LS_KEY_TODOS, JSON.stringify(todos));
}
function handleTodoSubmit(e){
  e.preventDefault();
  const currentVal = todoInput.value;
  if (currentVal){
    paintTodo(currentVal);
    todoInput.value = '';
    console.log(todos);
  }
}
function loadTodos(){
  const loadedTodos = localStorage.getItem(LS_KEY_TODOS);
  if (loadedTodos){
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(element => {
      paintTodo(element.text);      
    });
  }
}
function init(){
  loadTodos();
  todoForm.addEventListener('submit', handleTodoSubmit);
}
init();