package com.dao;

import com.entity.Task;

import java.util.List;

public interface TaskDAO {

    public void insertTask(Task task);

    public void deleteTask(int task_id);

    public void updateTask(Task task);

    public List<Task> getActualTasks();

    public List<Task> getCompletedTasks();
}
