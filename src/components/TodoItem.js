import React, {Component} from 'react';
import Glyphicon from "@strongdm/glyphicon";

export default class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            task_name: this.props.task.task_name || '',
            taskCompleted: false,
            editMode: this.props.editMode || false,
        }
    }

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({editMode: !this.state.editMode});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let task_name = this.state.task_name;
        this.props.editTodo(this.props.task.id, task_name, this.props.task.completed);
        this.setState({editMode: !this.state.editMode});
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.props.handleDelete(this.props.task.id);
    }

    handleStatus = (event) => {
        event.preventDefault();
        this.props.handleStatus(this.props.task.id);
        this.setState({
            taskCompleted: !this.state.taskCompleted
        });
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({task_name: event.target.value.trim()});
    }

    render() {
        const {task} = this.props

        let element;
        let class_names = "incomplete";

        if (this.state.taskCompleted) {
            class_names = "completed";
        }

        if (this.state.editMode) {
            element = (
                <div className={"edit"}>
                    <input
                        className={class_names}
                        type="text"
                        value={this.state.task_name}
                        onChange={this.handleChange}
                    />
                    <Glyphicon glyph='floppy-save' onClick={this.handleSubmit}/>
                </div>
            )
        } else {
            element = (
                <div className={"view"}>
                    <input
                        className={class_names}
                        type="text"
                        value={task.task_name}
                        disabled={true}
                        onChange={this.handleChange}
                    />
                    <Glyphicon glyph='check' onClick={this.handleStatus}/>
                    <Glyphicon glyph='edit' onClick={this.handleEdit}/>
                    <Glyphicon glyph='remove' onClick={this.handleDelete}/>
                </div>
            )
        }

        return (
            <li>
                {element}
            </li>
        )
    }
}
