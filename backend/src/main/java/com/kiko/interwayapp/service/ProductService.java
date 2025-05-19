package com.kiko.interwayapp.service;

import com.kiko.interwayapp.models.dto.PagedResponse;
import com.kiko.interwayapp.models.dto.ProductRequest;
import com.kiko.interwayapp.models.dto.ProductResponse;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.UUID;

public interface ProductService {

    List<ProductResponse> findAll();
    ProductResponse createProduct(ProductRequest productRequest);
    ProductResponse findById(UUID id);
    ProductResponse updateProduct(ProductRequest productRequest,UUID id);
    void deleteProduct(UUID id);

    PagedResponse<ProductResponse> getPaginatedProducts(Integer page, Integer size);
    void updateProductImage(UUID id, MultipartFile imageFile);
    List<ProductResponse> searchByNameAndCategory(String name, String category);
}
