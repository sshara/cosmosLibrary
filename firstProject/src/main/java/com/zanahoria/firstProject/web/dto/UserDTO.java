package com.zanahoria.firstProject.web.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;

public class UserDTO implements Serializable {

    private Long id;

    @Pattern(regexp = "^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    private String username;


    @Pattern(regexp = "^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    private String password;

    @Pattern(regexp = "^([a-zA-Z0-9_\\-.]+)@([a-zA-Z0-9_\\-.]+)\\.([a-zA-Z]{2,5})$" , message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    private String email;
}
