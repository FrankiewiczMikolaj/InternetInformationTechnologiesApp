package com.example.demo.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface UserRespository extends JpaRepository<AppUser,Long> {
    @Query("SELECT u FROM AppUser u WHERE u.email = ?1")
    Optional<AppUser> findUserByEmail(String email);
    @Query("SELECT u FROM AppUser u WHERE u.username = :username")
    Optional<AppUser> findUserByUsername(String username);
    @Query("SELECT u FROM AppUser u WHERE u.username = ?1 OR u.email = ?2")
    Optional<AppUser> findUserByUsernameAndEmail(String username, String email);
}
