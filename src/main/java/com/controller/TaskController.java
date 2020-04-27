package com.controller;

import com.dao.impl.TaskDAOimpl;
import com.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/taskManager/tasks")
public class TaskController {

    @Autowired
    TaskDAOimpl taskDAOimpl;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public @ResponseBody
    List<Task> getActualTasks() {
        List<Task> tasks = taskDAOimpl.getActualTasks();
        return tasks;
    }

    @RequestMapping(value = "/completed", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public @ResponseBody
    List<Task> getCompletedTasks() {
        List<Task> tasks = taskDAOimpl.getCompletedTasks();
        return tasks;
    }

/*    @RequestMapping(method = RequestMethod.POST)
    public void save(@RequestBody Team item) {
        teamDAOimpl.insertTeam("sadas", "asdas");
    }*/

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    @ResponseBody
    public String create (@RequestParam(value = "taskName") String task_name,
                          @RequestParam(value = "taskManager") String task_manager,
                          @RequestParam(value = "taskStatus") String task_status){
        try {
            LocalDate localDate = LocalDate.now(ZoneId.of("Etc/GMT+4"));
            java.sql.Date task_date = java.sql.Date.valueOf(localDate);

            if(!task_manager.equals("")){
                task_status = "Назначена";
            } else task_status = "Создана";

            Task task = new Task(task_name, task_manager, task_status, task_date);
            taskDAOimpl.insertTask(task);
        } catch (Exception ex) {
            return ex.getMessage();
        }
        return task_name + " succesfully saved!";
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    @ResponseBody
    public String update (@RequestParam(value = "taskId") int task_id,
                          @RequestParam(value = "taskName") String task_name,
                          @RequestParam(value = "taskManager") String task_manager,
                          @RequestParam(value = "taskStatus") String task_status){
        try {
            LocalDate localDate = LocalDate.now(ZoneId.of("Etc/GMT+4"));
            java.sql.Date task_statusDate = java.sql.Date.valueOf(localDate);

            Task task = new Task(task_id, task_name, task_manager, task_status, task_statusDate);
            taskDAOimpl.updateTask(task);
        } catch (Exception ex) {
            return ex.getMessage();
        }
        return task_name + " Succesfully updated!";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/delete")
    @ResponseBody
    public String delete(@RequestParam(value = "taskId") int[] task_id) {
        try {
            for(int i = 0; i < task_id.length; i++){
                taskDAOimpl.deleteTask(task_id[i]);
            }
        } catch (Exception ex) {
            return ex.getMessage();
        }
        return task_id + " Succesfully deleted!";
    }
}
