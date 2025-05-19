package com.kiko.interwayapp.service.impl;

import com.kiko.interwayapp.exceptions.ProductNotFoundException;
import com.kiko.interwayapp.mapper.ProductMapper;
import com.kiko.interwayapp.models.Product;
import com.kiko.interwayapp.models.dto.PagedResponse;
import com.kiko.interwayapp.models.dto.ProductRequest;
import com.kiko.interwayapp.models.dto.ProductResponse;
import com.kiko.interwayapp.repository.ProductRepository;
import com.kiko.interwayapp.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;

    public ProductServiceImpl(ProductRepository repository, ProductMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<ProductResponse> findAll() {
        return mapper.toProductResponse(repository.findAll());
    }

    @Override
    public ProductResponse createProduct(ProductRequest productRequest) {
        return mapper.toProductResponse(repository.save(mapper.toProduct(productRequest)));
    }

    @Override
    public ProductResponse findById(UUID id) {
        Product product=repository.findById(id).orElseThrow(()->new ProductNotFoundException(id));
        ProductResponse response=mapper.toProductResponse(product);
        response.setImage(product.getImage());
        return response;
    }

    @Override
    public ProductResponse updateProduct(ProductRequest productRequest, UUID id) {
        Product product=repository.findById(id).orElseThrow((()->new ProductNotFoundException(id)));
        mapper.updateProduct(product,productRequest);
        return mapper.toProductResponse(repository.save(product));
    }

    @Override
    public void deleteProduct(UUID id) {
        Product product=repository.findById(id).orElseThrow(()->new ProductNotFoundException(id));
        repository.delete(product);
    }

    @Override
    public PagedResponse<ProductResponse> getPaginatedProducts(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductResponse> productPage = repository.findAll(pageable).map(mapper::toProductResponse);
        return new PagedResponse<>(
                productPage.getContent(),
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.isLast()
        );
    }
    @Transactional
    public void updateProductImage(UUID id, MultipartFile imageFile) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                product.setImage(imageFile.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to read image file", e);
            }
        }

        repository.save(product);
    }
}
