const {getAllproducts ,
   getProductById ,
    createProduct ,
     createProducts , 
     deleteProductById ,
      updateProductById ,
      createVegProducts , getAllVegProducts , getAllOrders , createHomeProducts} = require("./productController");
const jwt = require("jsonwebtoken");      
const mongoose = require("mongoose");
const { 
  ProductSchema, 
  VegProductsSchema, 
  NonVegProductsSchema, 
  MilkBreadSchema, 
  FruitsVegSchema, 
  orderSchema, 
  RegistrationSchema,
  HomeProductsSchema
} = require("./schema");

// MODELS
const ProductModel = mongoose.model("Product", ProductSchema);
const VegProductModel = mongoose.model("VegProduct", VegProductsSchema);
const NonVegProductModel = mongoose.model("NonVegProduct", NonVegProductsSchema);
const MilkBreadModel = mongoose.model("MilkBread", MilkBreadSchema);
const FruitsVegModel = mongoose.model("FruitsVeg", FruitsVegSchema);
const HomeProductsModel = mongoose.model("HomeProducts" ,HomeProductsSchema);
const OrderModel = mongoose.model("Orders", orderSchema);
const RegistrationModel = mongoose.model("Registration", RegistrationSchema);

// ---------------------- PRODUCT SERVICES ----------------------

const addProduct = (newProduct) => {
  return new ProductModel(newProduct).save();
};

const addProducts = (newProducts) => {
  return ProductModel.insertMany(newProducts);
};

const fetchAllProducts = async () => {
  return await ProductModel.find();
};

const fetchProductById = async (id) => {
  return await ProductModel.findOne({ id });
};

const deleteProduct = async (id) => {
  await ProductModel.deleteOne({ id });
};

const updateProduct = async (id, data) => {
  return await ProductModel.findByIdAndUpdate(id, data, { new: true });
};

// ------------------Home prodccts------------------
addHomeProducts = (newHomeProducts) =>{
  HomeProductsModel.insertMany(newHomeProducts);

};

const fetchAllHomeProducts = async () => {
  return await HomeProductsModel.find();
};


// ---------------------- VEG SERVICES ----------------------

const addVegProduct = (newVegProduct) => {
  return VegProductModel.insertMany(newVegProduct);
};

const fetchVegById = async (id) => {
  return await VegProductModel.find({ id });
};

const fetchAllVegProducts = async () => {
  return await VegProductModel.find();
};

// ---------------------- NON-VEG SERVICES ----------------------

const addNonVegProduct = (newNonVegProduct) => {
  return NonVegProductModel.insertMany(newNonVegProduct);
};

const fetchNonVegById = async (id) => {
  return await NonVegProductModel.find({ id });
};

const fetchAllNonVegProducts = async () => {
  return await NonVegProductModel.find();
};

// ---------------------- MILK & BREAD SERVICES ----------------------

const addMilkBreadItems = (newItems) => {
  return MilkBreadModel.insertMany(newItems);
};

const fetchAllMilkBreadProducts = async () => {
  return await MilkBreadModel.find();
};

const fetchMilkBreadItemsById = async (id) => {
  return await MilkBreadModel.find({ id });
};

// ---------------------- FRUITS & VEG SERVICES ----------------------

const addFruitsVegItems = (newItems) => {
  return FruitsVegModel.insertMany(newItems);
};

const fetchAllFruitsVegProducts = async () => {
  return await FruitsVegModel.find();
};

const fetchFruitsVegById = async (id) => {
  return await FruitsVegModel.find({ id });
};



// ---------------------- ORDER SERVICES ----------------------

const createNewOrder = (orderDetails) => {
  return new OrderModel(orderDetails).save();
};

const fetchAllOrders = async () => {
  return await OrderModel.find();
};

// ---------------------- REGISTRATION SERVICE ----------------------

const registerUser = async (userData) => {
  const { name, email, password, phone } = userData;

  // check if email already exists
  const existingUser = await RegistrationModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // create new user
  const newUser = await RegistrationModel.create({ name, email, password, phone });
  return newUser;
};


// ================login form

const loginService = async ({ email, password }) => {
  try {
    // Check if email exists
    const user = await RegistrationModel.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "Email not found",
      };
    }

    // Compare password (plain text comparison because you are not using bcrypt)
    if (user.password !== password) {
      return {
        success: false,
        message: "Incorrect password",
      };
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "7d" }
    );

    // Successful login response
    return {
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token: token,
    };

  } catch (error) {
    return {
      success: false,
      message: "Login failed",
      error: error.message,
    };
  }
};



// ---------------------- EXPORT ----------------------

module.exports = {
  // Product
  addProduct,
  addProducts,
  fetchAllProducts,
  fetchProductById,
  deleteProduct,
  updateProduct,

  // Home Products
  addHomeProducts,
  HomeProductsModel,
  fetchAllHomeProducts,

  // Veg
  addVegProduct,
  fetchVegById,
  fetchAllVegProducts,

  // Non-Veg
  addNonVegProduct,
  fetchNonVegById,
  fetchAllNonVegProducts,

  // Milk & Bread
  addMilkBreadItems,
  fetchAllMilkBreadProducts,
  fetchMilkBreadItemsById,

  // Fruits & Veg
  addFruitsVegItems,
  fetchAllFruitsVegProducts,
  fetchFruitsVegById,


  // Orders
  createNewOrder,
  fetchAllOrders,

  // Registration
  registerUser,

  // Login
  loginService,

  // Models (if needed)
  ProductModel,
  VegProductModel,
  NonVegProductModel,
  MilkBreadModel,
  FruitsVegModel,
  OrderModel,
  RegistrationModel,
};
