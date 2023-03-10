const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


exports.create_user = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({ error: err });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    message: "user created",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  }


  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        if ( user.length < 1 ) {
          return res.status(404).json({
            message: "Auth failed",
          });
        }
  
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
  
          if (result) {
  
                    //token//
           const token = jwt.sign({
                email:user.email,
                userId:user._id
              },process.env.TOKEN_KEY,{
                expiresIn:"10h"
              });
            
  
            return res.status(200).json({
              message: "Auth successful",
              token : token
            });
          }
          res.status(401).json({
            message: "Auth failed",
          })
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }


  exports.delete_user = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          const id = req.params.usertId;
          User.remove({ _id: id })
            .exec()
  
            .then((result) => {
              res.status(200).json({
                message: "user deleted",
              });
            })
  
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        } else {
          return res.status(409).json({
            message: "There is no mail ",
          });
        }
      });
  }