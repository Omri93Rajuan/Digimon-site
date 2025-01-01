import React, { useEffect, useState, MouseEvent } from "react";
import useFetch from "../hooks/useFetch";
import { IProduct } from "../types/product.interface";
import ProductModal from "../components/ProductModel";
import { useCart } from "../providers/CartProvider";
import CartSummarySidebar from "./components/CartSummarySidebar";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../hooks/useAuth";

const StorePage = () => {
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);

  const { GET, POST, DELETE, PUT, data, error, loading } = useFetch();
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    GET("product");
  }, []);

  useEffect(() => {
    if (data) setProductList(data);
  }, [data]);

  const closeProductModal = () => {
    setSelectedProduct(null);
    setEditProduct(null);
  };

  const openProductModal = (product: IProduct) => setSelectedProduct(product);

  const handleAddToCart = (
    product: IProduct,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleDeleteProduct = async (
    productId: string,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    try {
      await DELETE(`product/${productId}`);
      setProductList((prevList) =>
        prevList.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleEditProduct = (
    product: IProduct,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setEditProduct(product);
  };

  const openAddProductModal = () => {
    setEditProduct({
      _id: "",
      name: "",
      description: "",
      price: 0,
      images: [],
      category: { name: "" },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader title="The Store" />

      {user && (
        <div className="flex justify-end p-4">
          <button
            onClick={openAddProductModal}
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-400 transition-transform transform hover:scale-105"
          >
            Add New Product
          </button>
        </div>
      )}

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productList.map((product) => (
          <div
            key={product._id}
            onClick={() => openProductModal(product)}
            className="relative cursor-pointer border border-gray-200 rounded-lg shadow-lg transition duration-200 hover:shadow-xl flex flex-col bg-white"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="flex-grow p-4 flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xs text-gray-500 mt-1">
                  {product.category.name}
                </p>
                <p className="text-lg font-semibold text-green-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="mt-2 w-full bg-customBlue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-customPink-600 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
            {user && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={(e) => handleEditProduct(product, e)}
                  className="bg-orange-500 text-white py-1 px-2 rounded-lg hover:bg-orange-400 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDeleteProduct(product._id!, e)}
                  className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-400 transition duration-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedProduct && !editProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProductModal}
          isEditing={false}
        />
      )}
      {editProduct && (
        <ProductModal
          product={editProduct}
          onClose={closeProductModal}
          isEditing={true}
        />
      )}
      <CartSummarySidebar />
    </div>
  );
};

export default StorePage;
