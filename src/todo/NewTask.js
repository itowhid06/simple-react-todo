import React, {Component} from 'react';
import Glyphicon from '@strongdm/glyphicon';

export default class NewTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task_name: this.props.task_name || '',
            completed: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({task_name: event.target.value.trim()});
    }

    handleSubmit = () => {
        let task_name = this.state.task_name;
        this.props.onSave(task_name);
        this.setState({task_name: ''});
    }

    render() {
        return (
            <>
                <div className={"header"}>
                    <input className={"new-task"}
                           type="text"
                           placeholder={this.props.placeholder}
                           value={this.state.task_name}
                           onChange={this.handleChange}
                    />
                    <Glyphicon glyph='plus' onClick={this.handleSubmit}/>
                </div>
            </>
        )
    }
}
