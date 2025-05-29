package com.hovetlilicao.api.dto.product;

import com.hovetlilicao.domain.models.Product;
import lombok.Data;

@Data
public class ProductDTO {

    private Long id;
    private String productName;
    private String description;
    private Double price;
    private Integer qtt;

    public ProductDTO(Product product){
        this.id = product.getId();
        this.productName = product.getProductName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.qtt = product.getQtt();
    }
}
