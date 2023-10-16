const orderService = require("../services/order.service.js");

{/* get all orders */}
const getAllOrders = async(req,res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}


{/* confirmed orders */}
const confirmedOrders = async(req,res) => {
    const orderId = req.params.orderId;
    
    try {
        const orders = await orderService.confirmedOrder(orderId);
        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}

{/* shipp orders */}
const shippOrders = async(req,res) => {
    const orderId = req.params.orderId;
    
    try {
        const orders = await orderService.shipOrder(orderId);
        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}


{/* deliver orders */}
const deliverOrders = async(req,res) => {
    const orderId = req.params.orderId;
    
    try {
        const orders = await orderService.deliverOrder(orderId);
        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}

{/* cancel order */}
const cancelledOrders = async(req,res) => {
    const orderId = req.params.orderId;
    
    try {
        const orders = await orderService.cancelledOrder(orderId);
        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}


{/* delete order */}

const deleteOrders = async(req,res) => {
    const orderId = req.params.orderId;
    
    try {
        const orders = await orderService.deleteOrder(orderId);
        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}

module.exports = {
    getAllOrders,
    confirmedOrders,
    shippOrders,
    deliverOrders,
    cancelledOrders,
    deleteOrders
}



