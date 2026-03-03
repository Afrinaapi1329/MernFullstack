import express from "express"
import { create, getAllUsers, getUserById, update, deleteUser } from "../controller/userController.js"
const route = express.Router();

// create a new user
route.post("/user", create);

// fetch all users (support both singular and plural paths)
route.get(["/user", "/users"], getAllUsers);
route.get("/user/:id",getUserById)
// allow update via both paths (legacy and RESTful)
route.put(["/update/user/:id", "/user/:id"], update)

// delete a user by id (support both paths)
route.delete(["/delete/user/:id", "/user/:id"], deleteUser);

export default route;
