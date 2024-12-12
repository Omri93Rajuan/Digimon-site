import { handleBadRequest } from "../utils/ErrorHandle";
import  Order  from "../models/order";
import { IOrder } from "../types/order.interface";

const getAllOrders = async () => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    return orders;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getOrderById = async (orderId: string) => {
  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate("products.product");

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const addOrder = async (orderData: IOrder) => {
  try {
    if (!orderData.user || !orderData.products || orderData.products.length === 0) {
      throw new Error("User and products are required");
    }

    let totalPrice = 0;
    orderData.products.forEach(product => {
      totalPrice += product.price * product.quantity;
    });

    const newOrder = new Order({
      ...orderData,
      totalPrice,
    });

    await newOrder.save();
    return newOrder;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateOrder = async (orderId: string, updateData: Partial<IOrder>) => {
  try {
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      throw new Error("Order not found");
    }

    // If there are any changes in the products, recalculate the total price
    if (updateData.products) {
      let totalPrice = 0;
      updateData.products.forEach(product => {
        totalPrice += product.price * product.quantity;
      });
      updateData.totalPrice = totalPrice;
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedOrder;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteOrder = async (orderId: string) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      throw new Error("Order not found");
    }
    return { message: "Order deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
};
