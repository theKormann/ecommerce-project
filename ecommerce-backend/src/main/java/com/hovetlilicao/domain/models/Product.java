package com.hovetlilicao.domain.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Long id;

    private String productName;
    private Double price;
    private String description;
    private Integer qtt;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;
}
