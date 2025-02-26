import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>
        <Link
          href="/without-websocket"
          className="hover:underline text-blue-600"
        >
          Without WebSockets
        </Link>
      </p>
      <p>
        <Link href="/with-websocket" className="hover:underline text-blue-600">
          With WebSockets
        </Link>
      </p>
    </>
  );
}
