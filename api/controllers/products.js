const Product = require("../models/product");
const mongoose = require("mongoose");


exports.get_all_products = (req, res, next) => {
    Product.find()
      .select("name price _id productImage")
      .exec()
      .then((docs) => {
        console.log(docs);
        const response = {
          count: docs.length,
          products: docs.map((doc) => {
            return {
              name: doc.name,
              price: doc.price,
              productImage: doc.productImage,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + doc._id,
              },
            };
          }),
        };
        if (docs.length >= 0) {
          res.status(200).json(response);
        } else {
          res.status(404).json({
            message: "no Entry found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  

  exports.add_product = (req, res, next) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path 
    });
    product
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "POST requests successfully ",
          createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/products/" + result._id,
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }



  exports.get_specifec_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
      .select("name price _id")
      .exec()
      .then((doc) => {
        console.log("From data base", doc);
        if (doc) {
          res.status(200).json({
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }


  exports.change_specifec_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "product updated",
          request: {
            type: "GET",
            url: "http://localhost/products/" + id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }


  exports.delete_specifec_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then((result) =>
        res.status(200).json({
          message: "Product deleted",
          request: {
            type: "POST",
            url: "http://localhost/products/",
            body: { name: "String", price: "Number" },
          },
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }