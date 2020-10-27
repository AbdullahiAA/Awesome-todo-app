// Array for the todos
var todos = getSavedTodos()


// Add TODO
function addTodo() {
    // Preventing the default submission of the form
    document.getElementById('form').addEventListener('submit', (event) => event.preventDefault())
    
    let todo = document.getElementById('input').value.trim()
    
    if (todo != '') {
        todos.unshift({
            id: Date.now(),
            title: todo,
            isDone: false
        })

        updateTodo()
    }
}


// Update TODO
function updateTodo() {
    let list = document.getElementById('list')
    list.innerHTML = ''

    saveTodos(todos)

    todos.forEach((todo) => {
        let todoItem = document.createElement('li')
        todoItem.className = 'mycheck'
        
        todoItem.innerHTML = `
            <input  type="checkbox" 
                    key=${todo.id} 
                    id="check" 
                    onclick="changeState()"
                    ${(todo.isDone === true) ? 'checked' : ''}
            >
            <label>${todo.title}</label>`
        
        list.appendChild(todoItem)
    })

    // Reseting the InputBox
    document.getElementById('input').value = ''
}


// Remove TODO
function removeTodo() {
    todos = todos.filter((todo) => todo.isDone === false)
    updateTodo()
}


// Change State
function changeState() {
    let checkboxes = document.querySelectorAll('#check')

    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];

        let id = checkbox.getAttribute('key');

        let toChangeTodoState = todos.find((todo) => todo.id == id)

        // Change isDone value when the checkbox is checked/unchecked
        toChangeTodoState.isDone = (checkbox.checked) ? true : false 
    }

    updateTodo()
}

// Save TODOs to the local storage
function saveTodos(todos) {
    let todosInStr = JSON.stringify(todos)
    localStorage.setItem('todos', todosInStr)
}


// Get the stored TODO from the local storage
function getSavedTodos() {
    // Get TODOs from the local storage
    let todos = localStorage.getItem('todos')

    if (todos == null || todos == 'undefined') {
        todos = []
    } else {        
        // Convert it to an array
        todos = JSON.parse(todos)
    }

    // Return it
    return todos
}