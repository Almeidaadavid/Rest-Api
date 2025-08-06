import { Router } from "express";
import { RoomController } from "../controllers/RoomController";

const roomRoutes = Router();

roomRoutes.post('/', new RoomController().create);
roomRoutes.post('/:idRoom/create', new RoomController().createVideo);
roomRoutes.post('/:idRoom/subject', new RoomController().roomSubject);
roomRoutes.get('/', new RoomController().list);

export default roomRoutes;