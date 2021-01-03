package com.zanahoria.firstProject.service.mapper;

import com.zanahoria.firstProject.data.entity.UserStatus;
import com.zanahoria.firstProject.web.dto.UserStatusDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserStatusMapper {

    UserStatus toUserStatus(UserStatusDTO userStatusDTO);

    @Mapping(source = "id", target = "id", ignore = true)
    @InheritInverseConfiguration
    UserStatusDTO fromUserStatus(UserStatus userStatus);
}
