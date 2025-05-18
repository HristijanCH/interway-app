package com.kiko.interwayapp.web.rest;

import com.kiko.interwayapp.models.dto.ProductRequest;
import com.kiko.interwayapp.models.dto.ProductResponse;
import com.kiko.interwayapp.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping({"","/"})
    public ResponseEntity<List<ProductResponse>> getProducts(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> findProductById(@PathVariable UUID id){
        ProductResponse product = service.findById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/create")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody @Valid ProductRequest product){
        ProductResponse createdProduct = service.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED.value()).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@RequestBody @Valid ProductRequest productRequest,@PathVariable UUID id){
        ProductResponse updatedProduct = service.updateProduct(productRequest,id);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id){
        service.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}
