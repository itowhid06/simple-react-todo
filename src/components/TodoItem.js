import React, {Component} from 'react';
import Glyphicon from '@strongdm/glyphicon';
import {TodoActions} from '../actions/TodoActions';

export default class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task_name: this.props.task.task_name || '',
            taskCompleted: null,
            editMode: this.props.editMode || false,
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this._update = this._update.bind(this);
        this._change = this._change.bind(this);
        this._delete = this._delete.bind(this);
    }

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({editMode: !this.state.editMode});
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({task_name: event.target.value.trim()});
        TodoActions.updateTodo(this.props.index, this.state);
    }

    _update = (event) => {
        event.preventDefault();
        TodoActions.updateTodo(this.props.index, this.state);
        this.setState({editMode: !this.state.editMode});
    }

    _change = (event) => {
        event.preventDefault();
        let status = !this.state.taskCompleted;
        this.setState({taskCompleted: status});
        TodoActions.changeStatus(this.props.index, status);
        this.props.onChange();
    }

    _delete = (event) => {
        event.preventDefault();
        TodoActions.deleteTodo(this.props.index);
    }

    render() {
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
                    <Glyphicon glyph='floppy-save' onClick={this._update}/>
                </div>
            )
        } else {
            element = (
                <div className={"view"}>
                    <input
                        className={class_names}
                        type="text"
                        value={this.state.task_name}
                        disabled={true}
                        onChange={this.handleChange}
                    />
                    <Glyphicon glyph='check' onClick={this._change}/>
                    <Glyphicon glyph='edit' onClick={this.handleEdit}/>
                    <Glyphicon glyph='remove' onClick={this._delete}/>
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
