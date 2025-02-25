"use client";
import axios from "axios";
import { useState } from "react";

const WithoutWebSocket = () => {
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [makePayment, setMakePayment] = useState(false);

  const handlePayment = async () => {
    try {
      await axios.post(
        `${process.env.API_BASE_URL}/api/payments/make-payment`,
        {
          amount: 1000,
        }
      );
      setMakePayment(true);
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.API_BASE_URL}/api/payments/payment-status`
      );
      setPaymentStatus(data.paymentStatus);
    } catch (error) {
      console.error("Status Check Error:", error);
    }
  };

  return (
    <div>
      <p className="text-xl font-bold underline">Without WebSocket</p>
      {!makePayment ? (
        <button className="button-30" onClick={handlePayment}>
          Make Payment
        </button>
      ) : paymentStatus ? (
        <>
          <p className="text-xl font-bold text-green-600">Payment success</p>
          <button className="button-30">Proceed</button>
        </>
      ) : (
        <>
          <p className="text-xl font-bold">
            Processing your payment, please wait...
          </p>
          <button
            className="button-30"
            onClick={checkPaymentStatus}
            disabled={paymentStatus}
          >
            Check Payment Status
          </button>
        </>
      )}
    </div>
  );
};

export default WithoutWebSocket;
