package com.zanahoria.firstProject.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "\"addresses\"")
public class Address implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="\"id\"", nullable=false)
    private Long id;

    @Pattern(regexp = "^[0-9]+$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="\"country\"", nullable=false)
    private String country;

    @Pattern(regexp = "^[0-9]+$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="\"state\"", nullable=false)
    private String state;

    @Pattern(regexp = "^[0-9]+$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="\"city\"", nullable=false)
    private String city;

    @Pattern(regexp = "^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="\"address\"", nullable=false)
    private String address;

    @ToString.Exclude
    @Valid
    @OneToMany(mappedBy = "Address", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PersonalData> personal_data = new ArrayList<>();

}
