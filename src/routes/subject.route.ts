import { Router } from "express";
import { SubjectController } from "../controllers/SubjectController";

const subjectRoutes = Router();

subjectRoutes.post('/', new SubjectController().create);

export default subjectRoutes;