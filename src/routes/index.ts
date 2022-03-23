import { Router } from "express";

import classifyRoute from "./classify.route";

const router = Router();

const defaultRoutes = [
  {
    path: '/classify',
    route: classifyRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
