// BlogCreate.jsx
import React, { useState, useRef } from "react";
import "./BlogCreate.css";

const CATEGORIES = ["Tech", "Business", "Tips", "Guide", "News", "Tutorial"];

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function BlogCreate({ onCancel }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [coverPreview, setCoverPreview] = useState(null);
  const [allowComments, setAllowComments] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-slug from title
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (!slugManual) setSlug(slugify(e.target.value));
  };

  // Tags
  const addTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/,$/, "");
      if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
      setTagInput("");
    }
  };
  const removeTag = (t) => setTags((prev) => prev.filter((x) => x !== t));

  // Cover image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCoverPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Rich text simple formatting
  const applyFormat = (cmd, val) => {
    document.execCommand(cmd, false, val || null);
    contentRef.current?.focus();
  };

  const handlePublish = () => {
    if (!title.trim()) { alert("Please enter a blog title."); return; }
    alert(`✅ Blog post "${title}" published successfully!`);
  };

  const handleDraft = () => {
    alert(`📝 Saved "${title || 'Untitled'}" as draft.`);
  };

  return (
    <div className="blog-create-container">
      {/* Header */}
      <div className="blog-create-header">
        <h1>Create New Blog Post</h1>
        <p>Write and publish a new article to your blog</p>
      </div>

      <div className="blog-create-grid">
        {/* LEFT COLUMN */}
        <div>

          {/* Title */}
          <div className="blog-card">
            <div className="blog-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
             <h3>Post Content</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Blog Title <span className="required">*</span></label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter a compelling blog title..."
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Slug (URL)</label>
              <div className="slug-input-wrap">
                <span className="slug-prefix">yourblog.com/blog/</span>
                <input
                  type="text"
                  placeholder="auto-generated-from-title"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Excerpt / Short Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="A brief summary of your blog post (shown in listing cards)..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                style={{ minHeight: 80 }}
              />
              <div className={`char-counter${excerpt.length > 180 ? " over" : excerpt.length > 150 ? " warn" : ""}`}>
                {excerpt.length} / 180
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="blog-card">
            <div className="blog-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12h6M9 16h6M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z" />
              </svg>
              <h3>Blog Content</h3>
            </div>

            {/* Toolbar */}
            <div className="rich-toolbar">
              {[["Bold","B"],["Italic","I"],["Underline","U"]].map(([cmd, label]) => (
                <button key={cmd} className="rich-btn" onMouseDown={(e) => { e.preventDefault(); applyFormat(cmd); }}>
                  <span style={{ fontWeight: cmd === "Bold" ? 700 : 400, fontStyle: cmd === "Italic" ? "italic" : "normal", textDecoration: cmd === "Underline" ? "underline" : "none" }}>
                    {label}
                  </span>
                </button>
              ))}
              <div className="rich-divider" />
              <button className="rich-btn" onMouseDown={(e) => { e.preventDefault(); applyFormat("insertUnorderedList"); }}>• List</button>
              <button className="rich-btn" onMouseDown={(e) => { e.preventDefault(); applyFormat("insertOrderedList"); }}>1. List</button>
              <div className="rich-divider" />
              {["h2","h3"].map(h => (
                <button key={h} className="rich-btn" onMouseDown={(e) => { e.preventDefault(); applyFormat("formatBlock", h); }}>
                  {h.toUpperCase()}
                </button>
              ))}
              <button className="rich-btn" onMouseDown={(e) => { e.preventDefault(); applyFormat("formatBlock", "p"); }}>P</button>
              <div className="rich-divider" />
              <button className="rich-btn" onMouseDown={(e) => { e.preventDefault(); applyFormat("createLink", prompt("Enter URL:") || ""); }}>
                🔗
              </button>
            </div>
            <div
              ref={contentRef}
              className="rich-content-area"
              contentEditable
              suppressContentEditableWarning
              data-placeholder="Start writing your blog post here. You can format text using the toolbar above..."
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
            />
          </div>

          {/* SEO */}
          <div className="blog-card">
            <div className="blog-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <h3>SEO Settings</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Meta Title</label>
              <input
                className="form-input"
                type="text"
                placeholder="SEO title (defaults to blog title)"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
              <div className={`char-counter${metaTitle.length > 60 ? " over" : metaTitle.length > 50 ? " warn" : ""}`}>
                {metaTitle.length} / 60
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Meta Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Brief description for search engines..."
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                style={{ minHeight: 80 }}
              />
              <div className={`char-counter${metaDesc.length > 160 ? " over" : metaDesc.length > 140 ? " warn" : ""}`}>
                {metaDesc.length} / 160
              </div>
            </div>

            {(metaTitle || title) && (
              <div className="form-group">
                <label className="form-label">Search Preview</label>
                <div className="seo-preview">
                  <div className="seo-url">yourblog.com/blog/{slug || "post-slug"}</div>
                  <div className="seo-title">{metaTitle || title || "Blog Title"}</div>
                  <div className="seo-desc">{metaDesc || excerpt || "Meta description will appear here..."}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* Publish */}
          <div className="blog-card">
            <div className="blog-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
              </svg>
              <h3>Publish</h3>
            </div>
            <div className="blog-create-actions">
              <button className="btn-draft" onClick={handleDraft}>Save Draft</button>
              <button className="btn-publish" onClick={handlePublish}>Publish</button>
            </div>
          </div>

          {/* Category */}
          <div className="blog-card">
            <div className="blog-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
              <h3>Category</h3>
            </div>
            <div className="form-group">
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="blog-card">
            <div className="blog-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <h3>Tags</h3>
            </div>
            <div className="form-group">
              <div className="tags-wrap">
                {tags.map((t) => (
                  <span key={t} className="tag-chip">
                    {t}
                    <button onClick={() => removeTag(t)}>×</button>
                  </span>
                ))}
                <input
                  className="tags-input"
                  placeholder="Add tag, press Enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="blog-card">
            <div className="blog-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <h3>Cover Image</h3>
            </div>
            <div className="form-group">
              {coverPreview ? (
                <div>
                  <img src={coverPreview} alt="Cover" className="upload-preview" />
                  <button
                    style={{ marginTop: 10, background: "none", border: "1px solid #2d3548", color: "#94a3b8", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: "0.78rem", width: "100%" }}
                    onClick={() => setCoverPreview(null)}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <label className="upload-area">
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p>Click to upload cover image</p>
                  <p className="upload-hint">PNG, JPG, WEBP up to 5MB</p>
                </label>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="blog-card">
            <div className="blog-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
              <h3>Post Options</h3>
            </div>

            <div className="toggle-row">
              <span className="toggle-label">Allow Comments</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={allowComments} onChange={() => setAllowComments((v) => !v)} />
                <div className="toggle-track" />
                <div className="toggle-thumb" />
              </label>
            </div>

            <div className="toggle-row">
              <span className="toggle-label">Featured Post</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={featured} onChange={() => setFeatured((v) => !v)} />
                <div className="toggle-track" />
                <div className="toggle-thumb" />
              </label>
            </div>
          </div>

          {/* Cancel */}
          {onCancel && (
            <button
              onClick={onCancel}
              style={{ width: "100%", background: "none", border: "1px solid #2d3548", color: "#64748b", padding: "10px", borderRadius: 8, cursor: "pointer", fontSize: "0.84rem", marginTop: 4 }}
            >
              ← Back to List
            </button>
          )}
        </div>
      </div>
    </div>
  );
}