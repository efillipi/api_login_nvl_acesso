import { Router } from "express";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import PermissionController from "./controllers/PermissionController";
import RoleController from "./controllers/RoleController";
import ProductController from "./controllers/ProductController";

import { is } from "./middlewares/permission";

const router = Router();

router.post("/users", UserController.create);
router.get("/users", UserController.show);

router.post("/sessions", SessionController.create);

router.post("/permissions", PermissionController.create);
router.get("/permissions", PermissionController.show);

router.post("/roles", RoleController.create);
router.get("/roles", RoleController.show);

router.post(
  "/products",
  is(["ROLE_ADMIN"]),
  ProductController.create
);

router.get(
  "/products",
  is(["ROLE_ADMIN", "ROLE_USER","VIEW"]),
  ProductController.index
);
router.get(
  "/products/:id",
  is(["ROLE_ADMIN", "ROLE_USER"]),
  ProductController.show
);

export { router };
