import express from 'express';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.post("/init", PaymentController.initPayment)

router.post("/webhook", PaymentController.webHook)





export const PaymentRoutes = router
