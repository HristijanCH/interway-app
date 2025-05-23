package com.kiko.interwayapp.repository;

import com.kiko.interwayapp.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findProductByNameLikeIgnoreCaseAndAndCategoryLikeIgnoreCase(String name, String category);
}
