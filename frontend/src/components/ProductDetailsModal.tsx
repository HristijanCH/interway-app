import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {useProductById, useUploadProductImageMutation} from "../hooks/product.ts"; // adjust path as needed
import { useQueryClient } from "@tanstack/react-query";
import {toast} from "react-toastify";

interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    quantityInStock: number;
    category?: string;
    image?: string; // base64 image string
}

interface ProductDetailsModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
                                                                     product,
                                                                     isOpen,
                                                                     onClose,
                                                                 }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const { data: productData } = useProductById(product?.id || "");

    useEffect(() => {
        if (productData?.image) {
            setImageUrl(`data:image/jpeg;base64,${productData.image}`);
        } else {
            setImageUrl(null);
        }
    }, [productData]);

    const uploadMutation = useUploadProductImageMutation(product?.id);

    const handleUpload = () => {
        if (selectedFile) {
            uploadMutation.mutate(selectedFile, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["product", product?.id] });
                    toast.success("Image uploaded successfully");
                    setSelectedFile(null);
                },
                onError: (err) => {
                    console.error("Image upload failed", err);
                    toast.error("Image upload failed. Please try again.");
                },
            });
        }
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    if (!product) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <Dialog.Panel className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg pointer-events-auto border border-gray-200">
                    <Dialog.Title className="text-xl font-semibold mb-4 text-gray-800">
                        Product Details
                    </Dialog.Title>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col items-center">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="Product"
                                    className="w-full h-48 object-contain border rounded"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center border rounded">
                                    <span className="text-gray-400">No image</span>
                                </div>
                            )}
                            <label
                                className="mt-3 inline-block px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 text-base font-medium">
                                {selectedFile ? selectedFile.name : "Choose Image"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                            <button
                                onClick={handleUpload}
                                disabled={uploadMutation.isPending || !selectedFile}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                            {uploadMutation.isPending ? "Uploading..." : "Upload/Change Image"}
                            </button>
                        </div>

                        <div className="text-sm text-gray-700 space-y-2">
                            <div><strong>Name:</strong> {productData?.name}</div>
                            <div><strong>Description:</strong> {productData?.description || "—"}</div>
                            <div><strong>Price:</strong> ${productData?.price.toFixed(2)}</div>
                            <div><strong>Quantity:</strong> {productData?.quantityInStock}</div>
                            <div><strong>Category:</strong> {productData?.category || "—"}</div>
                        </div>
                    </div>

                    <div className="mt-6 text-right">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ProductDetailsModal;
