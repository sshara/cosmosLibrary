package com.zanahoria.firstProject.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transactions")
public class Transaction implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable=false)
    private Long id;

    @NotBlank(message = "Field required")
    @Column(name="transaction_date", nullable=false, columnDefinition = "DATE")
    private Date transaction_date;

    @NotBlank(message = "Field required")
    @Column(name="unit_price", nullable=false, columnDefinition = "NUMBER(*,2)")
    private Double unit_price;

    @NotBlank(message = "Field required")
    @Column(name="number_units", nullable=false)
    private Integer number_units;

    //"total" NUMBER(*,2) GENERATED ALWAYS AS ("number_units" * "unit_price") VIRTUAL,
    @Transient
    @Column(name="unit_price", nullable=false, columnDefinition = "NUMBER(*,2)")
    private Double total;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_fk", nullable = false)
    @Valid
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "book_fk", nullable = false)
    @Valid
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "type_fk", nullable = false)
    @Valid
    private TransactionType transactionType;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "status_fk", nullable = false)
    @Valid
    private TransactionStatus transactionStatus;

    @ToString.Exclude
    @Valid
    @OneToMany(mappedBy = "transaction", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Refund> refunds = new ArrayList<>();
}
