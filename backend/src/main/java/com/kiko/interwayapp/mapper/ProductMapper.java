package com.kiko.interwayapp.mapper;

import com.kiko.interwayapp.models.Product;
import com.kiko.interwayapp.models.dto.ProductRequest;
import com.kiko.interwayapp.models.dto.ProductResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;
@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toProduct(ProductRequest productRequest);

    List<ProductResponse> toProductResponse(List<Product> products);

    ProductResponse toProductResponse(Product product);

    void updateProduct(@MappingTarget Product existingProduct, ProductRequest productRequest);
}
