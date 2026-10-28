package com.example.didemo;

import com.example.didemo.model.Student;
import com.example.didemo.service.GreetingService;
import com.example.didemo.service.ReportService;
import com.example.didemo.service.StudentService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

    private final StudentService studentService;
    private final ReportService reportService;

    public DemoApplication(StudentService studentService, ReportService reportService) {
        this.studentService = studentService;
        this.reportService = reportService;
    }

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(DemoApplication.class, args);
        GreetingService greeting = context.getBean(GreetingService.class);
        greeting.greet();
    }

    @Override
    public void run(String... args) {
        Student student = new Student("Ram", "ram@example.com");
        studentService.register(student);
        System.out.println("Students in memory: " + reportService.count());
    }
}
