import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { PaymentService } from "./payment.service";
import sendResponse from "../../../shared/response";
import { paymentFilterableFields } from './payment.constants';
import pick from '../../../shared/pick';

const initPayment = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const result = await PaymentService.initPayment(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment init successfully",
      data: result
    });
  } catch (error) {
    Next(error);
  }
}

const webHook = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const result = await PaymentService.webHook(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment verified!",
      data: result
    });
  } catch (error) {
    Next(error);
  }
}

const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, paymentFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await PaymentService.getAllPayments(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payments fetched successfully',
      meta: result.meta,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await PaymentService.getSinglePayment(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment fetched successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};



export const PaymentController = {
  initPayment,
  webHook,
  getAllPayments,
  getSinglePayment
}