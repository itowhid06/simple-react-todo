import {TodoDispatcher} from '../dispatchers/TodoDispatcher';
import {TodoActionTypes} from '../types/TodoActionTypes';

export const TodoActions = {
    createTodo(todo) {
        TodoDispatcher.dispatch({
            type: TodoActionTypes.CREATE_TODO,
            todo
        });
    },

    updateTodo(index, todo) {
        TodoDispatcher.dispatch({
            type: TodoActionTypes.UPDATE_TODO,
            index,
            todo
        });
    },

    deleteTodo(index) {
        TodoDispatcher.dispatch({
            type: TodoActionTypes.DELETE_TODO,
            index
        });
    },

    changeStatus(index, status) {
        TodoDispatcher.dispatch({
            type: TodoActionTypes.CHANGE_STATUS,
            index,
            status
        });
    },
};