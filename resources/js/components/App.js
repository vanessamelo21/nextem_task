import React, {Component} from "react";
import {Link} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            tasks: [],
            description: '',
            errors: []
        };
        // bind
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.renderTasks = this
            .renderTasks
            .bind(this);
        this.handleDelete = this
            .handleDelete
            .bind(this);
    }
    // handle change
    handleChange(e) {
        this.setState({title: e.target.value});
    }
    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/tasks", {title: this.state.title})
            .then(response => {
                this.setState({
                    tasks: [
                        response.data, ...this.state.tasks
                    ],
                    title: ""
                });
            });
    }
    // render tasks
    renderTasks() {
        return this
            .state
            .tasks
            .map(task => (
                <div key={task.id} className="media">
                    <div className="media-body">
                        <div>
                            {task.name}{" "}
                            <span className="text-muted">
                                <br/>
                                |{" "}
                                {
                                    task
                                        .updated_at
                                        .split(" ")
                                        .slice(1)
                                        .join(" ")
                                }
                            </span>
                            <Link to={`/${task.id}/edit`} className="btn btn-sm btn-success float-right">
                                Atualizar
                            </Link>
                            <button
                                onClick={() => this.handleDelete(task.id)}
                                className="btn btn-sm btn-warning float-right">
                                Deletar
                            </button>
                        </div>
                        <hr/>
                    </div>
                </div>
            ));
    }
    // push tasks backlog
    getTasks() {
        axios
            .get("/tasks")
            .then(response => this.setState({
                tasks: [...response.data.tasks]
            }));
    }

    handleDelete(id) {
        // delete from local
        const isNotId = task => task.id !== id;
        const updatedTasks = this
            .state
            .tasks
            .filter(isNotId);
        this.setState({tasks: updatedTasks});
        //request backend delete
        axios.delete(`/tasks/${id}`);
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Criar tarefa</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            ref="title"
                                            type="text"
                                            size="30"
                                            onChange={this.handleChange}
                                            value={this.state.title}/>
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.description}
                                            className="form-control"
                                            rows="4"
                                            maxLength="255"
                                            required="required"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Criar tarefa
                                    </button>
                                </form>
                                <hr/> {this.renderTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
