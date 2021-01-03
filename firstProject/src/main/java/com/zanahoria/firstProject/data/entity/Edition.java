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
@Table(name = "editions")
public class Edition implements Serializable {

    @Id
    @Pattern(regexp = "^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$", message = "Wrong format field")
    @Size(max = 20, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="isbn", nullable=false, length = 20)
    private String isbn;

    @Pattern(regexp = "^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$", message = "Wrong format field")
    @Size(max = 255, message = "Limit characters exceeded")
    @NotBlank(message = "Field required")
    @Column(name="name", nullable=false)
    private String name;

    @NotBlank(message = "Field required")
    @Column(name="publish_date", nullable=false, columnDefinition = "DATE")
    private Date publishDate;

    @NotBlank(message = "Field required")
    @Column(name="number_pages", nullable=false)
    private Integer numberPages;

    @NotBlank(message = "Field required")
    @Column(name="price", nullable=false, columnDefinition = "NUMBER(*,2)")
    private Double price;

    @NotBlank(message = "Field required")
    @Column(name="available_units", nullable=false)
    private Integer availableUnits;


    @NotBlank(message = "Field required")
    @Lob
    @Column(name="front_image", nullable=false, columnDefinition = "BLOB")
    private Byte[] frontImage;

    @NotBlank(message = "Field required")
    @Lob
    @Column(name="back_image", nullable=false, columnDefinition = "BLOB")
    private Byte[] backImage;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "publishing_house_fk", nullable = false)
    @Valid
    private PublishingHouse publishingHouse;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "language_fk", nullable = false)
    @Valid
    private Language language;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "book_fk", nullable = false)
    @Valid
    private Book book;

}
