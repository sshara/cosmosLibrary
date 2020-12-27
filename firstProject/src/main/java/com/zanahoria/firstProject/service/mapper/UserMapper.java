package com.zanahoria.firstProject.service.mapper;

import com.zanahoria.firstProject.data.entity.User;
import com.zanahoria.firstProject.web.dto.UserDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserDTO user_dto);


    @Mapping(source = "password", target = "password", ignore = true)
    @InheritInverseConfiguration
    UserDTO fromUser(User user);
}
