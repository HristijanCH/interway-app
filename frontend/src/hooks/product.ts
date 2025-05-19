import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "../lib/axios.ts";
import type {ProductFormData} from "../types/DataTypes.ts";

export const useProducts = (page: number, pageSize: number) => {
    return useQuery({
        queryKey: ['products', page, pageSize],
        queryFn: async () => {
            const res = await axios.get('/api/products', {
                params: {page: page, size: pageSize}
            });
            return res.data;
        }
    });
};

export const useProductById = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(`/api/products/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: async (newProduct: ProductFormData) => {
            const response = await axios.post('/api/products', newProduct);
            return response.data;
        }
    });
};

export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: async ({id, updatedProduct}: { id: string, updatedProduct: ProductFormData }) => {
            console.log("data in hook: ",updatedProduct)
            const response = await axios.put(`/api/products/${id}`, updatedProduct);
            return response.data;
        }
    });
};

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`/api/products/${id}`);
            return response.data;
        },
    });
};

export const useUploadProductImageMutation = (productId: string | undefined) => {
    return useMutation({
        mutationFn: async (file: File) => {
            if (!productId) throw new Error("Product ID is required");

            const formData = new FormData();
            formData.append("image", file);

            await axios.put(`/api/products/${productId}/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
    });
};

export const useSearchProducts = ({name,category}:{name:string | undefined,category:string | undefined}) => {
    return useQuery({
        queryKey: ['products', 'search', name,category],
        queryFn: async () =>{
            const params = new URLSearchParams();
            if (name) params.append("name", name);
            if (category) params.append("category", category);
            const response = await axios.get(`/api/products/search?${params.toString()}`);
            return response.data;
        },
        enabled: false
    });
};