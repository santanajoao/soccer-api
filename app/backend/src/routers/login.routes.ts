import { Router } from 'express';
import JWT from '../auth/JWT';
import LoginController from '../controller/LoginController';
import LoginService from '../services/LoginService';
import LoginValidator from '../services/validations/LoginValidator';
import UserModel from '../models/UserModel';
import Bcrypt from '../auth/Bcrypt';

const router = Router();

const userModel = new UserModel();
const encrypter = new Bcrypt();

const loginValidator = new LoginValidator(userModel, encrypter);
const tokenManager = new JWT();

const loginService = new LoginService(loginValidator, tokenManager);
const loginController = new LoginController(loginService);

router.post('/', loginController.handlePostLogin);

export default router;
