"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdateStockPage() {
  const router = useRouter();
  const { id } = useParams();

  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: Number(quantity),
        }),
      });

      // Go back to inventory page
      router.push("/");
    } catch (err) {
      console.error("Failed to update stock", err);
      alert("Error updating stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        padding: "24px",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          backgroundColor: "#020617",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,255,255,0.1)",
        }}
      >
        <h1 style={{ color: "#67e8f9", marginBottom: "20px" }}>
          Update Stock
        </h1>

        <p style={{ marginBottom: "12px", color: "#94a3b8" }}>
          Product ID: <strong>{id}</strong>
        </p>

        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: "20px" }}>
            <label>New Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "#334155" : "#06b6d4",
              color: "#020617",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Updating..." : "Update Stock"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "transparent",
              color: "#94a3b8",
              border: "1px solid #334155",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "4px",
  borderRadius: "4px",
  border: "1px solid #334155",
  backgroundColor: "#020617",
  color: "#ffffff",
};
