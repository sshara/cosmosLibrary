package com.zanahoria.firstProject.data.repository;

import com.zanahoria.firstProject.data.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {

    @Query(value = "FROM User WHERE username = :username AND password = :password")
    Optional<User> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    @Query(value = "FROM User WHERE username = :username OR email = :email")
    Iterable<User> findByUsernameOrEmail(@Param("username") String username, @Param("email") String email);

    //@Query(value = "SELECT * FROM users WHERE email = :email", nativeQuery = true)
    Optional<User> findByEmail(@Param("email") String email);

    //@Query(value = "SELECT * FROM users WHERE id = :id", nativeQuery = true)
    //Optional<User> findById(@Param("id") Long id);

    //@Query(value = "SELECT * FROM users", nativeQuery = true)
    //Iterable<User> findAll();

    @Modifying
    @Query(value = "INSERT INTO users (email, password, role_fk, status_fk, username) VALUES (:email, :password, :role_fk, :status_fk, :username)", nativeQuery = true)
    Integer insertUser(@Param("email") String email, @Param("password") String password, @Param("role_fk") Long role_fk, @Param("status_fk") Long status_fk, @Param("username") String username);
}
