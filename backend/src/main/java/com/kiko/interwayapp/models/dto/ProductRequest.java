package com.kiko.interwayapp.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest{

    private String name;
    private String description;
    private Double price;
    private Integer quantityInStock;
    private String category;
}
