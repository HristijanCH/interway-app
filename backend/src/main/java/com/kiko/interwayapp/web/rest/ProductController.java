package com.kiko.interwayapp.web.rest;

import com.kiko.interwayapp.models.dto.ProductRequest;
import com.kiko.interwayapp.models.dto.ProductResponse;
import com.kiko.interwayapp.service.ProductService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping({"","/"})
    public ResponseEntity<?> getProducts(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        if (page != null && size != null) {
            return ResponseEntity.ok(service.getPaginatedProducts(page,size));
        } else {
            return ResponseEntity.ok(service.findAll());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> findProductById(@PathVariable UUID id){
        ProductResponse product = service.findById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody @Valid ProductRequest product){
        ProductResponse createdProduct = service.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED.value()).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@RequestBody @Valid ProductRequest productRequest,@PathVariable UUID id){
        ProductResponse updatedProduct = service.updateProduct(productRequest,id);
        return ResponseEntity.ok(updatedProduct);
    }

    @PutMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateProductImage(
            @PathVariable UUID id,
            @RequestPart("image") MultipartFile imageFile
    ) {
        service.updateProductImage(id, imageFile);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchProducts(@RequestParam(required = false, defaultValue = "") String name,
                                                                @RequestParam(required = false, defaultValue = "") String category){

        List<ProductResponse> productResponseList=service.searchByNameAndCategory(name,category);
        return ResponseEntity.ok(productResponseList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id){
        service.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}
