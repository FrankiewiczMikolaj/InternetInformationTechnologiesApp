package com.example.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.util.Calendar.MARCH;

@Service
public class StudentService {

    final private StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }


    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new IllegalStateException("Student with id " + studentId + " does not exists"));
        return  student;
    }

    public void addNewStudent(Student student) {
        Optional<Student> studentOptional = studentRepository
                .findStudentByEmail(student.getEmail());

        if(studentOptional.isPresent())
        {
            throw new IllegalStateException("Email taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        boolean exists = studentRepository.existsById(studentId);
        if(!exists)
        {
            throw new IllegalStateException("student with id " + studentId + " does not exists");
        }
        studentRepository.deleteById(studentId);
    }

    @Transactional
    public void updateStudent(Long studentId, String name, String email) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalStateException(
                        + studentId + " does not exists"));
        if(name != null && name.length() > 0 && !Objects.equals(student.getName(), name))
        {
            student.setName(name);
        }

        if(email != null && email.length() > 0 && !Objects.equals(student.getEmail(), email))
        {
            Optional<Student> studentOptional = studentRepository.findStudentByEmail(email);
            if(studentOptional.isPresent())
            {
                throw new IllegalStateException("Email taken");
            }
            student.setEmail(email);
        }
    }

    @Transactional
    public void updateStudent(Long studentId, Student student) {
        Student dbStudent = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalStateException(
                        + studentId + " does not exists"));

        dbStudent.setName(student.getName());
        dbStudent.setEmail(student.getEmail());
        dbStudent.setDob(student.getDob());
    }
}
