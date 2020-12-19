package com.zanahoria.firstProject.data.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "\"reasons\"")
public class reason implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="\"id\"", nullable=false)
    private Long id;

    @Pattern(regexp = "^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="\"name\"", nullable=false)
    private String name;
}
