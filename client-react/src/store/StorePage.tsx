import React, { useEffect, useState, MouseEvent } from "react";
import useFetch from "../hooks/useFetch";
import { IProduct } from "../types/product.interface";
import ProductModal from "../components/ProductModel";
import { useCart } from "../providers/CartProvider";
import CartSummarySidebar from "./components/CartSummarySidebar";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../hooks/useAuth";

export default function StorePage() {
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const { GET, POST, DELETE, data, error, loading } = useFetch();
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    GET("product");
  }, []);

  useEffect(() => {
    if (data) setProductList(data);
  }, [data]);

  const closeProductModal = () => setSelectedProduct(null);

  const openProductModal = (product: IProduct) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (
    product: IProduct,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    addToCart(product);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <>
      <PageHeader title="The Store" />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {productList.map((product) => (
          <div
            key={product._id}
            onClick={() => openProductModal(product)}
            className="cursor-pointer border border-gray-200 rounded-lg shadow-lg transition duration-200 hover:shadow-xl flex flex-col"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="flex-grow p-4 flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-xs text-gray-500">{product.category.name}</p>
              </div>
              <div className="mt-2">
                <p className="text-lg font-bold text-green-600">
                  ${product.price}
                </p>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="mt-2 w-full bg-customBlue-600 text-white font-semibold py-1 px-2 rounded-lg hover:bg-customPink-600 transition duration-200 "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} />
      )}
      <CartSummarySidebar />
    </>
  );
}
