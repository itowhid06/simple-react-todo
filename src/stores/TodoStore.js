import {EventEmitter} from 'events';
import {TodoActionTypes} from '../types/TodoActionTypes';
import {TodoDispatcher} from '../dispatchers/TodoDispatcher';

const CHANGE_EVENT = 'change';

let _store = {
    taskList: [],
};

class TodoStoreClass extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getStore() {
        return _store;
    }
}

const TodoStore = new TodoStoreClass();

TodoDispatcher.register((payload) => {
    const action = payload;

    switch (action.type) {
        case TodoActionTypes.CREATE_TODO:
            let task_name = action.todo.task_name;
            _store.taskList.push({id: _store.taskList.length, task_name, taskCompleted: false});
            TodoStore.emitChange();
            break;

        case TodoActionTypes.UPDATE_TODO:
            let updated = action.todo;
            _store.taskList.map(task =>
                task.id === action.index ? {...task, ...updated} : task,
            )
            TodoStore.emitChange();
            break;

        case TodoActionTypes.DELETE_TODO:
            _store.taskList = _store.taskList.filter((item, index) => {
                return index !== action.index;
            });
            TodoStore.emitChange();
            break;

        case TodoActionTypes.CHANGE_STATUS:
            let status = action.status;
            _store.taskList.map(task =>
                task.id === action.index ? task.taskCompleted = status : task,
            )
            TodoStore.emitChange();
            break;

        default:
            return true;
    }
});

export default TodoStore;
