import { Router } from "express";
import { getTimeToken, loginMethod, updateToken, getAllUsers,
        getUserByUsername, saveUser, updateUser, deleteUser} from '../controllers/auth.controller';
import { createOrder, deleteOrder, getOrder, updateOrder } from "../controllers/order.controller";
import { createProduct, getProducts, updateProducts, deleteProduct } from "../controllers/product.controller";
import { createRole, getRole } from "../controllers/role.controller";
import { createMenu, getMenuRol } from "../controllers/menu.controller";

const router = Router();

//Controlador de USER CRUD 
router.post('/login-user',loginMethod);
router.post('/saveusers', saveUser);
router.get('/time', getTimeToken);
router.get('/get-users', getAllUsers);
router.get('/getUsername/:username', getUserByUsername)
router.put('/update/:userId', updateToken);
router.put('/update-user/:userId', updateUser);
router.patch('/delete-user/:userId', deleteUser);

//Controlador para ORDER CRUD
router.post('/createOrder', createOrder);
router.get('/getAllOrders', getOrder);
router.put('/updateOrder/:orderId', updateOrder);
router.patch('/deleteOrder/:orderId', deleteOrder);

//Controlador para PRODUCT CRUD
router.post('/createProduct', createProduct);
router.get('/getAllProducts', getProducts);
router.put('/updateProducts/:productID', updateProducts);
router.patch('/deleteProduct/:productID', deleteProduct);

//Controlador para ROLE CRUD
router.post('/createRol', createRole);
router.get('/getAllRoles', getRole);

//Controlador para Menu CRUD
router.post('/createMenu', createMenu);
router.get('/getMenu/:type', getMenuRol);

export default router;