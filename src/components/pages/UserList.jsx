import React from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";
import { userProfiles } from "./UserData";

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function UserList() {
  const navigate = useNavigate();

  return (
    <div className="pg-page user-page">
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-link">User</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">List of All Users</span>
      </div>

      <div className="user-list-head">
        <div>
          <div className="section-title">User Management</div>
          <h2>List of All Users</h2>
        </div>
        <button type="button" className="pg-btn-primary" onClick={() => navigate("/user/profile")}>
          Open Profile
        </button>
      </div>

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userProfiles.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-list-person">
                    <div className="user-list-avatar">{initials(user.fullName)}</div>
                    <div>
                      <span className="user-list-name">{user.fullName}</span>
                      <span className="user-list-id">User ID : GD-U{String(user.id).padStart(3, "0")}</span>
                    </div>
                  </div>
                </td>
                <td>{user.emailAddress}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.cityTownVillage}</td>
                <td className="user-list-orders">{user.orders}</td>
                <td>
                  <span className={`user-status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
                </td>
                <td>{user.joined}</td>
                <td>
                  <button
                    type="button"
                    className="user-view-btn"
                    title="View User"
                    aria-label={`View ${user.fullName}`}
                    onClick={() => navigate(`/user/profile/${user.id}`)}
                  >
                    <EyeIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
