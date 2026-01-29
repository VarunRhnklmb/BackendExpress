const {
  fetchAllProducts,
  fetchProductById,
  addProduct,
  addProducts,
  addVegProduct,
  addNonVegProduct,
  addMilkBreadItems,
  addFruitsVegItems,
  fetchAllVegProducts,
  fetchVegById,
  fetchNonVegById,
  fetchAllNonVegProducts,
  fetchMilkBreadItemsById,
  fetchFruitsVegById,
  fetchAllMilkBreadProducts,
  fetchAllFruitsVegProducts,
  addHomeProducts,
  fetchAllHomeProducts,
  deleteProduct,
  updateProduct,
  createNewOrder,
  fetchAllOrders,
  registerUser,
  loginService,
} = require("./productService");
const jwt = require("jsonwebtoken");

const {
  ProductSchema,
  VegProductsSchema,
  NonVegProductsSchema,
  MilkBreadSchema,
  FruitsVegSchema,
  HomeProductsSchema
} = require("./schema");


// ------------------------- PRODUCT CONTROLLERS -------------------------

createProduct = (req, res) => {
  const newProduct = req.body;
  addProduct(newProduct);
  res.json({ success: true, message: "Product added successfully" });
};

createProducts = (req, res) => {
  const newProducts = req.body;
  addProducts(newProducts);
  res.json({ success: true, message: "Products saved successfully" });
};

getAllProducts = async (req, res) => {
  const products = await fetchAllProducts();
  res.json({ success: true, data: products });
};

getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await fetchProductById(id);
  res.json({ success: true, data: product });
};

deleteProductById = (req, res) => {
  const id = parseInt(req.params.id);
  deleteProduct(id);
  res.json({ success: true, message: "Product deleted successfully" });
};

updateProductById = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  updateProduct(id, updatedData);
  res.json({ success: true, message: "Product updated successfully" });
};

partialUpdateById = (req, res) => {
  const id = req.params.id;
  const updatedFields = req.body;
  const updatedProduct = updateProduct(id, updatedFields);
  res.json({ success: true, data: updatedProduct });
};

// ----------------------Home products---------------
// post home products
const createHomeProducts = (req, res) => {
  let newHomeProducts = req.body;
  addHomeProducts(newHomeProducts);
  res.send("Home products saved successfully")
};

getAllHomeProducts = async (req, res) => {
  try {
    const homeItems = await fetchAllHomeProducts();
    res.json({ success: true, data: homeItems });
  } catch (error) {
    console.error("Error fetching home products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch home products", error: error.message });
  }
};

// ------------------------- VEG CONTROLLERS -------------------------

createVegProducts = async (req, res) => {
  const newVeg = req.body;
  await addVegProduct(newVeg);
  res.json({ success: true, message: "Veg product saved successfully" });
};

getVegById = async (req, res) => {
  const id = parseInt(req.params.id);
  const vegItem = await fetchVegById(id);
  res.json({ success: true, data: vegItem });
};

getAllVegProducts = async (req, res) => {
  const vegItems = await fetchAllVegProducts();
  res.json({ success: true, data: vegItems });
};


// ------------------------- NON-VEG CONTROLLERS -------------------------

createNonVegProducts = (req, res) => {
  const newProduct = req.body;
  addNonVegProduct(newProduct);
  res.json({ success: true, message: "Non-veg product saved successfully" });
};

getNonVegById = async (req, res) => {
  const id = parseInt(req.params.id);
  const item = await fetchNonVegById(id);
  res.json({ success: true, data: item });
};

getAllNonVegProducts = async (req, res) => {
  const items = await fetchAllNonVegProducts();
  res.json({ success: true, data: items });
};


// ------------------------- MILK & BREAD CONTROLLERS -------------------------

createmilkBreadItems = (req, res) => {
  const items = req.body;
  addMilkBreadItems(items);
  res.json({ success: true, message: "Milk & Bread items saved successfully" });
};

getAllMilkBreadProducts = async (req, res) => {
  const items = await fetchAllMilkBreadProducts();
  res.json({ success: true, data: items });
};

getmilkBreadItemsById = async (req, res) => {
  const id = parseInt(req.params.id);
  const item = await fetchMilkBreadItemsById(id);
  res.json({ success: true, data: item });
};


// ------------------------- FRUITS & VEG CONTROLLERS -------------------------

createFruitsVegItems = (req, res) => {
  const items = req.body;
  addFruitsVegItems(items);
  res.json({ success: true, message: "Fruits & Vegetables saved successfully" });
};

getAllFruitsVegProducts = async (req, res) => {
  const items = await fetchAllFruitsVegProducts();
  res.json({ success: true, data: items });
};

getFruitsVegItemsById = async (req, res) => {
  const id = parseInt(req.params.id);
  const item = await fetchFruitsVegById(id);
  res.json({ success: true, data: item });
};


// ------------------------- ORDER CONTROLLERS -------------------------
const createOrder = (req, res) => {

  // get the order details from the request body
  let orderDetails = req.body;

  // send the data to service function to create the order
  createNewOrder(orderDetails);

  // respond with a success message
  res.send("Order created successfully");
};

// get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await fetchAllOrders();
    return res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  }

  catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Registration form 
registeration = async (req, res) => {
  try {
    const response = await registerUser(req.body);

    res.status(201).json({

      message: "User Registered Successfully",

    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ================post login=======================



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call service layer
    const response = await loginService({ email, password });

    // If login fails
    if (!response.success) {
      return res.status(400).json({
        success: false,
        message: response.message,
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { email: response.user.email }, // payload
      process.env.JWT_SECRET || "mysecretkey", // secret key
      { expiresIn: "7d" } // token expiry
    );

    // Successful login
    res.status(200).json({
      success: true,
      message: response.message,
      user: response.user,
      token: token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};


// ------------------------- EXPORT ALL -------------------------

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  createProducts,
  deleteProductById,
  updateProductById,
  partialUpdateById,

  createVegProducts,
  getVegById,
  getAllVegProducts,

  createNonVegProducts,
  getNonVegById,
  getAllNonVegProducts,

  createmilkBreadItems,
  getmilkBreadItemsById,
  getAllMilkBreadProducts,

  createFruitsVegItems,
  getAllFruitsVegProducts,
  getFruitsVegItemsById,

  createHomeProducts,
  getAllHomeProducts,

  createOrder,
  getAllOrders,

  registeration,
  registerUser,

  loginUser,

};
