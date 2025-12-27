"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function InventoryHome() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  /* ---------- Screen size ---------- */
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 425);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- Fetch products ---------- */
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.map((p) => ({
            ...p,
            isDamaged: p.isDamaged || false,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ---------- Toggle damaged (UI only) ---------- */
  const toggleDamaged = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, isDamaged: !p.isDamaged } : p
      )
    );
  };

  /* ---------- Delete ---------- */
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/products/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  /* ---------- Filter ---------- */
  const filteredProducts = products.filter((p) => {
    if (filter === "DAMAGED") return p.isDamaged;
    if (filter === "OUT OF STOCK") return p.quantity === 0;
    if (filter === "LOW STOCK")
      return p.quantity > 0 && p.quantity < p.minStock;
    if (filter === "IN STOCK") return p.quantity >= p.minStock;
    return true;
  });

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={{ color: "#67e8f9" }}>Inventory</h1>
          <button
            onClick={() => router.push("/add-product")}
            style={btnPrimary}
          >
            + Add Product
          </button>
        </div>

        {/* Filters */}
        <div style={filterRow}>
          {[
            ["ALL", "All"],
            ["IN STOCK", "In Stock"],
            ["LOW STOCK", "Low Stock"],
            ["OUT OF STOCK", "Out of Stock"],
            ["DAMAGED", "Damaged ⭐"],
          ].map(([k, v]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              style={{
                ...btnFilter,
                backgroundColor:
                  filter === k ? "#06b6d4" : "transparent",
                color: filter === k ? "#020617" : "#94a3b8",
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {loading && <p>Loading...</p>}

        {!loading && filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", color: "#94a3b8" }}>
            No products found
          </p>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div style={{ overflowX: isSmallScreen ? "auto" : "visible" }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ color: "#cbd5f5" }}>
                  <th>⭐</th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th style={{ textAlign: "center" }}>Update</th>
                  <th style={{ textAlign: "center" }}>Delete</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((p) => {
                  const out = p.quantity === 0;
                  const low =
                    p.quantity > 0 && p.quantity < p.minStock;

                  return (
                    <tr
                      key={p._id}
                      style={{
                        backgroundColor: p.isDamaged
                          ? "rgba(234,179,8,0.08)"
                          : "#020617",
                      }}
                    >
                      <td style={td}>
                        <span
                          onClick={() => toggleDamaged(p._id)}
                          style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            color: p.isDamaged
                              ? "#facc15"
                              : "#475569",
                          }}
                        >
                          ★
                        </span>
                      </td>

                      <td style={td}>{p.name}</td>
                      <td style={{ ...td, color: "#94a3b8" }}>
                        {p.sku}
                      </td>
                      <td style={td}>{p.quantity}</td>

                      {/* STATUS — FULL TEXT */}
                      <td
                        style={{
                          ...td,
                          fontWeight: "bold",
                          color: p.isDamaged
                            ? "#facc15"
                            : out
                            ? "#9ca3af"
                            : low
                            ? "#f87171"
                            : "#22c55e",
                        }}
                      >
                        {p.isDamaged
                          ? "DAMAGED"
                          : out
                          ? "OUT OF STOCK"
                          : low
                          ? "LOW STOCK"
                          : "IN STOCK"}
                      </td>

                      <td style={{ ...td, textAlign: "center" }}>
                        <button
                          onClick={() =>
                            router.push(`/update-stock/${p._id}`)
                          }
                          style={btnUpdate}
                        >
                          Update
                        </button>
                      </td>

                      <td style={{ ...td, textAlign: "center" }}>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          style={btnDelete}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */
const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#0f172a",
  padding: "24px",
  color: "#ffffff",
  fontFamily: "Arial",
};

const cardStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  backgroundColor: "#020617",
  padding: "24px",
  borderRadius: "8px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const filterRow = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 6px",
  whiteSpace: "nowrap",
};

const td = {
  padding: "12px",
  whiteSpace: "nowrap",
};

const btnPrimary = {
  padding: "8px 14px",
  backgroundColor: "#06b6d4",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold",
  cursor: "pointer",
};

const btnFilter = {
  padding: "6px 12px",
  border: "1px solid #334155",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "13px",
};

const btnUpdate = {
  padding: "6px 10px",
  backgroundColor: "#1e40af",
  border: "none",
  borderRadius: "4px",
  color: "#fff",
  cursor: "pointer",
};

const btnDelete = {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  color: "#ef4444",
};
