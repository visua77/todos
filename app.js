//Selectors

const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todos')
const modalCont = document.querySelector('.modal-cont')

//Funcs

const addTodo = (event) => {
    event.preventDefault()
        //Div
    if (todoInput.value != '') {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
            //Li
        const newTodo = document.createElement('li')
        newTodo.innerText = todoInput.value
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
            //Set localstorage
        saveLocalTodos(todoInput.value)
            //Completed button
        const completeBtn = document.createElement('button')
        completeBtn.innerHTML = '<i class="fas fa-check"></i>'
        completeBtn.classList.add('complete-btn')
        todoDiv.appendChild(completeBtn)
            //Trash button
        const trashBtn = document.createElement('button')
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
        trashBtn.classList.add('trash-btn')
        todoDiv.appendChild(trashBtn)
            //Append to list
        todoList.appendChild(todoDiv)
            //Clear input
        todoInput.value = ''
    }
    /* else if (todoInput.value === '') {
           const modal = document.createElement('div')
           modal.classList.add('modal')
           modal.innerText = 'Input cant be empty'
           modalCont.appendChild(modal)
           modal.parentElement.classList.add('fall')
           modal.parentElement.addEventListener('transitionend', () => {
               modal.parentElement.remove()
           })

       } */

}

const deleteCheck = (event) => {
    const item = event.target
        //Delete todo
    if (item.classList[0] === 'trash-btn') {
        //Ani
        item.parentElement.classList.add('fall')

        item.parentElement.addEventListener('transitionend', () => {
            item.parentElement.remove()
        })
    }

    if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('completed')
    }
}


const filterTodos = (event => {
    const todos = todoList.childNodes
    todos.forEach((todo) => {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    })
})

const saveLocalTodos = (todo) => {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}


const getTodos = () => {
    console.log('hello')
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }


    todos.forEach((todo) => {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
            //Li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
            //Completed button
        const completeBtn = document.createElement('button')
        completeBtn.innerHTML = '<i class="fas fa-check"></i>'
        completeBtn.classList.add('complete-btn')
        todoDiv.appendChild(completeBtn)
            //Trash button
        const trashBtn = document.createElement('button')
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
        trashBtn.classList.add('trash-btn')
        todoDiv.appendChild(trashBtn)
            //Append to list
        todoList.appendChild(todoDiv)
    })

}


//Events

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('change', filterTodos)