import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "./blogData";
import "./BlogList.css";

const PER_PAGE = 6;

const CATEGORY_OPTIONS = ["All", "Tech", "Business", "Tips", "Guide", "News", "Tutorial"];
const STATUS_OPTIONS = ["All", "Published", "Draft"];

const CATEGORY_COLORS = {
  Tech: "cat-tech",
  Business: "cat-business",
  Tips: "cat-tips",
  Guide: "cat-guide",
};

function BlogThumb({ blog }) {
  return (
    <div className={`blog-thumb blog-thumb-${blog.accent}`}>
      <div className="blog-thumb-window">
        <span className="thumb-dot" />
        <span className="thumb-dot" />
        <span className="thumb-dot" />
      </div>
      <div className="blog-thumb-copy">
        <span className="thumb-chip">{blog.thumbnailLabel}</span>
        <h3>{blog.thumbnailText}</h3>
        <p>{blog.excerpt}</p>
      </div>
      <div className="blog-thumb-illustration" aria-hidden="true">
        <div className="thumb-laptop">
          <div className="thumb-screen" />
          <div className="thumb-base" />
        </div>
      </div>
    </div>
  );
}

function ActionIcon({ type }) {
  if (type === "view") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (type === "delete") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export default function BlogList() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(BLOG_POSTS);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return blogs.filter((blog) => {
      const matchSearch = blog.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "All" || blog.category === filterCat;
      const matchStatus = filterStatus === "All" || blog.status === filterStatus;
      return matchSearch && matchCat && matchStatus;
    });
  }, [blogs, filterCat, filterStatus, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    setPage(1);
  };

  const openBlog = (id) => navigate(`/blogs/${id}`);

  return (
    <div className="blog-list-page">
      <section className="blog-hero glass-card">
        <div className="blog-hero-kicker">+ OUR BLOG</div>
        <h1>Check Out Latest News Update & Articles</h1>
        <p>
          Explore the latest writing, updates, fixes, and business tips — designed to feel
          consistent with the GlassDash theme.
        </p>

        <div className="blog-toolbar">
          <div className="blog-search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search blog posts..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <select
            className="blog-filter-select"
            value={filterCat}
            onChange={(e) => {
              setFilterCat(e.target.value);
              setPage(1);
            }}
          >
            {CATEGORY_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <select
            className="blog-filter-select"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
          >
            {STATUS_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Status" : item}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="blog-grid-section">
        <div className="blog-grid">
          {paginated.length === 0 ? (
            <div className="blog-empty glass-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
              </svg>
              <h3>No blog posts found</h3>
              <p>Try another search term or clear the filters.</p>
            </div>
          ) : (
            paginated.map((blog, index) => (
              <article
                key={blog.id}
                className="blog-card glass-card"
                style={{ animationDelay: `${Math.min(index, 5) * 0.05}s` }}
              >
                <button
                  type="button"
                  className="blog-card-overlay"
                  onClick={() => openBlog(blog.id)}
                  aria-label={`Open ${blog.title}`}
                />

                <div className="blog-card-media" onClick={() => openBlog(blog.id)} role="presentation">
                  <BlogThumb blog={blog} />
                  <div className="blog-card-topline">
                    <span className={`category-badge ${CATEGORY_COLORS[blog.category] || "cat-default"}`}>
                      {blog.category}
                    </span>
                    <span className={`status-badge status-${blog.status.toLowerCase()}`}>{blog.status}</span>
                  </div>
                </div>

                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>{blog.author}</span>
                    <span>{blog.date}</span>
                    <span>{blog.readingTime}</span>
                  </div>

                  <h2 className="blog-card-title" onClick={() => openBlog(blog.id)} role="presentation">
                    {blog.title}
                  </h2>

                  <p className="blog-card-summary">{blog.summary}</p>

                  <div className="blog-card-footer">
                    <button type="button" className="blog-view-btn" onClick={() => openBlog(blog.id)}>
                      View Blog
                      <ActionIcon type="view" />
                    </button>

                    <div className="blog-mini-actions">
                      <button type="button" className="blog-mini-btn blog-mini-edit" title="Edit">
                        <ActionIcon type="edit" />
                      </button>
                      <button
                        type="button"
                        className="blog-mini-btn blog-mini-delete"
                        title="Delete"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <ActionIcon type="delete" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="blog-pagination">
            <button
              type="button"
              className="page-btn"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                type="button"
                key={i + 1}
                className={`page-btn${currentPage === i + 1 ? " active" : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              className="page-btn"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
