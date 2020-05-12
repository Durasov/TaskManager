package com.controller;

import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.LockedException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
//@RestController
public class WelcomeController {

    // inject via application.properties
    @Value("${welcome.message:test}")
    private String message = "Hello World";

    //@RequestMapping("/taskManager")
    //@RequestMapping(path = "/taskManager", method = RequestMethod.GET)
    //@ResponseBody
    @GetMapping("/taskManager")
    public String welcome(Map<String, Object> model) {
        model.put("message", this.message);
        return "index";
    }

    //@RequestMapping("/tasks")
    //@RequestMapping(path = "/tasks", method = RequestMethod.GET)
    @GetMapping("/tasks")
    public String redirect1(Map<String, Object> model) {
        model.put("message", this.message);
        return "index";
    }

    //@RequestMapping("/completedTasks")
    @GetMapping("/completedTasks")
    public String redirect2(Map<String, Object> model) {
        model.put("message", this.message);
        return "index";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login(@RequestParam(value = "error", required = false) String error,
                              @RequestParam(value = "logout", required = false) String logout, HttpServletRequest request) {

        ModelAndView model = new ModelAndView();
        if (error != null) {
            //model.addObject("error", getErrorMessage(request, "SPRING_SECURITY_LAST_EXCEPTION"));
        }

        if (logout != null) {
            model.addObject("msg", "You've been logged out successfully.");
        }
        model.setViewName("login");
        return model;
    }

    // customize the error message
/*    private String getErrorMessage(HttpServletRequest request, String key) {

        Exception exception = (Exception) request.getSession().getAttribute(key);

        String error = "";
        if (exception instanceof BadCredentialsException) {
            error = "Invalid username or password!";
        } else if (exception instanceof LockedException) {
            error = exception.getMessage();
        } else {
            error = "Invalid username or password!";
        }
        return error;
    }*/
}
