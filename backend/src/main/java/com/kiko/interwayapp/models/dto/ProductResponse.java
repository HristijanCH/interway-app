package com.kiko.interwayapp.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse{
    private UUID id;
    private String name;
    private String description;
    private Double price;
    private Integer quantityInStock;
    private String category;
    private byte[] image;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
