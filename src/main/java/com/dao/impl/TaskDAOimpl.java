package com.dao.impl;

import com.dao.TaskDAO;
import com.entity.Task;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public class TaskDAOimpl implements TaskDAO{

    private Session createHibernateSession(){
        SessionFactory sessionFactory  = new Configuration().configure().buildSessionFactory();
        return sessionFactory.getCurrentSession();
    }

    public void insertTask(Task task){
        Session session = createHibernateSession();
        Transaction transaction = session.beginTransaction();
        //Task task = new Task(task_name, task_manager, task_status);
        session.save(task);
        transaction.commit();
    }

    public void deleteTask(int task_id){
        Session session = createHibernateSession();
        Transaction transaction = session.beginTransaction();
        Task task = session.load(Task.class,task_id);
        session.delete(task);
        transaction.commit();
    }

    public void updateTask(Task task){
        Session session = createHibernateSession();
        Transaction transaction = session.beginTransaction();
        Task updatedTask = session.load(Task.class,task.getTaskId());
        updatedTask.setTaskName(task.getTaskName());
        updatedTask.setTaskManager(task.getTaskManager());
        updatedTask.setTaskStatus(task.getTaskStatus());
        updatedTask.setTaskStatusDate(task.getTaskStatusDate());
        session.update(updatedTask);
        transaction.commit();
    }

    public List<Task> getActualTasks(){
        Session session = createHibernateSession();
        Transaction transaction = session.beginTransaction();
        List<Task> tasks = session.createQuery("from Task where task_status != 'Выполнено'").list();
        transaction.commit();
        return tasks;
    }

    public List<Task> getCompletedTasks(){
        Session session = createHibernateSession();
        Transaction transaction = session.beginTransaction();
        List<Task> tasks = session.createQuery("from Task where task_status = 'Выполнено'").list();
        transaction.commit();
        return tasks;
    }

}
