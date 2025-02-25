"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// initializing the connection
const socket = io("http://localhost:8000");

export default function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("socket message", message);
    });

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios(
          "http://localhost:8000/api/payments/get-data"
        );
        if (response.status === 200) {
          setData(response.data.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    getData();
  }, []);
  return (
    <>
      <p className="text-xl font-bold">Web sockets</p>
      {data}
    </>
  );
}
