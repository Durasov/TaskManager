import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Tasks from "./Tasks";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from "axios";


class TasksTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.rerender = this.rerender.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        //this.service = new Tasks();
    }

    componentDidMount() {
        this.processUpdate()
        console.log('Component did mount');
    }

    componentWillMount() {
        console.log('Component will mount');
    }

    componentDidUpdate() {
        console.log('Component did update');
    }

    componentWillUpdate() {
        console.log('Component will update');
    }

    componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps............ from edit');
    }

    processUpdate() {
        console.log('Вызван метод processUpdate');
        this.getAll().then(r => {
                return r
            }
        )
    }

    getAll = async () => {
        const url = await fetch(`/taskManager/tasks`);
        const data = await url.json();
        console.log(data);
        this.setState({
            data: data,
        })
    };

    rerender(){
        this.forceUpdate();
    }

    handleDeletedRow(rowKeys) {
        console.log('удаляемые данные: ', rowKeys);
        console.log('Размер массива rowKeys: ', rowKeys.length);
            return axios
            .get(`/taskManager/tasks/delete?taskId=${rowKeys}`, {"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"})
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleRefresh(e){
        this.setState({});
    }

    handleInsertedRow(row) {
        return axios
            .get(`/taskManager/tasks/create?taskId=${row.taskId}&taskName=${row.taskName}&taskManager=${row.taskManager}&taskStatus=${row.taskStatus}`,{"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"})
            .then(response => {
                console.log(response)
                //console.log("taskCreateDate: " + row.taskCreateDate);
                //window.location.reload();
                this.handleRefresh.bind(this);
                row.taskCreateDate = new Date().toLocaleDateString();
            })
            .catch(error => {
                console.log(error);
            });
    }

    customConfirm(next, dropRowKeys){
        const dropRowKeysStr = dropRowKeys.join(',');
        if (window.confirm(`Вы уверены, что хотите удалить?`)) {
            // If the confirmation is true, call the function that
            // continues the deletion of the record.
            next();
        }
    }

    beforeSaveCell(row, cellName, cellValue) {
        row[cellName] = cellValue;
        return axios
            .get(`/taskManager/tasks/update?taskId=${row.taskId}&taskName=${row.taskName}&taskManager=${row.taskManager}&taskStatus=${row.taskStatus}`,{"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"})
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }

    tdCustomStyle(cell, row) {   // String example
        //console.log("Статус: " + row.taskStatus);
        if(row.taskStatus === 'Выполнено'){
            return { 'background-color': '#3cc63c' };
        }
        if(row.taskStatus === 'В работе'){
            return { 'background-color': '#efef2f' };
        }else return { whiteSpace: 'normal' }
    }

    render() {
        console.log(this.state.data,'для таблицы с задачами');
        const options = {
            afterDeleteRow: this.handleDeletedRow,
            afterInsertRow: this.handleInsertedRow,
            handleConfirmDeleteRow: this.customConfirm,
            noDataText: 'Дождитесь загрузки данных',
            insertText: 'Добавить задание',
            deleteText: 'Удалить задание',
            saveText: 'Сохранить'
        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            clickToSelectAndEditCell: true,
            bgColor: '#dee2e6'
        };

        const cellEdit = {
            mode: 'dbclick', // click cell to edit
            blurToSave: true,
            beforeSaveCell: this.beforeSaveCell,
        };
//hiddenOnInsert
        return (
            <div >
                <BootstrapTable
                    hiddenOnInsert
                    hover
                    cellEdit={ cellEdit }
                    selectRow={ selectRow }
                    deleteRow
                    data={this.state.data}
                    options={ options }
                    insertRow
                    exportCSV
                    csvFileName='tasks-table'>
                    <TableHeaderColumn hidden selectRow={ selectRow } hiddenOnInsert autoValue
                                       deleteRow isKey dataField='taskId'>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn deleteRow dataField='taskName' headerAlign='center'>
                        Задание
                    </TableHeaderColumn>
                    <TableHeaderColumn deleteRow dataField='taskCreateDate' headerAlign='center' hiddenOnInsert>
                        Дата создания задания
                    </TableHeaderColumn>
                    <TableHeaderColumn deleteRow dataField='taskManager' headerAlign='center'>
                        Ответственный
                    </TableHeaderColumn>
                    <TableHeaderColumn deleteRow dataField='taskStatus' headerAlign='center' dataAlign='center' tdStyle={ this.tdCustomStyle } hiddenOnInsert>
                        Статус
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default TasksTable;