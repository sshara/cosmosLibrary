package com.zanahoria.firstProject.data.repository;


import com.zanahoria.firstProject.data.entity.Role;
import com.zanahoria.firstProject.data.entity.UserStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserStatusRepo extends CrudRepository<UserStatus, Long> {

    //@Query(value = "SELECT * FROM \"user_statuses\" WHERE \"id\" = :id", nativeQuery = true)
    //Optional<UserStatus> findById(@Param("id") Long id);
    Optional<UserStatus> findByName(@Param("name") String name);
}
