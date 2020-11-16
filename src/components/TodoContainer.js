import React, {Component} from 'react'
import TodoStore from '../stores/TodoStore'
import NewTask from './NewTask';
import TodoItem from './TodoItem';

export default class TodoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = TodoStore.getStore();

        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        TodoStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        TodoStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(TodoStore.getStore());
    }

    render() {
        return (
            <>
                <h2>Dead-Simple To-Do</h2>
                <NewTask onSave={this.handleSave}/>
                <h3>To-Do List</h3>
                <ul className={"todo"}>
                    {this.state.taskList.map((task, index) =>
                        <TodoItem key={task.id} index={index || 0} task={task} placeholder="Add new todo..."
                                  onChange={this._onChange}/>
                    )}
                </ul>
                <p>Total To-Dos {this.state.taskList.length}</p>
                <p>Complete To-Dos {this.state.taskList.filter(task => task.taskCompleted === true).length}</p>
                <p>Incomplete To-Dos {this.state.taskList.filter(task => task.taskCompleted === false).length}</p>
            </>
        )
    }
}
