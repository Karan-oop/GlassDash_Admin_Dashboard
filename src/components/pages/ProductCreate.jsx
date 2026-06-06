import { useState, useRef } from "react";

export default function ProductCreate() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    weight: "",
    gender: "",
    description: "",
    sizes: [],
    colors: [],
    image: null,
    tagNumber: "",
    stock: "",
    tags: [],
    tagInput: "",
    price: "",
    discount: "",
    tax: "",
  });

  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const toggleSize = (size) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color) => {
    setProduct((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && product.tagInput.trim()) {
      e.preventDefault();
      const newTag = product.tagInput.trim().replace(/,$/, "");
      if (newTag && !product.tags.includes(newTag)) {
        setProduct((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
          tagInput: "",
        }));
      }
    } else if (e.key === "Backspace" && !product.tagInput && product.tags.length > 0) {
      setProduct((prev) => ({
        ...prev,
        tags: prev.tags.slice(0, -1),
      }));
    }
  };

  const removeTag = (tag) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleImageFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setProduct((prev) => ({ ...prev, image: file }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageFile(file);
  };

  const handleSubmit = () => {
    console.log(product);
    alert("Product Created Successfully");
  };

  const handleCancel = () => {
    setProduct({
      name: "",
      category: "",
      brand: "",
      weight: "",
      gender: "",
      description: "",
      sizes: [],
      colors: [],
      image: null,
      tagNumber: "",
      stock: "",
      tags: [],
      tagInput: "",
      price: "",
      discount: "",
      tax: "",
    });
  };

  const finalPrice =
    product.price && product.discount
      ? (
          Number(product.price) -
          (Number(product.price) * Number(product.discount)) / 100
        ).toFixed(2)
      : product.price;

  const colorOptions = [
    "#e8e8e8",
    "#FFC107",
    "#f592b8",
    "#ff5722",
    "#4CAF50",
    "#F44336",
    "#00BCD4",
    "#9e9e9e",
    "#FF9A86",
    "#FFD6A6",
    "#D92243"
  ];

  return (
    <div className="pg-page">
      <div className="pg-breadcrumb">Dashboard / Products / Create</div>
      <h2 className="pg-title" style={{ marginBottom: 20 }}>
        Create Product
      </h2>

      <div className="pc-layout">

        {/* ── LEFT PREVIEW ── */}
        <div className="glass-card pc-preview">
          <div className="pc-preview-img-wrap">
            {product.image ? (
              <img
                src={URL.createObjectURL(product.image)}
                alt="preview"
                className="pc-preview-img"
              />
            ) : (
              <div className="pc-preview-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
          </div>

          <div className="pc-preview-body">
            <div className="pc-preview-name-row">
              <span className="pc-preview-name">{product.name || "Your Product Name Here"}</span>
              {product.category && (
                <span className="pc-preview-cat-badge">{product.category}</span>
              )}
            </div>

            <div className="pc-preview-price-row">
              <span className="pc-label-sm">Price :</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                {product.discount ? (
                  <>
                    <span className="pc-old-price">${product.price || 0}</span>
                    <span className="pc-new-price">${finalPrice}</span>
                    <span className="pc-discount-badge">({product.discount}% Off)</span>
                  </>
                ) : (
                  <span className="pc-new-price">${product.price || 0}</span>
                )}
              </div>
            </div>

            {product.sizes.length > 0 && (
              <div className="pc-preview-sizes">
                <span className="pc-label-sm">Size :</span>
                <div className="pc-chip-row" style={{ marginTop: 6 }}>
                  {product.sizes.map((s) => (
                    <span key={s} className="pc-size-chip">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {product.colors.length > 0 && (
              <div className="pc-preview-colors">
                <span className="pc-label-sm">Colors :</span>
                <div className="pc-color-row" style={{ marginTop: 6 }}>
                  {product.colors.map((c) => (
                    <span key={c} className="pc-color-dot" style={{ background: c }} />
                  ))}
                </div>
              </div>  
            )}
          </div>

          <div className="pc-preview-actions">
             <button className="pc-btn-cancel" onClick={handleSubmit}>
              Create Product
            </button> 
            <button className="pc-btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div> 
        </div>

        {/* ── RIGHT FORM ── */}
        <div className="pc-form-col">

          {/* IMAGE UPLOAD */}
          <div className="glass-card pc-section">
            <div className="pc-section-label">Add Product Photo</div>
            <div
              className={`pc-dropzone ${dragOver ? "pc-dropzone--over" : ""}`}
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageFile(e.target.files[0])}
              />
              <svg className="pc-upload-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              <p className="pc-drop-text">
                Drop your images here, or{" "}
                <span className="pc-drop-link">click to browse</span>
              </p>
              <p className="pc-drop-hint">
                1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
              </p>
            </div>
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="glass-card pc-section">
            <div className="pc-section-label">Product Information</div>

            {/* Row 1: Name + Category */}
            <div className="pc-grid-2">
              <div className="pg-form-group">
                <label className="pg-label">Product Name</label>
                <input
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Items Name"
                  className="pg-input pc-input"
                />
              </div>

              <div className="pg-form-group">
                <label className="pg-label">Product Categories</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="pg-input pc-input pg-select"
                >
                  <option value="">Choose a categories</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Purse">Purse</option>
                  <option value="Headphone">Headphone</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Gaming">Gaming</option>
                </select>
              </div>
            </div>

            {/* Row 2: Brand + Weight + Gender */}
            <div className="pc-grid-3">
              <div className="pg-form-group">
                <label className="pg-label">Brand</label>
                <input
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  placeholder="Brand Name"
                  className="pg-input pc-input"
                />
              </div>
              <div className="pg-form-group">
                <label className="pg-label">Weight</label>
                <input
                  name="weight"
                  value={product.weight}
                  onChange={handleChange}
                  placeholder="In gm & kg"
                  className="pg-input pc-input"
                />
              </div>
              <div className="pg-form-group">
                <label className="pg-label">Gender</label>
                <select
                  name="gender"
                  value={product.gender}
                  onChange={handleChange}
                  className="pg-input pc-input pg-select"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
            </div>

            {/* Sizes + Colors (side by side) */}
            <div className="pc-grid-2" style={{ marginTop: 6 }}>
              <div className="pg-form-group">
                <label className="pg-label">Size :</label>
                <div className="chip-group">
                  {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`chip ${product.sizes.includes(size) ? "active" : ""}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pg-form-group">
                <label className="pg-label">Colors :</label>
                <div className="color-group">
                  {colorOptions.map((color, idx) => (
                    <span
                      key={idx}
                      onClick={() => toggleColor(color)}
                      className={`color-dot ${product.colors.includes(color) ? "active" : ""}`}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pg-form-group" style={{ marginTop: 10 }}>
              <label className="pg-label">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Short description about the product"
                className="pg-input pg-textarea pc-input"
                style={{ minHeight: 100 }}
              />
            </div>

            {/* Tag Number + Stock + Tags */}
            <div className="pc-grid-3" style={{ marginTop: 6 }}>
              <div className="pg-form-group">
                <label className="pg-label">Tag Number</label>
                <input
                  name="tagNumber"
                  value={product.tagNumber}
                  onChange={handleChange}
                  placeholder="#******"
                  className="pg-input pc-input"
                />
              </div>
              <div className="pg-form-group">
                <label className="pg-label">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="pg-input pc-input"
                />
              </div>
              <div className="pg-form-group">
                <label className="pg-label">Tag</label>
                <div className="pc-tag-input-wrap pg-input pc-input">
                  {product.tags.map((tag) => (
                    <span key={tag} className="pc-tag-chip">
                      {tag}
                      <button
                        type="button"
                        className="pc-tag-remove"
                        onClick={() => removeTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    className="pc-tag-inner-input"
                    value={product.tagInput}
                    onChange={(e) =>
                      setProduct((prev) => ({ ...prev, tagInput: e.target.value }))
                    }
                    onKeyDown={handleTagKeyDown}
                    placeholder={product.tags.length === 0 ? "Fashion, New…" : ""}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PRICING DETAILS */}
          <div className="glass-card pc-section">
            <div className="pc-section-label">Pricing Details</div>
            <div className="pc-grid-3">
              <div className="pg-form-group">
                <label className="pg-label">Price</label>
                <div className="pc-prefix-input-wrap">
                  <span className="pc-prefix-icon">$</span>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="000"
                    className="pg-input pc-input pc-prefix-input"
                  />
                </div>
              </div>
              <div className="pg-form-group">
                <label className="pg-label">Discount</label>
                <div className="pc-prefix-input-wrap">
                  <span className="pc-prefix-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="19" y1="5" x2="5" y2="19" />
                      <circle cx="6.5" cy="6.5" r="2.5" />
                      <circle cx="17.5" cy="17.5" r="2.5" />
                    </svg>
                  </span>
                  <input
                    type="number"
                    name="discount"
                    value={product.discount}
                    onChange={handleChange}
                    placeholder="000"
                    className="pg-input pc-input pc-prefix-input"
                  />
                </div>
              </div>
              <div className="pg-form-group">
                <label className="pg-label">Tax</label>
                <div className="pc-prefix-input-wrap">
                  <span className="pc-prefix-icon">$</span>
                  <input
                    type="number"
                    name="tax"
                    value={product.tax}
                    onChange={handleChange}
                    placeholder="000"
                    className="pg-input pc-input pc-prefix-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="pc-bottom-actions">
            <button className="pc-btn-cancel" onClick={handleSubmit}>
              Create Product
            </button>

            <button className="pc-btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
