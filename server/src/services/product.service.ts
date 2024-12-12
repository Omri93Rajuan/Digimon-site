import { handleBadRequest } from "../utils/ErrorHandle";
import { Product } from "../models/product";
import { IProduct } from "../types/product.interface";

const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getProductById = async (productId: string) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const addProduct = async (productData: IProduct) => {
  try {
    if (
      !productData.name ||
      !productData.description ||
      !productData.price ||
      !productData.category ||
      !productData.stock
    ) {
      throw new Error("Missing required fields");
    }

    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateProduct = async (
  productId: string,
  updateData: Partial<IProduct>
) => {
  try {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedProduct;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return { message: "Product deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};
("");

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
