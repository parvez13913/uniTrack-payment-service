import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { PaymentServiec } from "./payment.service";
import sendResponse from "../../../shared/response";

const initPayment = async (req: Request, res: Response, Next: NextFunction) => {
  const result = await PaymentServiec.initPayment(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment init successfully",
    data: result
  });
}

const webHook = async (req: Request, res: Response, Next: NextFunction) => {
  const result = await PaymentServiec.webHook(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment verified!",
    data: result
  });
}



export const PaymentController = {
  initPayment,
  webHook
}