export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const GET_ALL_TASKS = "GET_ALL_TASKS";

export const FETCH_ToDos_BEGIN   = 'FETCH_ToDos_BEGIN';
export const FETCH_ToDos_SUCCESS = 'FETCH_ToDos_SUCCESS';
export const FETCH_ToDos_FAILURE = 'FETCH_ToDos_FAILURE';

const initialState = {
    todos: [],
    loading:false,
    error:null
};

export default function todo_reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ToDos_BEGIN:
            return{
                ...state,
                loading:true,
                error:null
            };
        case FETCH_ToDos_SUCCESS:
            return{
                ...state,
                loading:false,
                todos:action.payload.todos                
            };

        case FETCH_ToDos_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload.error,
                todos:[]
            }
        default:
            return state;
    }
}

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo,
    };
}

export function deleteTodo(todo) {
    return {
        type: DELETE_TODO,
        todo,
    }
}

export function updateTodo(todo) {
    return {
        type: UPDATE_TODO,
        todo,
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
    payload:  {todos} 
  });
  
  export const fetchToDosFailure = error => ({
    type: FETCH_ToDos_FAILURE,
    payload: { error }
  });




export function fetchToDos(){
    return dispatch => {
        dispatch(fetchToDosBegin());
        return fetch("http://10.211.55.5:44335/API/todo")
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchToDosSuccess(json));
            alert(json[0].id)
            return json;
        })
        .catch(error => dispatch(fetchToDosFailure(error)));
    };
}

function handleErrors(response) {
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}