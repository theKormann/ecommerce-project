package com.hovetlilicao.api.controllers.product;

import com.hovetlilicao.api.dto.product.CreateProductDTO;
import com.hovetlilicao.api.dto.product.EditProduct;
import com.hovetlilicao.domain.models.Product;
import com.hovetlilicao.infra.services.Product.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProduct(@Valid @RequestBody CreateProductDTO dto, Principal principal) {
        return productService.createProduct(dto, principal);
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> filterById(@PathVariable("id") Long id) {
        return productService.findProductById(id);
    }

    @PutMapping("/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> editProduct(@Valid @RequestBody EditProduct dto, Principal principal){
        return productService.editProduct(dto, principal);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
        return productService.deleteProduct(id);
    }

}