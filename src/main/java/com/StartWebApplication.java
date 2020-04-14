package com;

import com.dao.TaskDAO;
import com.dao.impl.TaskDAOimpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class StartWebApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(StartWebApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(StartWebApplication.class, args);
        //TaskDAO teamDAO = new TaskDAOimpl();
        //teamDAO.insertTask("Добавление новой метрики2", "Создана");
    }

}
