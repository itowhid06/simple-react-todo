import React, {Component} from 'react';
import {TodoActions} from '../actions/TodoActions.js';
import Glyphicon from '@strongdm/glyphicon';

export default class NewTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task_name: this.props.task_name || '',
            taskCompleted: false,
            completed: false
        }

        this._create = this._create.bind(this);
        this._change = this._change.bind(this);
    }

    _create = (event) => {
        event.preventDefault();
        TodoActions.createTodo(this.state);
        this.setState({task_name: ''});
    }

    _change = (event) => {
        event.preventDefault();
        this.setState({task_name: event.target.value.trim()});
    }

    render() {
        return (
            <>
                <div className={"header"}>
                    <input className={"new-task"}
                           type="text"
                           placeholder={this.props.placeholder}
                           value={this.state.task_name}
                           onChange={this._change}
                    />
                    <Glyphicon glyph='plus' onClick={this._create}/>
                </div>
            </>
        )
    }
}
