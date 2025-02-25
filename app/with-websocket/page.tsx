"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.API_BASE_URL, { autoConnect: false });

const WithWebSocket = () => {
  const [socketId, setSocketId] = useState("");
  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("socket-id", setSocketId);
    socket.on("payment-status", setPaymentStatus);

    return () => {
      socket.off("socket-id");
      socket.off("payment-status");
      socket.disconnect();
    };
  }, []);

  const handlePayment = async () => {
    try {
      await axios.post(
        `${process.env.API_BASE_URL}/api/payments/make-payment-with-socket`,
        {
          amount: 1000,
          socketId,
        }
      );
      setMakePayment(true);
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div>
      <p className="text-xl font-bold underline">With WebSocket</p>
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
        <p className="text-xl font-bold">
          Processing your payment, please wait...
        </p>
      )}
    </div>
  );
};

export default WithWebSocket;
