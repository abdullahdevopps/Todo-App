let todoform = document.querySelector(".todo-input-form")
let todoInput = document.querySelector(".todo-input")
let todoUL = document.querySelector(".list-container")
let todos = getTodoLocal()
updateTodo()
todoform.addEventListener("submit",(e) => { 
    e.preventDefault()
    let todoText = todoInput.value.trim()
    if(todoText.length > 0){
        let todosObj = {
            text:todoText,
            completed:false
        }
        console.log(todoText);
        // CREATE TOODS
        todos.push(todosObj)
        updateTodo()
        
    }
    todoInput.value = ""
    
    
})
function updateTodo(){
    todoUL.innerHTML = ""
    todos.forEach((todo,todoidx) => { 
    let todoItem;
    todoItem = createTodo(todo,todoidx);
    todoUL.append(todoItem)
     })
     saveTodoLocal()
}
function deletesTodo(todoidx){
    todos = todos.filter((_,i) => {  return todoidx !== i; })
    updateTodo()
}

function createTodo(todo,todoidx){
    let li = document.createElement("li")
    let obj = todo.text;
    li.classList.add("list-item");
    li.innerHTML = `<input type="checkbox" id="checkbox-${todoidx}" class="checkbox">
                <label for="checkbox-${todoidx}" class="custom-checkbox">
                    <i class="fa-solid fa-check"></i>
                </label>  
                <label for="checkbox-${todoidx}" class="item-text">${obj}</label>
                <button class="delete">
                    <i class="fa-solid fa-trash"></i>
                </button>`

    const deleted = li.querySelector(".delete");
    const checkbox = li.querySelector(".checkbox")
    deleted.addEventListener("click",() => {
        deletesTodo(todoidx)
     })
     checkbox.addEventListener("change",(tick) => {
    //    console.log(  todos[todoidx].completed = tick.target.checked);
   todo.completed  = checkbox.checked;
   saveTodoLocal()
        
       
        
        
      })
      checkbox.checked = todo.completed;
    return li;
}

function saveTodoLocal(){
     let todoSave= JSON.stringify(todos)
    localStorage.setItem("todos",todoSave)
}
function getTodoLocal(){
let getTodo = localStorage.getItem("todos")|| []
 return JSON.parse(getTodo)

    
}