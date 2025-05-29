package com.hovetlilicao.infra.services.Product;

import com.hovetlilicao.api.dto.product.CreateProductDTO;
import com.hovetlilicao.api.dto.product.EditProduct;
import com.hovetlilicao.api.dto.product.ProductDTO;
import com.hovetlilicao.domain.models.Product;
import com.hovetlilicao.domain.models.User;
import com.hovetlilicao.infra.repositories.ProductRepository;
import com.hovetlilicao.infra.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    //POST
    public ResponseEntity<?> createProduct(CreateProductDTO dto, Principal principal) {
        Optional<User> optionalUser = userRepository.findByEmail(principal.getName());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body("Usuário não encontrado");
        }

        User admin = optionalUser.get();

        Product product = new Product();
        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQtt(dto.getQtt());
        product.setAdmin(admin);

        Product saved = productRepository.save(product);

        return ResponseEntity.ok(new ProductDTO(saved));
    }

    //GET
    public ResponseEntity<?> getAllProducts() {
        List<ProductDTO> products = productRepository.findAll()
                .stream()
                .map(ProductDTO::new)
                .toList();

        return ResponseEntity.ok(products);
    }

    //GET{ID}
    public ResponseEntity<?> findProductById(Long id) {
        Optional<Product> optional = productRepository.findById(id);
        return optional.map(product -> ResponseEntity.ok(new ProductDTO(product)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //PUT
    public ResponseEntity<?> editProduct(EditProduct dto, Principal principal){
        Optional<Product> optionalProduct = productRepository.findById(dto.getId());
        if(optionalProduct.isEmpty()){
            return ResponseEntity.status(404).body("Produto não encontrado");
        }

        Product product = optionalProduct.get();

        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQtt(dto.getQtt());


        Product updated = productRepository.save(product);
        return ResponseEntity.ok(new ProductDTO(updated));
    }

    //DELETE
    public ResponseEntity<?> deleteProduct(Long id){
        Optional<Product> optionalProduct = productRepository.findById(id);
        if(optionalProduct.isEmpty()){
            return ResponseEntity.status(404).body("Não foi possível encontrar o produto");
        }
        productRepository.deleteById(id);
        return ResponseEntity.ok("produto deletado com sucesso");
    }
}
