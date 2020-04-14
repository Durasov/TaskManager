package com.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@SequenceGenerator(name = "seqPK", sequenceName = "seqPK")
@Entity
@Table(name = "task")
public class Task implements Serializable{

    @Id
    @GeneratedValue(generator = "seqPK")
    @Column(name = "task_id", nullable = false)
    private int task_id ;

    @Basic
    @Column(name = "task_name", length = 150)
    private String task_name;

    @Basic
    @Column(name = "task_manager", length = 50)
    private String task_manager;

    @Basic
    @Column(name = "task_createDate")
    private Date task_createDate;

    @Basic
    @Column(name = "task_statusDate")
    private Date task_statusDate;

    @Basic
    @Column(name = "task_status", length = 20)
    private String task_status;

    public Task() {
    }

    public Task(int task_id, String task_name, Date task_createDate, Date task_statusDate, String task_status) {
        this.task_id  = task_id ;
        this.task_name = task_name;
        this.task_createDate = task_createDate;
        this.task_statusDate = task_statusDate;
        this.task_status = task_status;
    }

    public Task(String task_name, Date task_createDate, Date task_statusDate, String task_status) {
        this.task_name = task_name;
        this.task_createDate = task_createDate;
        this.task_statusDate = task_statusDate;
        this.task_status = task_status;
    }

    public Task(String task_name, String task_manager, String task_status, Date task_createDate) {
        this.task_name = task_name;
        this.task_manager = task_manager;
        this.task_status = task_status;
        this.task_createDate = task_createDate;
    }

    public Task(String task_name, String task_manager, String task_status) {
        this.task_name = task_name;
        this.task_manager = task_manager;
        this.task_status = task_status;
    }

    public Task(int task_id, String task_name, String task_manager, String task_status) {
        this.task_id  = task_id ;
        this.task_name = task_name;
        this.task_manager = task_manager;
        this.task_status = task_status;
    }

    public int getTaskId() {
        return task_id ;
    }

    public void setTaskId(int task_id) {
        this.task_id  = task_id ;
    }

    public String getTaskName() {
        return task_name;
    }

    public void setTaskName(String task_name) {
        this.task_name = task_name;
    }

    public String getTaskManager() {
        return task_manager;
    }

    public void setTaskManager(String task_manager) {
        this.task_manager = task_manager;
    }

    public Date getTaskCreateDate() {
        return task_createDate;
    }

    public void setTaskCreateDate(Date task_createDate) {
        this.task_createDate = task_createDate;
    }

    public Date getTaskStatusDate() {
        return task_statusDate;
    }

    public void setTaskStatusDate(Date task_statusDate) {
        this.task_statusDate = task_statusDate;
    }

    public String getTaskStatus() {
        return task_status;
    }

    public void setTaskStatus(String task_status) {
        this.task_status = task_status;
    }

}
