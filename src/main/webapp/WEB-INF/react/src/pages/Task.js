import React, {Fragment} from 'react';
import Tasks from "../components/Tasks";
import TasksTable from "../components/TasksTable";


export const Task = () => {
    return (
        <Fragment>
            <h1>Список всех задач</h1>
            <TasksTable />
        </Fragment>
    )
};