const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");


exports.get_all_orders = (req, res, next) => {
    Order.find()
      .select("product quantity _id")
      .populate('product','name')
      .exec()
      .then((docs) => {
        res.status(200).json({
          count: docs.length,
          orders:docs.map(doc => {
              return{
                  _id: doc._id,
                  product: doc.product,
                  quantity: doc.quantity,
                  request : {
                      type:"GET",
                      url: 'http://localstorage:3000/orders/'+doc._id
                  }
                
              }
          })
        
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  exports.add_order = (req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId,
          });
       return   order.save()
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Order stored',
        createdOrder: {
            _id: result._id,
            product:result.product,
            quantity:result.quantity
        },
        request : {
            type:"GET",
            url: 'http://localstorage:3000/orders/'+result._id
        }
      });
    })
    .catch(err => {
        res.status(500).json({
            message:'product not found',
            error:err
        })
    })
}


exports.get_specific_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message:"order not found"
            })
        }
        res.status(200).json({
            order:order,
            product:order.product,
            request:{
                type:'GET',
                url:'http://localstorage:3000/orders/' 
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message:'product not found',
            error:err
        })
    })

}

exports.delete_specific_order = (req, res, next) => {
    Order.remove({_id:req.params.orderId})
    .exec()
    .then(result =>  {
        res.status(200).json({
            message:"order deleted",
            request:{
                type:'Post',
                url:'http://localstorage:3000/orders' ,
                body:{ productId:"ID",quantity:"Number"}
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message:'product not found',
            error:err
        })
    })
    }