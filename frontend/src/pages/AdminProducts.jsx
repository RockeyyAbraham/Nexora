import { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredDeleteBtn, setHoveredDeleteBtn] = useState(null);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  const [confirmDialog, setConfirmDialog] = useState({ visible: false, productId: null });

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };
  const [focusedField, setFocusedField] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Adjust root layout to full width (consistent with other admin pages)
  useEffect(() => {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.style.width = '100%';
      rootEl.style.maxWidth = 'none';
      rootEl.style.borderInline = 'none';
    }
    return () => {
      if (rootEl) {
        rootEl.style.width = '';
        rootEl.style.maxWidth = '';
        rootEl.style.borderInline = '';
      }
    };
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/products", {
        title,
        description,
        price,
        stock,
        category,
        imageUrl,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      showToast('Product added successfully');

      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImageUrl("");

      fetchProducts();
    } catch (error) {
      console.error(error);
      showToast('Failed to add product', 'error');
    }
  };

  const deleteProduct = (id) => {
    setConfirmDialog({ visible: true, productId: id });
  };

  const confirmDelete = async () => {
    const id = confirmDialog.productId;
    setConfirmDialog({ visible: false, productId: null });
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      showToast('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error(error);
      showToast('Failed to delete product', 'error');
    }
  };

  // ── Styles ────────────────────────────────────────────────────────────────

  // ── Confirm Dialog styles ─────────────────────────────────────────────────
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const dialogCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '32px 36px',
    maxWidth: '380px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    fontFamily: "'Inter', sans-serif",
    textAlign: 'center',
  };

  const dialogIconStyle = {
    fontSize: '36px',
    marginBottom: '12px',
  };

  const dialogTitleStyle = {
    fontSize: '17px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px',
  };

  const dialogSubtitleStyle = {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 24px',
  };

  const dialogActionsStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  };

  const cancelDialogBtnStyle = {
    padding: '9px 24px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
    transition: 'background-color 0.15s',
  };

  const confirmDialogBtnStyle = {
    padding: '9px 24px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
    transition: 'background-color 0.15s',
  };

  // ── Toast styles ──────────────────────────────────────────────────────────
  const toastStyle = {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: "'Inter', sans-serif",
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    color: '#ffffff',
    backgroundColor: toast.type === 'error' ? '#dc2626' : '#16a34a',
    opacity: toast.visible ? 1 : 0,
    transform: toast.visible ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    pointerEvents: 'none',
  };

  const toastIconStyle = {
    fontSize: '16px',
    flexShrink: 0,
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '32px 24px',
    fontFamily: "'Inter', sans-serif",
    color: '#0b1c30',
    boxSizing: 'border-box',
  };

  const innerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const pageHeaderStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    marginBottom: '28px',
  };

  const pageTitleStyle = {
    fontSize: '26px',
    fontWeight: '700',
    margin: 0,
    color: '#0b1c30',
  };

  const productCountBadgeStyle = {
    fontSize: '13px',
    color: '#6b7280',
    background: '#e5e7eb',
    padding: '2px 10px',
    borderRadius: '20px',
  };

  // Form card
  const formCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    padding: '28px 32px',
    marginBottom: '32px',
  };

  const formTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginTop: 0,
    marginBottom: '20px',
    paddingBottom: '14px',
    borderBottom: '1px solid #f3f4f6',
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  };

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#111827',
    border: focusedField === field ? '1.5px solid #16a34a' : '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
  });

  const textareaStyle = (field) => ({
    ...inputStyle(field),
    resize: 'vertical',
    minHeight: '80px',
  });

  const fullSpanStyle = {
    gridColumn: '1 / -1',
  };

  const submitBtnStyle = {
    marginTop: '4px',
    gridColumn: '1 / -1',
    padding: '11px 28px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: submitHovered ? '#15803d' : '#16a34a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
    alignSelf: 'flex-end',
    justifySelf: 'flex-start',
    fontFamily: "'Inter', sans-serif",
  };

  // Table card
  const tableCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  };

  const tableTitleBarStyle = {
    padding: '18px 24px',
    borderBottom: '1px solid #f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const tableTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
  };

  const thStyle = {
    textAlign: 'left',
    padding: '11px 20px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    borderBottom: '1px solid #f3f4f6',
    background: '#fafafa',
  };

  const trStyle = (id) => ({
    borderBottom: '1px solid #f3f4f6',
    backgroundColor: hoveredRow === id ? '#f0fdf4' : '#ffffff',
    transition: 'background-color 0.12s',
  });

  const tdStyle = {
    padding: '14px 20px',
    verticalAlign: 'middle',
    color: '#374151',
  };

  const productTitleTdStyle = {
    ...tdStyle,
    fontWeight: '500',
    color: '#111827',
  };

  const priceTdStyle = {
    ...tdStyle,
    fontWeight: '700',
    color: '#166534',
  };

  const stockTdStyle = (stock) => ({
    ...tdStyle,
    fontWeight: '500',
    color: stock > 10 ? '#374151' : '#b45309',
  });

  const categoryPillStyle = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    backgroundColor: '#dcfce7',
    color: '#166534',
  };

  const deleteBtnStyle = (id) => ({
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: '600',
    color: hoveredDeleteBtn === id ? '#ffffff' : '#dc2626',
    backgroundColor: hoveredDeleteBtn === id ? '#dc2626' : '#fee2e2',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: "'Inter', sans-serif",
  });

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '56px 0',
    color: '#9ca3af',
    fontSize: '14px',
  };

  return (
    <>
    {/* ── Confirm Delete Modal ─────────────────────────────── */}
    {confirmDialog.visible && (
      <div style={overlayStyle}>
        <div style={dialogCardStyle}>
          <div style={dialogIconStyle}>🗑️</div>
          <h3 style={dialogTitleStyle}>Delete Product?</h3>
          <p style={dialogSubtitleStyle}>This action cannot be undone. The product will be permanently removed.</p>
          <div style={dialogActionsStyle}>
            <button
              style={cancelDialogBtnStyle}
              onClick={() => setConfirmDialog({ visible: false, productId: null })}
            >
              Cancel
            </button>
            <button
              style={confirmDialogBtnStyle}
              onClick={confirmDelete}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ── Toast Notification ──────────────────────────────── */}
    <div style={toastStyle} role="alert" aria-live="polite">
      <span style={toastIconStyle}>{toast.type === 'error' ? '✕' : '✓'}</span>
      {toast.message}
    </div>

    <div style={pageStyle}>
      <div style={innerStyle}>

        {/* ── Page Header ─────────────────────────────────────── */}
        <div style={pageHeaderStyle}>
          <h1 style={pageTitleStyle}>Product Management</h1>
          <span style={productCountBadgeStyle}>{products.length} products</span>
        </div>

        {/* ── Add Product Form ─────────────────────────────────── */}
        <div style={formCardStyle}>
          <h2 style={formTitleStyle}>Add New Product</h2>
          <form onSubmit={addProduct}>
            <div style={formGridStyle}>

              {/* Title */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Fresh Cow Milk"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('title')}
                  required
                />
              </div>

              {/* Category */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Category</label>
                <input
                  type="text"
                  placeholder="e.g. Dairy"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onFocus={() => setFocusedField('category')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('category')}
                  required
                />
              </div>

              {/* Price */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 49"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('price')}
                  required
                />
              </div>

              {/* Stock */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Stock (units)</label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  onFocus={() => setFocusedField('stock')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('stock')}
                  required
                />
              </div>

              {/* Description — full width */}
              <div style={{ ...fieldStyle, ...fullSpanStyle }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  placeholder="Short product description…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  style={textareaStyle('description')}
                  required
                />
              </div>

              {/* Image URL — full width */}
              <div style={{ ...fieldStyle, ...fullSpanStyle }}>
                <label style={labelStyle}>Image URL (optional)</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onFocus={() => setFocusedField('imageUrl')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('imageUrl')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={submitBtnStyle}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
              >
                + Add Product
              </button>

            </div>
          </form>
        </div>

        {/* ── Products Table ───────────────────────────────────── */}
        <div style={tableCardStyle}>
          <div style={tableTitleBarStyle}>
            <h2 style={tableTitleStyle}>All Products</h2>
          </div>

          {products.length === 0 ? (
            <div style={emptyStateStyle}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>📦</span>
              No products found. Add one above.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Title</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Stock</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      style={trStyle(product._id)}
                      onMouseEnter={() => setHoveredRow(product._id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td style={productTitleTdStyle}>{product.title}</td>
                      <td style={tdStyle}>
                        <span style={categoryPillStyle}>{product.category}</span>
                      </td>
                      <td style={priceTdStyle}>₹{product.price}</td>
                      <td style={stockTdStyle(product.stock)}>{product.stock} units</td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          style={deleteBtnStyle(product._id)}
                          onMouseEnter={() => setHoveredDeleteBtn(product._id)}
                          onMouseLeave={() => setHoveredDeleteBtn(null)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
    </>
  );
};

export default AdminProducts;