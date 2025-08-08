import { Router } from "express";
import roomRoutes from "./room.route";
import subjectRoutes from "./subject.route";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";

const routes = Router();

routes.use('/room', roomRoutes);
routes.use('/subject', subjectRoutes);
routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);

export default routes;