package com.example.studentmanagement.service;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private static final Logger logger =
            LoggerFactory.getLogger(StudentService.class);

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudent(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Student not found: {}", id);
                    return new StudentNotFoundException(id);
                });
    }

    public Student createStudent(Student student) {
        student.setId(null);
        Student saved = saveStudent(student);
        logger.info("Student created: {}", saved.getName());
        return saved;
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = getStudent(id);
        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        return saveStudent(existing);
    }

    public void deleteStudent(Long id) {
        Student student = getStudent(id);
        repository.delete(student);
    }

    private Student saveStudent(Student student) {
        try {
            return repository.save(student);
        } catch (RuntimeException ex) {
            logger.error("Unable to save student: {}", student.getName(), ex);
            throw ex;
        }
    }
}
