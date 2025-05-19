import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef,
} from '@tanstack/react-table';
import { useDeleteProduct, useProducts, useSearchProducts } from '../hooks/product.ts';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Product } from "../types/DataTypes.ts";
import ProductDetailsModal from "../components/ProductDetailsModal.tsx";

export default function ProductsPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const { mutate: deleteProduct } = useDeleteProduct();
    const navigate = useNavigate();

    const { data: allProductsData, isLoading: isAllLoading } = useProducts(page - 1, pageSize);

    const {
        data: searchResults,
        refetch: refetchSearch,
    } = useSearchProducts({ name: nameSearch, category: categorySearch });

    const handleSearch = async () => {
        if (!nameSearch && !categorySearch) return;
        setIsSearching(true);
        await refetchSearch();
    };

    const handleResetSearch = () => {
        setIsSearching(false);
        setNameSearch('');
        setCategorySearch('');
    };

    const handleDetails = (product: Product) => {
        setSelectedProduct(product);
        setDetailsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        navigate(`/products/edit/${product.id}`, { state: { product } });
    };

    const handleDelete = (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (!confirmed) return;
        deleteProduct(id, {
            onSuccess: () => toast.success('Product deleted successfully'),
            onError: (error: any) =>
                toast.error(`Delete failed: ${error?.message || 'Unknown error'}`),
        });
    };

    const products = isSearching ? searchResults || [] : allProductsData?.content || [];
    const totalPages = allProductsData?.totalPages ?? 1;

    const columns: ColumnDef<Product>[] = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'description', header: 'Description' },
        { accessorKey: 'price', header: 'Price ($)' },
        { accessorKey: 'quantityInStock', header: 'Quantity' },
        { accessorKey: 'category', header: 'Category' },
        {
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleDetails(product)}
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Details
                        </button>
                        <button
                            onClick={() => handleEdit(product)}
                            className="text-yellow-600 hover:underline text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:underline text-sm"
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: products,
        columns,
        pageCount: totalPages,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        state: {
            pagination: {
                pageIndex: page - 1,
                pageSize,
            },
        },
        onPaginationChange: (updater) => {
            const newPageIndex =
                typeof updater === 'function'
                    ? updater({ pageIndex: page - 1, pageSize }).pageIndex
                    : updater.pageIndex;
            setPage(newPageIndex + 1);
        },
    });

    if (isAllLoading) return <p className="text-center text-gray-600">Loading...</p>;

    return (
        <div className="flex justify-center max-w-full">
            <div className="w-[80%] p-6">
                <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-4 pb-2 border-b border-gray-300 tracking-tight">
                    Product List
                </h2>

                {/* 🔍 Search Bar */}
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={nameSearch}
                        onChange={(e) => setNameSearch(e.target.value)}
                        className="px-3 py-2 border rounded w-60"
                    />
                    <input
                        type="text"
                        placeholder="Search by category"
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        className="px-3 py-2 border rounded w-60"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                    {isSearching && (
                        <button
                            onClick={handleResetSearch}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Reset
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto border rounded-lg shadow-md">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-gray-100 border-b border-gray-300">
                        {table.getHeaderGroups().map(group => (
                            <tr key={group.id}>
                                {group.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r last:border-r-0"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className="even:bg-gray-50 hover:bg-gray-100 transition-colors border-b"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-4 py-3 text-sm text-gray-800 border-r last:border-r-0"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {!isSearching && (
                    <div className="flex justify-between items-center mt-6 md:ml-40">
                        <div className="flex justify-center flex-1 gap-4">
                            <button
                                onClick={() => setPage(p => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className="px-4 py-2 w-32 rounded !bg-blue-600 !hover:bg-blue-700 text-white disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-700">
                                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                            </span>

                            <button
                                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                disabled={page >= totalPages}
                                className="px-4 py-2 w-32 rounded !bg-blue-600 !hover:bg-black text-white disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>

                        <div className="ml-auto">
                            <label htmlFor="pageSize" className="mr-2 text-sm text-gray-700">Rows per page:</label>
                            <select
                                id="pageSize"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="px-3 py-2 rounded border border-gray-300 text-sm"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <ProductDetailsModal
                product={selectedProduct}
                isOpen={detailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
            />
        </div>
    );
}
