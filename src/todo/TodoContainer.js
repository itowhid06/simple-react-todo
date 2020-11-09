import React, {Component} from 'react'
import NewTask from "./NewTask";
import TodoItem from "./TodoItem";

export default class TodoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newTask: "",
            taskList: [],
            editMode: false
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleSave = (task_name) => {
        if (task_name.length === 0) {
            return;
        } else {
            let task_list = this.state.taskList;
            task_list.push({id: this.state.taskList.length, task_name, completed: false});
            this.setState({taskList: task_list});
        }
        this.setState({editMode: false})
    }

    handleDelete = (id) => {
        const tasks = this.state.taskList.filter(task => task.id !== id)
        this.setState({taskList: tasks})
    }

    editTodo = (id, task_name, completed) => {
        const tasks = this.state.taskList.map(task =>
            task.id === id ? {...task, ...{task_name, completed}} : task,
        )
        this.setState({taskList: tasks})
    }

    handleStatus = (id) => {
        const tasks = this.state.taskList.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        )
        this.setState({taskList: tasks})
    }

    render() {
        return (
            <>
                <h2>Dead-Simple To-Do</h2>
                <NewTask onSave={this.handleSave}/>
                <h3> To-Do List </h3>
                <ul className={"todo"}>
                    {this.state.taskList.map((task, index) =>
                        <TodoItem key={task.id} task={task} editMode={this.props.editorMode} editTodo={this.editTodo}
                                  handleDelete={this.handleDelete} handleStatus={this.handleStatus}
                                  onSave={this.handleSave}/>
                    )}
                </ul>
                <p> Total To-Dos {this.state.taskList.length} </p>
                <p>Complete To-Dos {this.state.taskList.filter(task => task.completed === true).length} </p>
                <p>Incomplete To-Dos {this.state.taskList.filter(task => task.completed !== true).length} </p>
            </>
        )
    }
}
