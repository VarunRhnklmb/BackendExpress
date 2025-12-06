
// creatr new route instance
const router = require('express').Router();

const authMiddleware = require('./authentication');
// import controller methods
const { getAllProducts ,
        getProductById , 
        createProduct ,
        createProducts ,
        createOrder,
        getAllOrders,
        updateProductById ,
        partialUpdateById ,
        deleteProductById ,
        createVegProducts ,
        createNonVegProducts ,
        createHomeProducts,
        getVegById, 
        getAllVegProducts,
        getNonVegById,
        registeration,
        loginUser,
        } = require('./productController');
//   const { vegProducts } = require('./Schema');

// define a simple route
// router.get('/getAll', getAllproducts);

// POST /api/users/register
router.post("/register", registeration);

// ===============POST: /api/users/login====================
router.post("/login", loginUser);


router.use(authMiddleware);

// define getbyid from database
 router.get('/getProductById/:id', getProductById);

// post call
router.post("/save" , createProduct);

// post call save all products
router.post("/saveAll" , createProducts);

// get products from database
router.get("/getAll" ,getAllProducts)

// delete item by id
router.delete("/deleteById/:id" , deleteProductById);

// put call 
router.put("/updateProduct/:id" , updateProductById);

// patch call
router.patch("/partialUpdate/:id" , partialUpdateById );

// post home products
router.post("/homeProducts" , createHomeProducts);

// get all home products
router.get("/homeProducts/getAll" , getAllHomeProducts);

// post veg products
router.post("/vegproducts/save" , createVegProducts);
// get all veg products
router.get("/vegproducts/getAll" , getAllVegProducts);

// get vegProducts
router.get("/getVeg/:id" , getVegById)

// post nonveg
router.post("/nonveg/save", createNonVegProducts);

// get nonveg by id
router.get("/nonveg/getAll" , getAllNonVegProducts);

// get nonveg by id
router.get("/getNonVeg/:id" , getNonVegById);

// post milkbread items
router.post("/milkbread/save", createmilkBreadItems);

// get all milkbread items
router.get("/milkbread/getAll", getAllMilkBreadProducts);

// get milkbread items by id
router.get("/getMilkBread/:id", getmilkBreadItemsById);

// post fruitsveg items
router.post("/fruitsveg/save", createFruitsVegItems);

// get all fruitsveg items
router.get("/fruitsveg/getAll", getAllFruitsVegProducts);

// get fruitsveg items by id
router.get("/getFruitsVeg/:id", getFruitsVegItemsById);

// post order
router.post("/orders", createOrder);

// get all orders
router.get("/orders/getAll", getAllOrders);





// export the router
module.exports = router;