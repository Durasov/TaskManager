import React from 'react'
import TasksTable from "./CompletedTasksTable";


class CompletedTasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

    }

    componentDidMount() {
        this.processUpdate()
    }

    processUpdate() {
        this.getAll().then(r => {
                return r
            }
        )
    }

    getAll = async () => {
        const url = await fetch(`/taskManager/tasks/completed`);
        const data = await url.json();
        console.log(data);
        this.setState({
            data: data,
        })
    };

    render() {
        return (
            <div>
                <TasksTable data={this.state.data} />
            </div>
        )
    }

}

export default CompletedTasks;