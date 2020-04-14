import React, {Fragment} from 'react';
import CompletedTasks from "../components/CompletedTasks";


export const CompletedTask = () => {
    return (
        <Fragment>
            <h1>Список выполненных задач</h1>
            <CompletedTasks />
        </Fragment>
    )
};