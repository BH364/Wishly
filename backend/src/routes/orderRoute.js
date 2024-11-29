import express from 'express';
import {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus,verifyStripe} from '../src/controllers/orderController.js';
import adminAuth from '../src/middleware/adminAuth.js.js';
import { authUser } from '../src/middleware/auth.js.js';
const orderRouter = express.Router();

orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);

orderRouter.post('/userorders',authUser,userOrders);

orderRouter.post('/verifyStripe',authUser,verifyStripe);

export default orderRouter;

