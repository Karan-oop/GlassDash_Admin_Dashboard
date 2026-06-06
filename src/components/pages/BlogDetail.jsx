import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, getRelatedPosts } from "./blogData";
import "./BlogDetail.css";

function ThumbArtwork({ blog }) {
  return (
    <div className={`detail-artwork detail-artwork-${blog.accent}`}>
      <div className="detail-artwork-top">
        <span className="art-dot" />
        <span className="art-dot" />
        <span className="art-dot" />
      </div>

      <div className="detail-artwork-copy">
        <span className="detail-artwork-chip">{blog.thumbnailLabel}</span>
        <h2>{blog.thumbnailText}</h2>
        <p>{blog.excerpt}</p>
      </div>

      <div className="detail-artwork-screen" aria-hidden="true">
        <div className="detail-sound-mark">♪</div>
      </div>
    </div>
  );
}

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = getBlogById(id);
  const related = blog ? getRelatedPosts(blog.id) : [];

  if (!blog) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-empty glass-card">
          <h1>Blog post not found</h1>
          <p>The requested article does not exist or was removed.</p>
          <button type="button" className="back-btn" onClick={() => navigate("/blogs")}>
            Back to Blog List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <header className="blog-detail-hero glass-card">
        <div className="blog-breadcrumb">
          <button type="button" onClick={() => navigate("/")}>HOME</button>
          <span>/</span>
          <button type="button" onClick={() => navigate("/blogs")}>BLOG</button>
          <span>/</span>
          <strong>{blog.category.toUpperCase()}</strong>
        </div>

        <h1>{blog.title}</h1>

        <div className="blog-detail-meta">
          <div className="meta-avatar">KC</div>
          <div>
            <div className="meta-name">{blog.author}</div>
            <div className="meta-sub">{blog.date}</div>
          </div>
          <span className="meta-divider" />
          <div className="meta-pill">{blog.readingTime}</div>
          <div className="meta-pill">{blog.views.toLocaleString()} views</div>
        </div>
      </header>

      <div className="blog-detail-layout">
        <main className="blog-detail-main">
          <section className="detail-card glass-card">
            <ThumbArtwork blog={blog} />

            <p className="detail-intro">{blog.content[0]}</p>

            <div className="detail-contents">
              <h2>Contents</h2>
              <ul>
                {blog.sections.map((section) => (
                  <li key={section}>{section}</li>
                ))}
              </ul>
            </div>

            {blog.content.slice(1).map((paragraph) => (
              <p key={paragraph} className="detail-paragraph">
                {paragraph}
              </p>
            ))}

            <section className="detail-section">
              <h2>Why This Article Helps</h2>
              <p>
                This article follows the same practical style as the reference: a direct problem
                statement, clear troubleshooting order, and actionable next steps you can apply
                immediately.
              </p>
            </section>
          </section>
        </main>

        <aside className="blog-detail-side">
          <section className="detail-side-card glass-card">
            <h3>Related Posts</h3>

            <div className="related-list">
              {related.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="related-item"
                  onClick={() => navigate(`/blogs/${item.id}`)}
                >
                  <div className={`related-thumb related-thumb-${item.accent}`}>
                    <span>{item.thumbnailText.split("\n")[0]}</span>
                  </div>
                  <div className="related-copy">
                    <div className="related-date">{item.date}</div>
                    <div className="related-title">{item.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="detail-side-card glass-card">
            <h3>Quick Facts</h3>
            <div className="quick-facts">
              <div>
                <span>Category</span>
                <strong>{blog.category}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{blog.status}</strong>
              </div>
              <div>
                <span>Reading Time</span>
                <strong>{blog.readingTime}</strong>
              </div>
              <div>
                <span>Views</span>
                <strong>{blog.views.toLocaleString()}</strong>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
