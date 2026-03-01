import express from "express"
import { create, getAllUsers, getUserById, update } from "../controller/userController.js"
const route = express.Router();

// create a new user
route.post("/user", create);

// fetch all users (support both singular and plural paths)
route.get(["/user", "/users"], getAllUsers);
route.get("/user/:id",getUserById)
// allow update via both paths (legacy and RESTful)
route.put(["/update/user/:id", "/user/:id"], update)

export default route;
