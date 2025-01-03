import { Router } from "express";

import controllerUser from "../controllers/user.controller";
import controllerLogin from "../controllers/login.controller";
import controllerTodo from "../controllers/todo.controller";

import { validUserData, validUserId } from "../middlewares/pipes/userPipe";
import { validUserLogin } from "../middlewares/pipes/loginPipe";
import { validTodoData, validTodoIdAndUserParams, validIdUserParam } from "../middlewares/pipes/todoPipe";
import { validUserJWTToken } from "../middlewares/auth/authToken";

const rotas = Router();

//rotas.get("/users/", controllerUser.gets)
rotas.get("/user/:id", validUserId, controllerUser.getUser)
rotas.post("/user/create", validUserData, controllerUser.createUser)
rotas.put("/user/modify/:id", validUserId, controllerUser.modifyUser)
rotas.delete("/user/delete/:id", validUserId, controllerUser.deleteUser)

rotas.post("/login", validUserLogin, controllerLogin.loginUser)
rotas.post("/login/valid-token", validUserJWTToken, controllerLogin.validUserToken);

rotas.get("/todos/:userId", validUserJWTToken, validIdUserParam, controllerTodo.getAllTodos)
rotas.get("/todos/:userId/:id", validUserJWTToken, validTodoIdAndUserParams, controllerTodo.getOneTodo)
rotas.post("/todos/create/", validUserJWTToken, validTodoData, controllerTodo.createTodo)
rotas.put("/todos/modify/:userId/:id", validUserJWTToken, validTodoIdAndUserParams, validTodoData, controllerTodo.modifyTodo)
rotas.delete("/todos/delete/:userId/:id", validUserJWTToken, validTodoIdAndUserParams, controllerTodo.deleteTodo)

export default rotas