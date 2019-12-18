import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            task: [],
            description: ''

        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handle change
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/tasks/${this.props.match.params.id}`, {
                name: this.state.name
            })
            .then(response => {
                this.props.history.push('/');
            });
    }


    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Editar Tarefa</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                         <input ref="title"
                                          type="text" 
                                          size="30" 
                                          onChange={this.handleChange} 
                                          value={this.state.title}
                                          />
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.description}
                                            className="form-control"
                                            rows="3"
                                            maxLength="255"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Editar Tarefa
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTask;
