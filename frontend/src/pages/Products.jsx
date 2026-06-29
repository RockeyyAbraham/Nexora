import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CATEGORIES = [
  { label: "All",          icon: "apps" },
  { label: "Milk",         icon: "water_drop" },
  { label: "Cheese",       icon: "lunch_dining" },
  { label: "Butter",       icon: "bakery_dining" },
  { label: "Curd & Yogurt",icon: "emoji_food_beverage" },
  { label: "Ghee",         icon: "local_fire_department" },
  { label: "Paneer",       icon: "set_meal" },
];

const s = {
  page: { display: "flex", minHeight: "100vh", backgroundColor: "#f5f6f8", fontFamily: "'Inter', sans-serif" },
  sidebar: {
    width: 220, flexShrink: 0, backgroundColor: "#fff",
    borderRight: "1px solid #e8eaed", padding: "24px 0",
    position: "sticky", top: 64, height: "calc(100vh - 64px)", overflowY: "auto",
  },
  sidebarLabel: { fontSize: 11, fontWeight: 600, color: "#9aa0ab", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 20px 12px" },
  catItem: (active) => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 20px", cursor: "pointer", fontSize: 14, fontWeight: active ? 600 : 400,
    color: active ? "#fff" : "#374151",
    backgroundColor: active ? "#16a34a" : "transparent",
    borderRadius: active ? "0 24px 24px 0" : 0,
    marginRight: 12, transition: "all 0.15s",
  }),
  main: { flex: 1, padding: "24px 28px" },
  hero: {
    background: "linear-gradient(135deg, #eefbf0 0%, #f0f9ff 100%)",
    border: "1px solid #d1fae5", borderRadius: 16,
    padding: "36px 40px", marginBottom: 28,
  },
  heroTitle: { fontSize: 28, fontWeight: 700, color: "#1a3a2a", margin: "0 0 6px" },
  heroSub: { fontSize: 14, color: "#4b7a5e", margin: "0 0 24px" },
  heroSearch: {
    display: "flex", maxWidth: 440,
    background: "#fff", borderRadius: 10, border: "1px solid #d1d5db",
    overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  heroInput: {
    flex: 1, padding: "11px 16px", fontSize: 14, border: "none",
    outline: "none", color: "#111827", background: "transparent",
  },
  heroBtn: {
    padding: "11px 20px", background: "#16a34a", color: "#fff",
    border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600,
  },
  sectionHeader: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 },
  sectionSub: { fontSize: 13, color: "#6b7280" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 },
  card: {
    background: "#fff", borderRadius: 14, overflow: "hidden",
    border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    transition: "box-shadow 0.2s, transform 0.2s",
  },
  imgWrap: { position: "relative", height: 190, overflow: "hidden" },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  topBadge: {
    position: "absolute", top: 10, left: 10,
    fontSize: 10, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
    padding: "3px 8px", borderRadius: 20, background: "#16a34a", color: "#fff",
  },
  stockChip: (inStock) => ({
    fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
    background: inStock ? "#dcfce7" : "#fee2e2",
    color: inStock ? "#166534" : "#991b1b",
    whiteSpace: "nowrap",
  }),
  cardBody: { padding: "14px 16px 16px" },
  cardTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6, marginBottom: 4 },
  cardName: { fontSize: 15, fontWeight: 600, color: "#111827", margin: 0, flex: 1, lineHeight: 1.3 },
  cardDesc: { fontSize: 12, color: "#6b7280", margin: "0 0 10px", lineHeight: 1.5, minHeight: 34 },
  cardPriceRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  cardPrice: { fontSize: 22, fontWeight: 700, color: "#111827" },
  cardPriceUnit: { fontSize: 12, color: "#9ca3af", fontWeight: 400 },
  cardSku: { fontSize: 11, color: "#9ca3af" },
  addBtn: {
    width: "100%", padding: "10px 0", background: "#16a34a", color: "#fff",
    border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
    transition: "background 0.15s",
  },
  emptyState: { textAlign: "center", padding: "60px 0", color: "#9ca3af" },
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [addedMap, setAddedMap] = useState({});
  const { addToCart } = useCart();

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    let list = products;
    if (activeCategory !== "All") {
      list = list.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());
    }
    if (search.trim()) {
      list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    setFiltered(list);
  }, [search, activeCategory, products]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
      setFiltered(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleAdd = (product) => {
    addToCart(product);
    setAddedMap(prev => ({ ...prev, [product._id]: true }));
    setTimeout(() => setAddedMap(prev => ({ ...prev, [product._id]: false })), 1500);
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTop: "3px solid #16a34a", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={s.page}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <p style={s.sidebarLabel}>Categories</p>
        {CATEGORIES.map(({ label, icon }) => (
          <div key={label} style={s.catItem(activeCategory === label)} onClick={() => setActiveCategory(label)}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>
            {label}
          </div>
        ))}
      </aside>

      {/* Main */}
      <main style={s.main}>
        {/* Hero — no image */}
        <div style={s.hero}>
          <h1 style={s.heroTitle}>Fresh Dairy, Delivered Daily.</h1>
          <p style={s.heroSub}>Directly from our farms to your doorstep within 4 hours. No preservatives, just pure freshness.</p>
          <div style={s.heroSearch}>
            <span className="material-symbols-outlined" style={{ padding: "11px 0 11px 14px", fontSize: 18, color: "#9ca3af" }}>search</span>
            <input
              style={s.heroInput}
              placeholder="What are you looking for?"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button style={s.heroBtn}>Search</button>
          </div>
        </div>

        {/* Section header */}
        <div style={s.sectionHeader}>
          <div>
            <h2 style={s.sectionTitle}>Available Products</h2>
            <p style={s.sectionSub}>Showing {filtered.length} items in {activeCategory}</p>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={s.emptyState}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, display: "block", marginBottom: 12 }}>search_off</span>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>No products found</p>
            <p style={{ fontSize: 13 }}>Try a different search or category</p>
          </div>
        ) : (
          <div style={s.grid}>
            {filtered.map((product, idx) => {
              const inStock = product.stock > 0;
              const isTopRated = idx === 0;
              const added = addedMap[product._id];
              return (
                <div
                  key={product._id}
                  style={s.card}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "none"; }}
                >
                  <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                    <div style={s.imgWrap}>
                      <img
                        src={product.imageUrl || "https://placehold.co/400x300?text=🥛"}
                        alt={product.title}
                        style={s.cardImg}
                        onError={e => { e.target.src = "https://placehold.co/400x300?text=🥛"; }}
                      />
                      {isTopRated && <span style={s.topBadge}>TOP RATED</span>}
                    </div>
                  </Link>
                  <div style={s.cardBody}>
                    <div style={s.cardTop}>
                      <p style={s.cardName}>{product.title}</p>
                      <span style={s.stockChip(inStock)}>{inStock ? "IN STOCK" : "OUT"}</span>
                    </div>
                    <p style={s.cardDesc}>{product.description || `Fresh ${product.category} product.`}</p>
                    <div style={s.cardPriceRow}>
                      <div>
                        <span style={s.cardPrice}>₹{product.price}</span>
                        <span style={s.cardPriceUnit}> /unit</span>
                      </div>
                      <span style={s.cardSku}>SKU: {product._id?.slice(-6).toUpperCase()}</span>
                    </div>
                    <button
                      style={{ ...s.addBtn, background: added ? "#166534" : inStock ? "#16a34a" : "#9ca3af", cursor: inStock ? "pointer" : "not-allowed" }}
                      onClick={() => inStock && handleAdd(product)}
                      disabled={!inStock}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{added ? "check" : "shopping_cart"}</span>
                      {added ? "Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
