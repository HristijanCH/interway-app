CREATE TABLE IF NOT EXISTS product (
    id uuid PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    quantity_in_stock INT NOT NULL,
    category VARCHAR(100)
);

INSERT INTO product (id, name, description, price, quantity_in_stock, category)
VALUES (gen_random_uuid(), 'The Lord of the Rings', 'Epic fantasy novel by J.R.R. Tolkien about the battle between good and evil in Middle-earth.', 9.99, 10, 'Books');

INSERT INTO product (id, name, description, price, quantity_in_stock, category)
VALUES (gen_random_uuid(), 'The Da Vinci Code', 'Thriller by Dan Brown following a symbolist uncovering secrets hidden in famous works of art.', 5.49, 20, 'Books');

INSERT INTO product (id, name, description, price, quantity_in_stock, category)
VALUES (gen_random_uuid(), 'Leather Wallet', 'Genuine leather men''s wallet with coin pocket.', 15.99, 50, 'Accessories');

INSERT INTO product (id, name, description, price, quantity_in_stock, category)
VALUES (gen_random_uuid(), 'Sunglasses', 'UV-protected unisex sunglasses with black frame.', 12.49, 30, 'Accessories');

INSERT INTO product (id, name, description, price, quantity_in_stock, category)
VALUES (gen_random_uuid(), 'Wrist Watch', 'Stylish analog wrist watch with stainless steel band.', 45.00, 25, 'Accessories');

INSERT INTO product (id, name, description, price, quantity_in_stock, category)
VALUES (gen_random_uuid(), 'Ballpoint Pens', 'Pack of 10 smooth-writing black ballpoint pens.', 3.99, 100, 'Office Supplies');

INSERT INTO product (id, name, description, price, quantity_in_stock, category)
VALUES (gen_random_uuid(), 'Stapler', 'Durable desktop stapler with 1000 staples included.', 6.49, 40, 'Office Supplies');

INSERT INTO product (id, name, description, price, quantity_in_stock, category)
VALUES (gen_random_uuid(), 'Notebook', 'A4 spiral notebook with 200 ruled pages.', 2.75, 60, 'Office Supplies');