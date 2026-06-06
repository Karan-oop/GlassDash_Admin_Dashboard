import { useState } from "react";

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
    tags: "",

    price: "",
    discount: "",
    tax: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
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
      tags: "",
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

  return (
    <div className="pg-page">
      <div className="pg-breadcrumb">
        Dashboard / Products / Create
      </div>

      <h2 className="pg-title">Create Product</h2>

      <div className="product-create-layout">

        {/* LEFT PREVIEW */}
        <div className="glass-card product-preview">

          {product.image ? (
            <img
              src={URL.createObjectURL(product.image)}
              alt="preview"
              className="product-preview-img"
            />
          ) : (
            <div className="product-placeholder">
              No Image Selected
            </div>
          )}

          <h3>{product.name || "Product Name"}</h3>

          <p className="preview-category">
            {product.category || "Category"}
          </p>

          <div className="preview-price">
            {product.discount ? (
              <>
                <span className="old-price">
                  ${product.price || 0}
                </span>

                <span className="new-price">
                  ${finalPrice}
                </span>

                <span className="discount">
                  ({product.discount}% OFF)
                </span>
              </>
            ) : (
              <span>${product.price || 0}</span>
            )}
          </div>

          <div className="preview-sizes">
            <strong>Sizes:</strong>
            {product.sizes.map((size) => (
              <span key={size} className="chip active">
                {size}
              </span>
            ))}
          </div>

          <div className="preview-colors">
            <strong>Colors:</strong>

            {product.colors.map((color) => (
              <span
                key={color}
                className="color-dot active"
                style={{ background: color }}
              />
            ))}
          </div>

          <div className="preview-buttons">
            <button
              className="pg-btn-primary"
              onClick={handleSubmit}
            >
              Create Product
            </button>

            <button
              className="pg-btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="glass-card product-form">

          {/* IMAGE */}
          <div className="pg-form-group">
            <label className="pg-label">
              Upload Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="pg-input"
              onChange={(e) =>
                setProduct({
                  ...product,
                  image: e.target.files[0],
                })
              }
            />
          </div>

          {/* BASIC INFO */}

          <div className="form-grid">

            <div>
              <label className="pg-label">
                Product Name
              </label>

              <input
                name="name"
                value={product.name}
                onChange={handleChange}
                className="pg-input"
              />
            </div>

            <div>
              <label className="pg-label">
                Product Category
              </label>

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="pg-input"
              >
                <option value="">
                  Select Category
                </option>
                <option value="Fashion">
                  Fashion
                </option>
                <option value="Footwear">
                  Footwear
                </option>
                <option value="Laptop">
                  Laptop
                </option>
                <option value="Smartphone">
                  Smartphone
                </option>
                 <option value="Leather">Purse</option>
                 <option value="electronics">Headphone</option>
                 <option value="furniture">Furniture</option>
                 <option value="Accesories">Accesories</option>
                 <option value="Gaming">Gaming</option>
              </select>
            </div>

            <div>
              <label className="pg-label">
                Brand
              </label>

              <input
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="pg-input"
              />
            </div>

            <div>
              <label className="pg-label">
                Weight
              </label>

              <input
                name="weight"
                value={product.weight}
                onChange={handleChange}
                className="pg-input"
              />
            </div>

            <div>
              <label className="pg-label">
                Gender
              </label>

              <select
                name="gender"
                value={product.gender}
                onChange={handleChange}
                className="pg-input"
              >
                <option value="">
                  Select Gender
                </option>
                <option value="male">
                  Male
                </option>
                <option value="female">
                  Female
                </option>
                <option value="unisex">
                  Unisex
                </option>
              </select>
            </div>
          </div>

          {/* SIZES */}

          <div className="product-section">
            <label className="pg-label">
              Sizes
            </label>

            <div className="chip-group">
              {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map(
                (size) => (
                  <button
                    key={size}
                    type="button"
                    className={`chip ${
                      product.sizes.includes(size)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>

          {/* COLORS */}

          <div className="product-section">
            <label className="pg-label">
              Colors
            </label>

            <div className="color-group">
              {[
                "#000000",
                "#FFC107",
                "#ff008c",
                "#a722ff",
                "#4CAF50",
                "#F44336",
                "#00BCD4",
              ].map((color) => (
                <span
                  key={color}
                  onClick={() =>
                    toggleColor(color)
                  }
                  className={`color-dot ${
                    product.colors.includes(color)
                      ? "active"
                      : ""
                  }`}
                  style={{
                    background: color,
                  }}
                />
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}

          <label className="pg-label">
            Description
          </label>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="pg-input pg-textarea"
          />

          {/* INVENTORY */}

          <div className="form-grid">

            <div>
              <label className="pg-label">
                Tag Number
              </label>

              <input
                name="tagNumber"
                value={product.tagNumber}
                onChange={handleChange}
                className="pg-input"
              />
            </div>

            <div>
              <label className="pg-label">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="pg-input"
              />
            </div>

            <div>
              <label className="pg-label">
                Tags
              </label>

              <input
                name="tags"
                placeholder="Fashion, New"
                value={product.tags}
                onChange={handleChange}
                className="pg-input"
              />
            </div>
          </div>

          {/* PRICING */}

          <h3 className="section-title">
            Pricing Details
          </h3>

          <div className="form-grid">

            <div>
              <label className="pg-label">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="pg-input"
              />
            </div>

            <div>
              <label className="pg-label">
                Discount %
              </label>

              <input
                type="number"
                name="discount"
                value={product.discount}
                onChange={handleChange}
                className="pg-input"
              />
            </div>

            <div>
              <label className="pg-label">
                Tax %
              </label>

              <input
                type="number"
                name="tax"
                value={product.tax}
                onChange={handleChange}
                className="pg-input"
              />
            </div>

          </div>

          <div className="form-actions">
            <button
              onClick={handleSubmit}
              className="pg-btn-primary">
              Create Product
            </button>

            <div className="form-actions">
            <button
              onClick={handleCancel}
              className="pg-btn-primary">
              Cancel
            </button>

            <button
              onClick={handleCancel}
              className="pg-btn-secondary">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>)}