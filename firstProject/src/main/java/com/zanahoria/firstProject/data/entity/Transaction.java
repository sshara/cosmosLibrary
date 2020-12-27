package com.zanahoria.firstProject.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "\"transactions\"")
public class Transaction implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="\"id\"", nullable=false)
    private Long id;

    @NotBlank(message = "Field required")
    @Column(name="\"transaction_date\"", nullable=false, columnDefinition = "DATE")
    private Date transaction_date;

    @NotBlank(message = "Field required")
    @Column(name="\"unit_price\"", nullable=false, columnDefinition = "NUMBER(*,2)")
    private Double unit_price;

    @NotBlank(message = "Field required")
    @Column(name="\"number_units\"", nullable=false)
    private Integer number_units;

}
