import { Router } from "express";
import { getTimeToken, loginMethod, updateToken, getAllUsers, getUserByUsername, saveUser, updateUser, deleteUser} from '../controllers/auth.controller';
import { createOrder, getOrder } from "../controllers/order.controller";
import { createProduct, getProducts } from "../controllers/product.controller";
import { createRole, getRole } from "../controllers/role.controller";

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

//Controlador para PRODUCT CRUD
router.post('/createProduct', createProduct);
router.get('/getAllProducts', getProducts);

//Controlador para ROLE CRUD
router.post('/createRol', createRole);
router.get('/getAllRoles', getRole);

export default router;