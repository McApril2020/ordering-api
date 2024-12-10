import { Router } from "express";
import items from '../controller/items.js';
import login from '../controller/login.js';
import users from '../controller/users.js';
import products from '../controller/products.js';
import order from '../controller/order.js';
import signup from "../controller/signup.js";
import loggedUser from '../controller/loggedUser.js';
import logout from '../controller/logout.js';
import auths from '../controller/middleware/authenticate.js';
import getorders from '../controller/getorders.js';

const {auth,auth_user} = auths;

const router = Router();

router.get('/items', items);
router.post('/login', login);
// router.get('/users', users);
router.post('/loggedUser', loggedUser);
router.post('/products',products);
router.post('/order',auth, order);
router.get('/getorders/:id', auth_user, getorders);
router.post('/signup', signup);
router.get('/logout', logout);


export default router;