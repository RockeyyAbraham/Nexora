import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const s = {
  page: { minHeight: "100vh", backgroundColor: "#f5f6f8", padding: "28px 24px", fontFamily: "'Inter', sans-serif" },
  container: { maxWidth: 960, margin: "0 auto" },
  breadcrumb: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", marginBottom: 24 },
  crumbLink: { color: "#16a34a", textDecoration: "none", fontWeight: 500 },
  card: {
    background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden",
    display: "flex", flexWrap: "wrap",
  },
  imgSide: { flex: "0 0 420px", maxWidth: "100%", position: "relative" },
  img: { width: "100%", height: "100%", objectFit: "cover", minHeight: 360, display: "block" },
  stockBadge: (ok) => ({
    position: "absolute", top: 16, left: 16, fontSize: 11, fontWeight: 700,
    padding: "4px 12px", borderRadius: 20,
    background: ok ? "#dcfce7" : "#fee2e2", color: ok ? "#166534" : "#991b1b",
  }),
  infoSide: { flex: 1, padding: "36px 36px 36px 32px", minWidth: 280 },
  category: { fontSize: 12, fontWeight: 600, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 },
  title: { fontSize: 26, fontWeight: 700, color: "#111827", margin: "0 0 16px", lineHeight: 1.3 },
  price: { fontSize: 36, fontWeight: 800, color: "#111827", margin: "0 0 4px" },
  priceUnit: { fontSize: 14, color: "#9ca3af", fontWeight: 400 },
  divider: { height: 1, background: "#f3f4f6", margin: "20px 0" },
  desc: { fontSize: 14, color: "#4b5563", lineHeight: 1.75, margin: "0 0 24px" },
  metaRow: { display: "flex", gap: 24, marginBottom: 24, flexWrap: "wrap" },
  metaChip: {
    display: "flex", alignItems: "center", gap: 6,
    background: "#f9fafb", border: "1px solid #e5e7eb",
    borderRadius: 8, padding: "8px 14px", fontSize: 13,
  },
  metaLabel: { color: "#9ca3af", marginRight: 2 },
  metaVal: { fontWeight: 600, color: "#111827" },
  qtyRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 },
  qtyLabel: { fontSize: 13, fontWeight: 500, color: "#374151" },
  qtyCtrl: {
    display: "flex", alignItems: "center", gap: 12,
    background: "#f3f4f6", borderRadius: 8, padding: "6px 12px",
  },
  qtyBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#374151", fontWeight: 700, lineHeight: 1, padding: "0 2px" },
  qtyNum: { fontSize: 15, fontWeight: 600, minWidth: 24, textAlign: "center" },
  addBtn: {
    width: "100%", padding: "14px 0", background: "#16a34a", color: "#fff",
    border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    transition: "background 0.15s", marginBottom: 12,
  },
  backLink: {
    display: "flex", alignItems: "center", gap: 4, color: "#6b7280", fontSize: 13,
    textDecoration: "none", marginTop: 4,
  },
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(r => setProduct(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTop: "3px solid #16a34a", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!product) return (
    <div style={{ textAlign: "center", padding: "80px 24px", fontFamily: "'Inter', sans-serif" }}>
      <span className="material-symbols-outlined" style={{ fontSize: 56, color: "#d1d5db" }}>inventory_2</span>
      <p style={{ fontSize: 18, fontWeight: 600, color: "#374151", margin: "12px 0 6px" }}>Product not found</p>
      <Link to="/products" style={{ color: "#16a34a", fontSize: 14 }}>← Back to products</Link>
    </div>
  );

  const inStock = product.stock > 0;

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Breadcrumb */}
        <div style={s.breadcrumb}>
          <Link to="/products" style={s.crumbLink}>Products</Link>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
          <span>{product.category}</span>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
          <span style={{ color: "#111827", fontWeight: 500 }}>{product.title}</span>
        </div>

        <div style={s.card}>
          {/* Image */}
          <div style={s.imgSide}>
            <img
              src={product.imageUrl || "https://placehold.co/600x400?text=🥛"}
              alt={product.title}
              style={s.img}
              onError={e => { e.target.src = "https://placehold.co/600x400?text=🥛"; }}
            />
            <span style={s.stockBadge(inStock)}>{inStock ? "IN STOCK" : "OUT OF STOCK"}</span>
          </div>

          {/* Info */}
          <div style={s.infoSide}>
            <p style={s.category}>{product.category}</p>
            <h1 style={s.title}>{product.title}</h1>
            <p style={s.price}>
              ₹{product.price}
              <span style={s.priceUnit}> /unit</span>
            </p>

            <div style={s.divider} />

            <p style={s.desc}>{product.description || "Fresh, high-quality dairy product delivered directly to your door."}</p>

            {/* Meta chips */}
            <div style={s.metaRow}>
              <div style={s.metaChip}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#9ca3af" }}>inventory_2</span>
                <span style={s.metaLabel}>Stock:</span>
                <span style={s.metaVal}>{product.stock}</span>
              </div>
              <div style={s.metaChip}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#9ca3af" }}>label</span>
                <span style={s.metaLabel}>SKU:</span>
                <span style={s.metaVal}>{product._id?.slice(-6).toUpperCase()}</span>
              </div>
            </div>

            {/* Qty */}
            <div style={s.qtyRow}>
              <span style={s.qtyLabel}>Quantity</span>
              <div style={s.qtyCtrl}>
                <button style={s.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span style={s.qtyNum}>{qty}</span>
                <button style={s.qtyBtn} onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </div>

            <button
              style={{ ...s.addBtn, background: added ? "#166534" : inStock ? "#16a34a" : "#9ca3af", cursor: inStock ? "pointer" : "not-allowed" }}
              onClick={handleAdd}
              disabled={!inStock}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{added ? "check_circle" : "shopping_cart"}</span>
              {added ? "Added to Cart!" : inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            <Link to="/products" style={s.backLink}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
