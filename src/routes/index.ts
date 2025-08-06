import { Router } from "express";
import roomRoutes from "./room.route";
import subjectRoutes from "./subject.route";

const routes = Router();

routes.use('/room', roomRoutes);
routes.use('/subject', subjectRoutes);

export default routes;