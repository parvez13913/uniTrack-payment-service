/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { sslService } from "../ssl/ssl.service";


const initPayment = async (data: any) => {
  const paymentSession = await sslService.initPayment({
    total_amount: data?.amount,
    tran_id: data?.transactionId,
    cus_name: data?.studentName,
    cus_email: data?.studentEmail,
    cus_add1: data?.address,
    cus_phone: data?.phone,
  })
  await prisma.payment.create({
    data: {
      amount: data?.amount,
      transactionId: data?.transactionId,
      studentId: data?.studentId
    }
  })
  return paymentSession.redirectGatewayURL
};


const webHook = async (payload: any) => {
  if (!payload || !payload?.status || payload?.status !== "VALID") {
    return {
      message: "Invalid Payment!"
    }
  }
  const result = await sslService.validate(payload);

  if (result?.status !== 'VALID') {
    return {
      message: "Payment failed"
    }
  }

  const { tran_id } = result;
  await prisma.payment.updateMany({
    where: {
      transactionId: tran_id
    },
    data: {
      status: PaymentStatus.PAID,
      paymentGatewayData: payload,
    }
  })

  return {
    message: "Payment Success!"
  };
}

export const PaymentServiec = {
  initPayment,
  webHook
};
