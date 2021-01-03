package com.zanahoria.firstProject.service.mapper;

import com.zanahoria.firstProject.data.entity.Role;
import com.zanahoria.firstProject.web.dto.RoleDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    Role toRole(RoleDTO roleDTO);

    @Mapping(source = "id", target = "id", ignore = true)
    @InheritInverseConfiguration
    RoleDTO fromRole(Role role);
}
