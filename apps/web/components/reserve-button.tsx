"use client";
import { useState } from "react";
import { API_URL } from "../lib/api";

function sessionId() {
  const key = "inspire-session-id";
  let value = window.localStorage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    window.localStorage.setItem(key, value);
  }
  return value;
}

export function ReserveButton({ productId }: { productId: number }) {
  const [message, setMessage] = useState("");

  async function reserve() {
    setMessage("Réservation…");
    const response = await fetch(`${API_URL}/api/v1/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, quantity: 1, session_id: sessionId() }),
    });
    const payload = await response.json();
    setMessage(response.ok ? "Réservé pendant 15 minutes ✓" : (payload.detail ?? "Réservation impossible"));
  }

  return (
    <div className="mt-4">
      <button onClick={reserve} className="w-full border border-black px-8 py-4 text-xs uppercase tracking-[0.18em] transition hover:bg-black hover:text-white">
        Réserver pendant 15 minutes
      </button>
      {message && <p className="mt-3 text-center text-sm text-neutral-600">{message}</p>}
    </div>
  );
}
