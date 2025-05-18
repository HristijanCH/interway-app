package com.kiko.interwayapp.exceptions;

import java.util.UUID;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(UUID id) {
        super(String.format("Product with id: %s does not exist",id));
    }
}
