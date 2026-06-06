// ProductList.jsx
// Product List page - styled to match the GlassDash admin dashboard
// Uses the same glass card style, typography system, and maroon+tan color theme

import { useState } from "react";
import "../Pages/ProductList.css";

// dummy products - replace with real API data later
const startingProducts = [
  { id: 1,  name: "Black T-shirt",               sizes: "S, M, L, XL",   price: 80,  stock: 496, sold: 155, category: "Fashion",     rating: 4.5, reviews: 55  },
  { id: 2,  name: "Olive Green Leather Bag",      sizes: "S, M",          price: 136, stock: 784, sold: 674, category: "Hand Bag",    rating: 4.1, reviews: 143 },
  { id: 3,  name: "Women Golden Dress",           sizes: "S, M",          price: 219, stock: 769, sold: 180, category: "Fashion",     rating: 4.4, reviews: 174 },
  { id: 4,  name: "Gray Cap For Men",             sizes: "S, M, L",       price: 76,  stock: 571, sold: 87,  category: "Cap",         rating: 4.2, reviews: 23  },
  { id: 5,  name: "Dark Green Cargo Pent",        sizes: "S, M, L, XL",   price: 110, stock: 241, sold: 342, category: "Fashion",     rating: 4.4, reviews: 109 },
  { id: 6,  name: "Orange Multi Color Headphone", sizes: "S, M",          price: 231, stock: 821, sold: 231, category: "Electronics", rating: 4.2, reviews: 200 },
  { id: 7,  name: "Kid's Yellow Shoes",           sizes: "18, 19, 20, 21",price: 89,  stock: 321, sold: 681, category: "Shoes",       rating: 4.5, reviews: 321 },
  { id: 8,  name: "Men Dark Brown Wallet",        sizes: "S, M",          price: 132, stock: 190, sold: 212, category: "Wallet",      rating: 4.1, reviews: 190 },
  { id: 9,  name: "Sky Blue Sunglass",            sizes: "S, M",          price: 77,  stock: 784, sold: 443, category: "Sunglass",    rating: 3.5, reviews: 298 },
  { id: 10, name: "Kid's Yellow T-shirt",         sizes: "S",             price: 110, stock: 650, sold: 365, category: "Fashion",     rating: 4.1, reviews: 156 },
  { id: 11, name: "White Rubber Band Smart Watch",sizes: "S, M",          price: 77,  stock: 98,  sold: 241, category: "Electronics", rating: 3.4, reviews: 201 },
  { id: 12, name: "Men Brown Leather Shoes",      sizes: "40, 41, 42, 43",price: 222, stock: 176, sold: 658, category: "Shoes",       rating: 4.1, reviews: 370 },
];

// emoji map - each category gets its own emoji for the product image box
const categoryEmoji = {
  "Fashion":     "👕",
  "Hand Bag":    "👜",
  "Cap":         "🧢",
  "Electronics": "🎧",
  "Shoes":       "👟",
  "Wallet":      "👛",
  "Sunglass":    "🕶️",
};

// helper to get emoji for a category, fallback to box emoji if not found
function getEmoji(category) {
  return categoryEmoji[category] || "📦";
}

// how many rows per page
const ITEMS_PER_PAGE = 12;

// --- SVG Icons ---

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );
}

// --- Main Component ---

