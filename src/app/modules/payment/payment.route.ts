import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), PaymentController.getAllPayment);

router.post("/init", PaymentController.initPayment)

router.post("/webhook", PaymentController.webHook)





export const PaymentRoutes = router
