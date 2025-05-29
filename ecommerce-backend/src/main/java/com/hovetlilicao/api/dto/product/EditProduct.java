package com.hovetlilicao.api.dto.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class EditProduct {
    @NotNull
    private Long id;

    @NotBlank
    private String productName;

    private String description;

    @NotNull
    @Positive
    private Double price;

    @NotNull
    @Min(0)
    private Integer qtt;
}
