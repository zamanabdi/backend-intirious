// const Address = require("../models/address.model.js");
// const cartService = require("../services/cart.service.js");

// async function createOrder(user,shipAddress){
//     let address;

//     if(shipAddress._id){
//         let existAddress = await Address.findById(shipAddress._id);
//         address = isExist;
//     }
// }

const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const cartService = require("../services/cart.service");

async function createOrder(user, shippAddress) {
  let address;

  if (shippAddress._id) {
    let existAddress = await Address.findById(shippAddress._id);
    address = existAddress;
  } else {
    address = new Address(shippAddress);
    address.user = user;
    await address.save();

    user.addresses.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new orderItems({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();

    orderItems.push(createdOrderItem);
  }

  const createdOrder = new orderItems({
    user,
    orderItems,
    totalPrice:cart.totalPrice,
    totalDiscountedPrice:cart.totalDiscountedPrice,
    discount:cart.discounte,
    totalItem:cart.totalItem,
    shippAddress:address,
  });

  const savedOrder = await createOrder.save();

  return savedOrder

}

{/* place order */}
async function placeOrder(orderId){
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();

}

{/* confirmed order */}
async function confirmedOrder(orderId){
    const order = await findOrderById(orderId);
  
    order.orderStatus = "CONFIRMED";
  
    return await order.save();
  
  }

  {/* ship order */}
  async function shipOrder(orderId){
    const order = await findOrderById(orderId);
  
    order.orderStatus = "SHIPPED";
  
    return await order.save();
  
  }

  {/* deliver order */}
  async function deliverOrder(orderId){
    const order = await findOrderById(orderId);
  
    order.orderStatus = "DELIVERED";
  
    return await order.save();
  
  }


  {/* cancelled order */}

  async function cancelledOrder(orderId){
    const order = await findOrderById(orderId);
  
    order.orderStatus = "CANCELLED";
  
    return await order.save();
  
  }

  {/* find order by id */}
  async function findOrderById(orderId){
  const order = await Order.findById(orderId).populate("user").populate({path:"orderItems",populate:{path:"product"}}).populate("shippingAddress")

  return order

  }

  {/* users order history*/}
  async function usersOrderHistory(userId){
    try {
        const orders = await Order.find({user:userId,orderStatus:"PLACED"}).populate({path:"orderItems",populate:{path:"product"}}).lean()

        return orders;
        
    } catch (error) {
        throw new Error(error.message)
        
    }
  }

  {/* get all orders */}

  async function getAllOrders(){
    return await Order.find().populate({path:"orderItems",populate:{path:"product"}}).lean()
  }

  {/* delete order */}
  async function deleteOrder(orderId){
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
  }

  module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shipOrder,
    deliverOrder,
    cancelledOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder
    
  }

