"use client";
import useCheckWalletConnection from "../hooks/useCheckWalletConnection";

export default function Dashboard() {
  useCheckWalletConnection();

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
}
