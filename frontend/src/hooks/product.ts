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

// export const useFilterProducts = (query: string) => {
//     return useQuery({
//         queryKey: ['products', 'filter', query],
//         queryFn: async () =>{
//             const response = await axios.get(`/api/products/filter?name=${query}`);
//             return response.data;
//         },
//         enabled: !!query
//     });
// };