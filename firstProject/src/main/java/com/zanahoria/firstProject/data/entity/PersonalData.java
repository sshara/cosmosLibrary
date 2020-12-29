package com.zanahoria.firstProject.data.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "\"personal_data\"")
public class PersonalData implements Serializable {

    @Id
    @Pattern(regexp = "^[0-9]+$", message = "Wrong format field")
    @Size(max = 20, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="\"dni\"", nullable=false, length = 20)
    private String dni;

    @Pattern(regexp = "^[a-zA-Z]+[a-zA-Z ]*$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="\"name\"", nullable=false)
    private String name;

    @Pattern(regexp = "^[a-zA-Z]+[a-zA-Z ]*$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="\"lastname\"", nullable=false)
    private String lastname;

    @NotBlank(message = "Field required")
    @Column(name="\"birthdate\"", nullable=false, columnDefinition = "DATE")
    private Date birthdate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dni_type_fk", nullable = false)
    @Valid
    private DNIType dniType;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "gender_fk", nullable = false)
    @Valid
    private Gender gender;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "address_fk", nullable = false)
    @Valid
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_fk", nullable = false)
    @Valid
    private User user;

}
