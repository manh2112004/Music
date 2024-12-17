import { Router } from "express";
import * as controller from '../../controllers/admin/topic.controller';
const route: Router = Router();

route.get('/', controller.index);

export const topicRoutes: Router = route;