package com.zanahoria.firstProject.data.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "\"pocket\"")
public class Pocket implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="\"id\"", nullable=false)
    private Long id;

    @Pattern(regexp = "^[0-9]+(\\.)?[0-9]*$", message = "Wrong format field")
    @NotBlank(message = "Field required")
    @Column(name="\"coins\"", nullable=false, columnDefinition = "NUMBER(*,2)")
    private Double coins;


    @OneToOne(fetch = FetchType.LAZY, optional = false, orphanRemoval = true)
    @JoinColumn(name = "user_fk", nullable = false)
    @Valid
    private User user;


}