export default function ProductList() {
  const [products, setProducts]         = useState(startingProducts);
  const [currentPage, setCurrentPage]   = useState(1);
  const [toast, setToast]               = useState(null);
  const [modalOpen, setModalOpen]       = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const [formData, setFormData] = useState({
    name: "", sizes: "", price: "",
    stock: "", sold: "", category: "",
    rating: "", reviews: "",
  });

  // show a toast that auto-hides after 3 seconds
  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleDelete(productId) {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setSelectedProductIds(prev => prev.filter(id => id !== productId));
    showToast("Product deleted successfully");
  }

  function handleEditClick(product) {
    setEditingProduct(product);
    setFormData({
      name:     product.name,
      sizes:    product.sizes,
      price:    product.price,
      stock:    product.stock,
      sold:     product.sold,
      category: product.category,
      rating:   product.rating,
      reviews:  product.reviews,
    });
    setModalOpen(true);
  }

  function handleAddClick() {
    setEditingProduct(null);
    setFormData({ name: "", sizes: "", price: "", stock: "", sold: 0, category: "", rating: "", reviews: 0 });
    setModalOpen(true);
  }

  function handleViewClick(product) {
    setViewingProduct(product);
  }

  function handleCloseView() {
    setViewingProduct(null);
  }

  function handleSelectAllCurrentProducts(e) {
    const currentIds = currentProducts.map(product => product.id);

    if (e.target.checked) {
      setSelectedProductIds(prev => Array.from(new Set([...prev, ...currentIds])));
      return;
    }

    setSelectedProductIds(prev => prev.filter(id => !currentIds.includes(id)));
  }

  function handleSelectProduct(productId) {
    setSelectedProductIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }

  function handleFormChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    if (!formData.name.trim() || !formData.price) {
      showToast("Product name and price are required", "error");
      return;
    }

    if (editingProduct) {
      // update existing
      setProducts(prev => prev.map(p =>
        p.id === editingProduct.id
          ? {
              ...p, ...formData,
              price:   Number(formData.price),
              stock:   Number(formData.stock),
              sold:    Number(formData.sold),
              rating:  Number(formData.rating),
              reviews: Number(formData.reviews),
            }
          : p
      ));
      showToast("Product updated successfully");
    } else {
      // add new
      const newProduct = {
        id:       Date.now(),
        name:     formData.name,
        sizes:    formData.sizes,
        price:    Number(formData.price),
        stock:    Number(formData.stock)   || 0,
        sold:     Number(formData.sold)    || 0,
        category: formData.category,
        rating:   Number(formData.rating)  || 0,
        reviews:  Number(formData.reviews) || 0,
      };
      setProducts(prev => [newProduct, ...prev]);
      showToast("Product added successfully");
    }

    setModalOpen(false);
  }

  function handleCancel() {
    setModalOpen(false);
  }

  // pagination
  const totalPages      = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex      = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const allCurrentProductsSelected =
    currentProducts.length > 0 && currentProducts.every(product => selectedProductIds.includes(product.id));

  return (
    <div className="product-page">

      {/* top bar */}
      <div className="product-top-bar">
        <h2>All Product List</h2>
        <div className="top-bar-right">
          <button className="btn-add-product" onClick={handleAddClick}>+ Add Product</button>
          <button className="btn-this-month">This Month ▾</button>
        </div>
      </div>

      {/* table */}
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  aria-label="Select all products"
                  checked={allCurrentProductsSelected}
                  onChange={handleSelectAllCurrentProducts}
                />
              </th>
              <th>Product Name &amp; Size</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id}>

                {/* checkbox */}
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Select ${product.name}`}
                    checked={selectedProductIds.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </td>

                {/* product name + emoji image */}
                <td>
                  <div className="product-name-col">

                    {/* emoji box - shows a relevant emoji based on category */}
                    <div className="product-img-box">
                      <span className="product-emoji">{getEmoji(product.category)}</span>
                    </div>

                    <div className="product-name-text">
                      <span className="pname">{product.name}</span>
                      <span className="psize">Size : {product.sizes}</span>
                    </div>
                  </div>
                </td>

                {/* price */}
                <td className="price-cell">${product.price}.00</td>

                {/* stock */}
                <td>
                  <div className="stock-info">
                    <span>{product.stock} Item Left</span>
                    <span>{product.sold} Sold</span>
                  </div>
                </td>

                {/* category */}
                <td>
                  <span className="category-badge">{product.category}</span>
                </td>

                {/* rating */}
                <td>
                  <div className="rating-row">
                    <span className="rating-badge">
                      <span className="star">★</span>
                      {product.rating}
                    </span>
                    <span className="review-count">{product.reviews} Review</span>
                  </div>
                </td>

                {/* action buttons - always visible, colored */}
                <td>
                  <div className="action-btns">

                    {/* view - blue */}
                    <button
                      className="action-btn view-btn"
                      title="View"
                      onClick={() => handleViewClick(product)}
                    >
                      <EyeIcon />
                    </button>

                    {/* edit - tan/gold */}
                    <button
                      className="action-btn edit-btn"
                      title="Edit"
                      onClick={() => handleEditClick(product)}
                    >
                      <EditIcon />
                    </button>

                    {/* delete - red */}
                    <button
                      className="action-btn delete-btn"
                      title="Delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      <TrashIcon />
                    </button>

                  </div>
                </td>

              </tr>
            ))}

            {/* empty state */}
            {currentProducts.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-row">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="pagination">
        <button
          className="page-btn page-prev"
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="page-btn page-next"
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* toast popup */}
      {toast && (
        <div className={`toast-message ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* add / edit modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>

            <div className="form-group">
              <label>Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Enter product name" />
            </div>

            <div className="form-group">
              <label>Sizes (comma separated)</label>
              <input type="text" name="sizes" value={formData.sizes} onChange={handleFormChange} placeholder="e.g. S, M, L, XL" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price ($)</label>
                <input type="number" name="price" value={formData.price} onChange={handleFormChange} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleFormChange} placeholder="0" />
              </div>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleFormChange}>
                <option value="">Select category</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Shoes">Shoes</option>
                <option value="Hand Bag">Hand Bag</option>
                <option value="Cap">Cap</option>
                <option value="Wallet">Wallet</option>
                <option value="Sunglass">Sunglass</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Rating (0-5)</label>
                <input type="number" name="rating" value={formData.rating} onChange={handleFormChange} placeholder="4.5" min="0" max="5" step="0.1" />
              </div>
              <div className="form-group">
                <label>Reviews</label>
                <input type="number" name="reviews" value={formData.reviews} onChange={handleFormChange} placeholder="0" />
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
              <button className="btn-save" onClick={handleSave}>
                {editingProduct ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* view modal */}
      {viewingProduct && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Product Details</h3>

            <div className="product-view-head">
              <div className="product-img-box">
                <span className="product-emoji">{getEmoji(viewingProduct.category)}</span>
              </div>
              <div>
                <div className="product-view-name">{viewingProduct.name}</div>
                <div className="product-view-sub">Read-only product overview</div>
              </div>
            </div>

            <div className="form-group product-view-field">
              <label>Product Name</label>
              <input type="text" value={viewingProduct.name} readOnly />
            </div>

            <div className="form-group product-view-field">
              <label>Sizes</label>
              <input type="text" value={viewingProduct.sizes} readOnly />
            </div>

            <div className="form-row">
              <div className="form-group product-view-field">
                <label>Price ($)</label>
                <input type="text" value={`${viewingProduct.price}.00`} readOnly />
              </div>
              <div className="form-group product-view-field">
                <label>Stock</label>
                <input type="text" value={`${viewingProduct.stock} Item Left`} readOnly />
              </div>
            </div>

            <div className="form-group product-view-field">
              <label>Category</label>
              <input type="text" value={viewingProduct.category} readOnly />
            </div>

            <div className="form-row">
              <div className="form-group product-view-field">
                <label>Rating</label>
                <input type="text" value={viewingProduct.rating} readOnly />
              </div>
              <div className="form-group product-view-field">
                <label>Reviews</label>
                <input type="text" value={viewingProduct.reviews} readOnly />
              </div>
            </div>

            <div className="form-group product-view-field">
              <label>Sold</label>
              <input type="text" value={`${viewingProduct.sold} Sold`} readOnly />
            </div>

            <div className="product-view-summary">
              <div>
                <span>Inventory Status</span>
                <strong>{viewingProduct.stock > 0 ? "In Stock" : "Out of Stock"}</strong>
              </div>
              <span className="category-badge">{viewingProduct.category}</span>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCloseView}>Close</button>
              <button className="btn-save" onClick={() => {
                handleEditClick(viewingProduct);
                handleCloseView();
              }}>
                Edit Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
