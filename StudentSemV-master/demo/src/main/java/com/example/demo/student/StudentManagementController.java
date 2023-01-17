package com.example.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="management/api/v1/student")
public class StudentManagementController {

    private final StudentService studentService;

    @Autowired
    public StudentManagementController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADMINTRAINEE')")
    public List<Student> getStudents()
    {
        return studentService.getStudents();
    }

    @GetMapping(path = "{studentId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADMINTRAINEE')")
    public Student getStudentById(@PathVariable("studentId") Long studentId) {
        return studentService.getStudentById(studentId);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('student:write')")
    public void registerNewStudent(@RequestBody Student student)
    {
        studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    @PreAuthorize("hasAuthority('student:write')")
    public void deleteStudent(@PathVariable("studentId") Long studentId)
    {
        studentService.deleteStudent(studentId);
    }

    @PutMapping(path = "{studentId}")
    @PreAuthorize("hasAuthority('student:write')")
    public void updateStudent(
            @PathVariable("studentId") Long studentId,
            @RequestBody Student student
    ) {
        studentService.updateStudent(studentId, student);
    }
}
