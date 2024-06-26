import { NextFunction, Request, Response } from "express";
import { PaymentServiec } from "./payment.service";

const initPayment = async (req: Request, res: Response, Next: NextFunction) => {
  const result = await PaymentServiec.initPayment(req.body);
  res.send(result)
}



export const PaymentController = {
  initPayment
}