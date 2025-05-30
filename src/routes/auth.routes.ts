import { Router } from "express";
import { getTimeToken, loginMethod, updateToken, getAllUsers, getUserByUsername, saveUser, updateUser, deleteUser} from '../controllers/auth.controller';

const router = Router();

router.post('/login-user',loginMethod);

router.post('/saveusers', saveUser);

router.get('/time', getTimeToken);

router.get('/get-users', getAllUsers);

router.get('/getUsername/:username', getUserByUsername)

router.put('/update/:userId', updateToken);

router.put('/update-user/:userId', updateUser);

router.patch('/delete-user/:userId', deleteUser);

export default router;