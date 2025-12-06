
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id:Number ,
    name : String,
    price : Number

});

const VegProductsSchema = new mongoose.Schema({
    id : Number,
    name : String,
    price : Number,
    img : String,
    desc: String,       // description of the product
    discount: String, 
});

const NonVegProductsSchema = new mongoose.Schema({
    id : Number,
    name : String,
    price : Number,
    img : String,
    desc: String,       // description of the product
    discount: String, 
})
const MilkBreadSchema = new mongoose.Schema({
    id : Number,
    name : String,
     price : Number,
    img : String,
    desc: String,       // description of the product
    discount: String,

});

const FruitsVegSchema = new mongoose.Schema({
    id : Number,
    name : String,      
    price : Number,
    img : String,
    desc: String,       // description of the product
    discount: String,
});   

const HomeProductsSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    img: String,
    desc: String,
    discount: String
});

const orderSchema = new mongoose.Schema(

    {
        items: [
            {
                id: Number,
                name: String,
                price: Number,
                img : String,
                desc: String,   
                quantity: Number,      // description of the product
                discount: String,
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        Orderdate: {
            type: Date,
            default: Date.now,
        },
    },

    { timestamps: true }
);

// registration form 
const RegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);






module.exports =  {ProductSchema , VegProductsSchema , NonVegProductsSchema, MilkBreadSchema, FruitsVegSchema,HomeProductsSchema,orderSchema,RegistrationSchema};