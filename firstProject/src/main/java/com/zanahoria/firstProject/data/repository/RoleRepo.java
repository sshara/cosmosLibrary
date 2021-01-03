package com.zanahoria.firstProject.data.repository;

import com.zanahoria.firstProject.data.entity.Role;
import com.zanahoria.firstProject.data.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoleRepo extends CrudRepository<Role, Long> {

    //@Query(value = "SELECT * FROM \"roles\" WHERE \"id\" = :id", nativeQuery = true)
    //Optional<Role> findById(@Param("id") Long id);

    Optional<Role> findByName(@Param("name") String name);
}
