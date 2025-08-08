import { Router } from "express";
import { UserController } from "../controllers/UserController";
import auth from "../middlewares/authMiddleware";

const userRoutes = Router();
userRoutes.post('/', new UserController().create);
userRoutes.get('/profile', auth, new UserController().getProfile);
export default userRoutes;