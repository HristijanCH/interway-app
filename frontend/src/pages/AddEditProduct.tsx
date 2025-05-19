import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useCreateProduct, useUpdateProduct } from '../hooks/product.ts';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import type { ProductFormData } from '../types/DataTypes.ts';

export default function AddEditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const isEdit = !!id;
    const existingProduct = state?.product;
    const { mutate: createProduct } = useCreateProduct();
    const { mutate: updateProduct } = useUpdateProduct();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ProductFormData>({
        defaultValues: {
            name: existingProduct?.name || '',
            description: existingProduct?.description || '',
            price: existingProduct?.price || 0,
            quantityInStock: existingProduct?.quantityInStock || 0,
            category: existingProduct?.category || ''
        }
    });

    const onSubmit = (formValues: ProductFormData) => {
        console.log("formVals: ", formValues);

        if (isEdit) {
            updateProduct(
                { id: existingProduct.id, updatedProduct: formValues },
                {
                    onSuccess: () => {
                        toast.success('Product updated');
                        navigate('/products');
                    },
                    onError: () => toast.error('Update failed')
                }
            );
        } else {
            createProduct(formValues, {
                onSuccess: () => {
                    toast.success('Product created');
                    navigate('/products');
                },
                onError: () => toast.error('Creation failed')
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-10 text-gray-800">
                {isEdit ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
                {/* Product Name */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        id="description"
                        rows={3}
                        {...register('description')}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label htmlFor="price" className="text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        {...register('price', { required: 'Price is required', valueAsNumber: true })}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.price && <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>}
                </div>

                {/* Quantity */}
                <div className="flex flex-col">
                    <label htmlFor="quantityInStock" className="text-sm font-medium text-gray-700 mb-1">Quantity in Stock</label>
                    <input
                        id="quantityInStock"
                        type="number"
                        min="0"
                        {...register('quantityInStock', { required: 'Quantity is required', valueAsNumber: true })}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.quantityInStock && <span className="text-red-500 text-sm mt-1">{errors.quantityInStock.message}</span>}
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                        id="category"
                        {...register('category')}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow"
                    >
                        {isEdit ? 'Update Product' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
