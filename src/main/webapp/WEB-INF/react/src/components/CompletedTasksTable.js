import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from "axios";


class CompletedTasksTable extends React.Component {

    constructor(props) {
        super(props);
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

    customConfirm(next, dropRowKeys){
        const dropRowKeysStr = dropRowKeys.join(',');
        if (window.confirm(`Вы уверены, что хотите удалить?`)) {
            // If the confirmation is true, call the function that
            // continues the deletion of the record.
            next();
        }
    }

    tdCustomStyle(cell, row) {   // String example
        if(row.taskStatus === 'Выполнено'){
            return { 'background-color': '#3cc63c' };
        } else return { whiteSpace: 'normal' }
    }

    render() {
        console.log(this.props.data,'для таблицы с задачами');
        const options = {
            afterDeleteRow: this.handleDeletedRow,
            handleConfirmDeleteRow: this.customConfirm,
            noDataText: 'Дождитесь загрузки данных',
            deleteText: 'Удалить'
        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            clickToSelectAndEditCell: true,
            bgColor: '#dee2e6'
        };

        return (
            <div >
                <BootstrapTable
                    hiddenOnInsert
                    hover
                    selectRow={ selectRow }
                    deleteRow
                    data={this.props.data}
                    options={ options }
                    exportCSV
                    csvFileName='tasks-table'>
                    <TableHeaderColumn hidden selectRow={ selectRow }
                                       deleteRow isKey dataField='taskId'>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn deleteRow dataField='taskName' headerAlign='center'>
                        Задание
                    </TableHeaderColumn>
                    <TableHeaderColumn deleteRow dataField='taskStatusDate' headerAlign='center'>
                        Дата выполнения
                    </TableHeaderColumn>
                    <TableHeaderColumn deleteRow dataField='taskManager' headerAlign='center'>
                        Ответственный
                    </TableHeaderColumn>
                    <TableHeaderColumn deleteRow dataField='taskStatus' headerAlign='center' dataAlign='center' tdStyle={ this.tdCustomStyle }>
                        Статус
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default CompletedTasksTable;