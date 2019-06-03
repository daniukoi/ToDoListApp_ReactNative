export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const GET_ALL_TASKS = "GET_ALL_TASKS";

export const FETCH_ToDos_BEGIN = 'FETCH_ToDos_BEGIN';
export const FETCH_ToDos_SUCCESS = 'FETCH_ToDos_SUCCESS';
export const FETCH_ToDos_FAILURE = 'FETCH_ToDos_FAILURE';

const initialState = {
    todos: [],
    loading: false,
    error: null
};

export default function todo_reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ToDos_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_ToDos_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: [...action.payload.todos]
            };

        case FETCH_ToDos_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                todos: []
            };
        case DELETE_TODO:
            return {
                todos: state.todos.filter(function (todo) {
                    return todo.task != action.payload.todo.task;
                })
            };
        case UPDATE_TODO:
            let todos = [...state.todos];
            let indexOfUpdate = todos.findIndex((todo) => {
                return todo.id == action.payload.todo.id;
            });
            todos[indexOfUpdate].completed = !action.payload.todo.completed;
            return {
                ...state,
                todos: [...todos],
            }
        default:
            return state;
    }
}

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: {todo},
    };
}

export function deleteTodo(todo) {
    return {
        type: DELETE_TODO,
        payload: { todo }
    }
}

export function updateTodo(todo) {
    return {
        type: UPDATE_TODO,
        payload:{todo},
    }
}

export const getAll = () => ({
    type: GET_ALL_TASKS
})


export const fetchToDosBegin = () => ({
    type: FETCH_ToDos_BEGIN
});

export const fetchToDosSuccess = (todos) => ({
    type: FETCH_ToDos_SUCCESS,
    payload: { todos }
});

export const fetchToDosFailure = error => ({
    type: FETCH_ToDos_FAILURE,
    payload: { error }
});




export function fetchToDos() {
    return dispatch => {
        dispatch(fetchToDosBegin());
        return fetch("http://10.211.55.5:44335/API/todo")
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchToDosSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchToDosFailure(error)));
    };
}

export function deleteTask(todo) {
    let todoBase = {completed:todo.completed, task:todo.task}
    alert(todoBase.completed);
    return dispatch => {
        return fetch("http://10.211.55.5:44335/api/todo/Delete?Completed="+todo.completed+"&Task="+todo.task+"&Id="+todo.id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(() => dispatch(deleteTodo(todo)))
    }
}

export function updateTask(todo) {
    return dispatch => {
        return fetch("http://10.211.55.5:44335/API/todo/UpdateToDoItem", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })
            .then(() => dispatch(updateTodo(todo)))
    }
}

export function AddTask(todo){
    return dispatch => {
        return fetch("http://10.211.55.5:44335/api/todo/AddToDoItem?Completed="+todo.completed+"&Task="+todo.task, {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            }
    })
    .then(()=>dispatch(addTodo(todo)))
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
}
