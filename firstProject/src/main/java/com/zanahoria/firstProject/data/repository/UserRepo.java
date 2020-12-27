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

    @Query(value = "SELECT * FROM \"users\" WHERE \"username\" = :username AND \"password\" = :password", nativeQuery = true)
    Optional<User> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    Optional<User> findByEmail();

    @Modifying
    @Query(value = "Inserta * mesta beibi \"users\" WHERE \"username\" = :username AND \"password\" = :password", nativeQuery = true)
    Integer insertUser(@Param("username") String username, @Param("password") String password);
}
